package waterlevel

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
	var waterlevel []*models.WaterLevelObservation
	var filter WaterLevelFilterDTO
	ctx.BindQuery(&filter)

	pagination := utils.Pagination{Page: filter.Page, Limit: filter.Limit}
	total, err := repository.GetWithFilter(&waterlevel, &filter, pagination)

	if err != nil {
		utils.ResponseBadRequest(ctx, err)
		return
	}

	utils.ResponseListSuccess(ctx, waterlevel, utils.Meta{Page: pagination.Page, Limit: pagination.Limit, Total: total})
}

func Create(ctx *gin.Context) {
	var userID = ctx.MustGet("Id").(float64)
	var waterlevel models.WaterLevelObservation

	err := ctx.BindJSON(&waterlevel)
	if err != nil {
		utils.ResponseBadRequest(ctx, err)
		return
	}

	waterlevel.UserID = uint(userID)

	err = repository.Create(&waterlevel)
	if err != nil {
		utils.ResponseBadRequest(ctx, err)
		return
	}

	utils.ResponseCreated(ctx, waterlevel)
}

func GetByID(ctx *gin.Context) {
	var waterlevel models.WaterLevelObservation

	id := ctx.Param("id")
	err := repository.GetByID(&waterlevel, id)

	if err != nil {
		utils.ResponseNotFound(ctx, err)
		return
	}

	utils.ResponseSuccess(ctx, waterlevel)

}

func Update(ctx *gin.Context) {
	var waterlevel models.WaterLevelObservation
	id := ctx.Param("id")
	err := repository.GetByID(&waterlevel, id)
	if err != nil {
		utils.ResponseBadRequest(ctx, err)
		return
	}
	err = ctx.BindJSON(&waterlevel)
	if err != nil {
		utils.ResponseBadRequest(ctx, err)
		return
	}

	err = repository.Update(&waterlevel)
	if err != nil {
		utils.ResponseBadRequest(ctx, err)
		return
	}

	utils.ResponseSuccess(ctx, waterlevel)
}

func Delete(ctx *gin.Context) {
	var waterlevel models.WaterLevelObservation

	id := ctx.Param("id")
	err := repository.GetByID(&waterlevel, id)
	if err != nil {
		utils.ResponseBadRequest(ctx, err)
		return
	}
	err = repository.Delete(&waterlevel)

	if err != nil {
		utils.ResponseBadRequest(ctx, err)
		return
	}

	utils.ResponseSuccess(ctx, nil)
}

func GetToday(ctx *gin.Context) {
	var waterlevel *[]models.WaterLevelObservation
	riverID := ctx.Param("river")

	err := repository.FindToday(&waterlevel, riverID)

	if err != nil {
		utils.ResponseSuccess(ctx, nil)
		return
	}

	utils.ResponseSuccess(ctx, waterlevel)
}

func GetAllToday(ctx *gin.Context) {
	now := time.Now()
	results, err := repository.GetAllWaterLevelByDate(now)

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

	results, err := repository.GetAllWaterLevelByDate(date)

	if err != nil {
		utils.ResponseSuccess(ctx, nil)
		return
	}

	utils.ResponseSuccess(ctx, results)
}

func ExportByID(ctx *gin.Context) {
	var waterlevel []models.WaterLevelObservation
	var filter WaterLevelExportDTO
	riverID := ctx.Param("id")
	ctx.BindQuery(&filter)

	if filter.Year == "" {
		utils.ResponseBadRequest(ctx, errors.New("year is required"))
		return
	}

	err := repository.ExportObservationByYear(&waterlevel, riverID, filter.Year)

	if err != nil {
		utils.ResponseBadRequest(ctx, err)
		return
	}

	location, _ := time.LoadLocation(DEFAULT_TIME_ZONE)

	file, err := excel.CreateFile()
	row := 1

	header := []string{
		"Date",
		"Data",
		"Keterangan",
		"Kejadian",
		"Created At",
		"Updated At",
		"Created By",
	}

	excel.SetRow(file, header, row, "")
	row += 1

	for _, d := range waterlevel {

		data := []string{
			d.Date.In(location).Format("2006-01-02 15:04:05"),
			fmt.Sprintf("%v", d.Data),
			d.Descrption,
			d.Event,
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
	var waterlevels []models.WaterLevelObservation
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
		"Data",
	}

	if !reflect.DeepEqual(headers, expectedHeader) {
		utils.ResponseBadRequest(ctx, errors.New("invalid header"))
		return
	}

	for _, result := range results {
		var item models.WaterLevelObservation
		parsedId, err := strconv.Atoi(id)
		if err != nil {
			utils.ResponseBadRequest(ctx, err)
			return
		}
		location, _ := time.LoadLocation(DEFAULT_TIME_ZONE)
		parsedDate, err := time.ParseInLocation("2006-01-02 15:04:05", result[0], location)

		if err != nil {
			utils.ResponseBadRequest(ctx, err)
			return
		}

		if (len(result) < 2) || (result[1] == "") {
			continue
		}

		data := result[1]
		parserData, err := strconv.ParseFloat(data, 64)
		if err != nil {
			utils.ResponseBadRequest(ctx, err)
			return
		}

		item.RiverID = uint(parsedId)
		item.Date = parsedDate
		item.Data = parserData
		item.UserID = uint(userID)

		waterlevels = append(waterlevels, item)
	}

	err = repository.Create(&waterlevels)

	if err != nil {
		utils.ResponseBadRequest(ctx, err)
		return
	}

	utils.ResponseSuccess(ctx, waterlevels)
}
