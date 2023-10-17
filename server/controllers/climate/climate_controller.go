package climate

import (
	"errors"
	"fmt"
	"mini-bank/models"
	"mini-bank/repository"
	"mini-bank/utils"
	"mini-bank/utils/excel"
	"reflect"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)

const DEFAULT_TIME_ZONE = "Asia/Singapore"

func GetAll(ctx *gin.Context) {
	var climate []*models.ClimateObservation
	var filter ClimateFilterDTO
	ctx.BindQuery(&filter)

	pagination := utils.Pagination{Page: filter.Page, Limit: filter.Limit}
	total, err := repository.GetWithFilter(&climate, &filter, pagination)

	if err != nil {
		utils.ResponseBadRequest(ctx, err)
		return
	}

	utils.ResponseListSuccess(ctx, climate, utils.Meta{Page: pagination.Page, Limit: pagination.Limit, Total: total})
}

func Create(ctx *gin.Context) {
	var climate models.ClimateObservation
	var userID = ctx.MustGet("Id").(float64)

	err := ctx.BindJSON(&climate)
	if err != nil {
		utils.ResponseBadRequest(ctx, err)
		return
	}
	climate.UserID = uint(userID)

	err = repository.Create(&climate)
	if err != nil {
		utils.ResponseBadRequest(ctx, err)
		return
	}

	utils.ResponseCreated(ctx, climate)
}

func GetByID(ctx *gin.Context) {
	var climate models.ClimateObservation

	id := ctx.Param("id")
	err := repository.GetByID(&climate, id)

	if err != nil {
		utils.ResponseNotFound(ctx, err)
		return
	}

	utils.ResponseSuccess(ctx, climate)

}

func Update(ctx *gin.Context) {
	var climate models.ClimateObservation
	id := ctx.Param("id")

	err := repository.GetByID(&climate, id)

	if err != nil {
		utils.ResponseNotFound(ctx, err)
		return
	}

	err = ctx.BindJSON(&climate)
	if err != nil {
		utils.ResponseBadRequest(ctx, err)
		return
	}

	err = repository.Update(&climate)
	if err != nil {
		utils.ResponseBadRequest(ctx, err)
		return
	}

	utils.ResponseSuccess(ctx, climate)
}

func Delete(ctx *gin.Context) {
	var climate models.ClimateObservation

	id := ctx.Param("id")
	err := repository.GetByID(&climate, id)

	if err != nil {
		utils.ResponseNotFound(ctx, err)
		return
	}

	err = repository.Delete(&climate)
	if err != nil {
		utils.ResponseBadRequest(ctx, err)
		return
	}

	utils.ResponseSuccess(ctx, climate)
}

func GetToday(ctx *gin.Context) {
	var climate models.ClimateObservation
	riverID := ctx.Param("river")

	err := repository.GetToday(&climate, riverID)

	if err != nil {
		utils.ResponseSuccess(ctx, nil)
		return
	}

	utils.ResponseSuccess(ctx, climate)
}

func GetAllToday(ctx *gin.Context) {
	now := time.Now()
	results, err := repository.GetAllClimateByDate(now)

	if err != nil {
		utils.ResponseSuccess(ctx, nil)
		return
	}

	utils.ResponseSuccess(ctx, results)
}

func GetAllByDate(ctx *gin.Context) {
	var filter FilterAllByDateDTO

	err := ctx.BindQuery(&filter)
	if err != nil {
		utils.ResponseBadRequest(ctx, err)
		return
	}

	date, err := time.Parse("2006-01-02", filter.Date)

	if err != nil {
		utils.ResponseBadRequest(ctx, err)
		return
	}

	results, err := repository.GetAllClimateByDate(date)

	if err != nil {
		utils.ResponseSuccess(ctx, nil)
		return
	}

	utils.ResponseSuccess(ctx, results)
}

func ExportByID(ctx *gin.Context) {
	var climate []models.ClimateObservation
	var filter ExportDTO
	riverID := ctx.Param("id")
	ctx.BindQuery(&filter)

	if filter.Year == "" {
		utils.ResponseBadRequest(ctx, errors.New("year is required"))
		return
	}

	err := repository.ExportObservationByYear(&climate, riverID, filter.Year)

	if err != nil {
		utils.ResponseBadRequest(ctx, err)
		return
	}

	location, _ := time.LoadLocation(DEFAULT_TIME_ZONE)

	file, err := excel.CreateFile()
	row := 1

	header := []string{
		"Date",
		"Curah Hujan",
		"Min Temperature",
		"Max Temperature",
		"Kelembapan",
		"Kecepatan Angin",
		"Durasi Penyinaran Matahari",
		"Penguapan",
		"Kelempapan Basah",
		"Kelembapan Kering",
		"Minimum Apung",
		"Maximum Apung",
		"Hook Naik",
		"Hook Turun",
		"Proses Penyinaran",
		"Created At",
		"Updated At",
		"Created By",
	}

	excel.SetRow(file, header, row, "")
	row += 1

	for _, d := range climate {

		data := []string{
			d.Date.In(location).Format("2006-01-02"),
			fmt.Sprintf("%v", d.Rainfall),
			fmt.Sprintf("%v", d.MinTemperature),
			fmt.Sprintf("%v", d.MaxTemperature),
			fmt.Sprintf("%v", d.Humidity),
			fmt.Sprintf("%v", d.WindSpeed),
			fmt.Sprintf("%v", d.IlluminationDuration),
			fmt.Sprintf("%v", d.Evaporation),
			fmt.Sprintf("%v", d.WetHumidity),
			fmt.Sprintf("%v", d.DryHumidity),
			fmt.Sprintf("%v", d.MinFloatLevel),
			fmt.Sprintf("%v", d.MaxFloatLevel),
			fmt.Sprintf("%v", d.UpperHook),
			fmt.Sprintf("%v", d.LowerHook),
			d.IlluminationProcess,
			d.CreatedAt.In(location).Format("2006-01-02 15:04:05"),
			d.UpdatedAt.In(location).Format("2006-01-02 15:04:05"),
			d.User.Email,
		}
		excel.SetRow(file, data, row, "")
		row += 1
	}

	if err != nil {
		utils.ResponseBadRequest(ctx, err)
		return
	}

	ctx.Header("Content-Disposition", "attachment; filename=users.xlsx")
	ctx.Header("Content-Type", "application/octet-stream")
	ctx.Header("Content-Transfer-Encoding", "binary")

	file.Write(ctx.Writer)
}

func Import(ctx *gin.Context) {
	var climate []models.ClimateObservation
	id := ctx.Param("id")
	var userID = ctx.MustGet("Id").(float64)

	file, err := ctx.FormFile("file")
	if err != nil {
		utils.ResponseBadRequest(ctx, err)
		return
	}

	f, err := file.Open()
	if err != nil {
		utils.ResponseBadRequest(ctx, err)
		return
	}

	defer f.Close()

	results, headers, err := excel.ReadXLSX(f)
	if err != nil {
		utils.ResponseBadRequest(ctx, err)
		return
	}

	expectedHeader := []string{
		"Date",
		"Curah Hujan",
		"Min Temperature",
		"Max Temperature",
		"Kelembapan",
		"Kecepatan Angin",
		"Durasi Penyinaran Matahari",
		"Penguapan",
	}

	if !reflect.DeepEqual(headers, expectedHeader) {
		utils.ResponseBadRequest(ctx, errors.New("invalid header"))
		return
	}

	for _, result := range results {
		var item models.ClimateObservation
		parsedId, err := strconv.Atoi(id)
		if err != nil {
			utils.ResponseBadRequest(ctx, err)
			return
		}
		location, _ := time.LoadLocation(DEFAULT_TIME_ZONE)
		parsedDate, err := time.ParseInLocation("2006-01-02", result[0], location)

		if err != nil {
			utils.ResponseBadRequest(ctx, err)
			return
		}

		item.RiverID = uint(parsedId)
		item.Date = parsedDate
		item.UserID = uint(userID)

		if result[1] != "" {
			item.Rainfall, _ = strconv.ParseFloat(result[1], 64)
		} else {
			item.Rainfall = 0
		}

		if result[2] != "" {
			item.MinTemperature, _ = strconv.ParseFloat(result[2], 64)
		} else {
			item.MinTemperature = 0
		}

		if result[3] != "" {
			item.MaxTemperature, _ = strconv.ParseFloat(result[3], 64)
		} else {
			item.MaxTemperature = 0
		}

		if result[4] != "" {
			item.Humidity, _ = strconv.ParseFloat(result[4], 64)
		} else {
			item.Humidity = 0
		}

		if result[5] != "" {
			item.WindSpeed, _ = strconv.ParseFloat(result[5], 64)
		} else {
			item.WindSpeed = 0
		}

		if result[6] != "" {
			item.IlluminationDuration, _ = strconv.ParseFloat(result[6], 64)
		} else {
			item.IlluminationDuration = 0
		}

		if result[7] != "" {
			item.Evaporation, _ = strconv.ParseFloat(result[7], 64)
		} else {
			item.Evaporation = 0
		}

		climate = append(climate, item)
	}

	err = repository.Create(&climate)

	if err != nil {
		utils.ResponseBadRequest(ctx, err)
		return
	}

	utils.ResponseSuccess(ctx, climate)
}
