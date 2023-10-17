package river

import (
	"mini-bank/infra/database"
	"mini-bank/models"
	"mini-bank/repository"
	"mini-bank/utils"

	"github.com/gin-gonic/gin"
)

func GetAll(ctx *gin.Context) {
	var river []*models.RiverObservation
	var filter RiverFilterDTO
	ctx.BindQuery(&filter)

	pagination := utils.Pagination{Page: filter.Page, Limit: filter.Limit}
	total, err := repository.GetWithSearchFilter(&river, &filter, &pagination, nil)

	if err != nil {
		utils.ResponseBadRequest(ctx, err)
		return
	}

	utils.ResponseListSuccess(ctx, river, utils.Meta{Page: pagination.Page, Limit: pagination.Limit, Total: total})
}

func GetAllNoPagination(ctx *gin.Context) {
	var river []*models.RiverObservation
	var filter RiverFilterDTO
	ctx.BindQuery(&filter)

	err := repository.Get(&river, &filter)

	if err != nil {
		utils.ResponseBadRequest(ctx, err)
		return
	}

	utils.ResponseListSuccess(ctx, river, utils.Meta{Page: 1, Limit: 1, Total: 1})
}

func Create(ctx *gin.Context) {
	var river models.RiverObservation

	err := ctx.BindJSON(&river)
	if err != nil {
		utils.ResponseBadRequest(ctx, err)
		return
	}

	err = repository.Create(&river)
	if err != nil {
		utils.ResponseBadRequest(ctx, err)
		return
	}

	utils.ResponseCreated(ctx, river)
}

func GetByID(ctx *gin.Context) {
	var river models.RiverObservation

	id := ctx.Param("id")
	err := repository.GetByID(&river, id)

	if err != nil {
		utils.ResponseNotFound(ctx, err)
		return
	}

	utils.ResponseSuccess(ctx, river)
}

func Update(ctx *gin.Context) {
	var river models.RiverObservation
	id := ctx.Param("id")
	err := repository.GetByID(&river, id)

	if err != nil {
		utils.ResponseNotFound(ctx, err)
		return
	}

	err = ctx.BindJSON(&river)
	if err != nil {
		utils.ResponseBadRequest(ctx, err)
		return
	}

	err = repository.Update(&river)
	if err != nil {
		utils.ResponseBadRequest(ctx, err)
		return
	}

	utils.ResponseSuccess(ctx, &river)
}

func Delete(ctx *gin.Context) {
	var river models.RiverObservation

	id := ctx.Param("id")
	err := repository.GetByID(&river, id)
	if err != nil {
		utils.ResponseNotFound(ctx, err)
		return
	}
	err = repository.Delete(&river)
	if err != nil {
		utils.ResponseNotFound(ctx, err)
		return
	}

	utils.ResponseSuccess(ctx, river)
}

func GetRiverCount(ctx *gin.Context) {
	result := make(map[string]map[string]int)

	rows, err := database.DB.Table("river_observations").Select("type, observation, count(*) as count").Group("type, observation").Rows()
	if err != nil {
		utils.ResponseBadRequest(ctx, err)
		return
	}
	defer rows.Close()

	for rows.Next() {
		var riverType, observation string
		var count int
		err := rows.Scan(&riverType, &observation, &count)
		if err != nil {
			utils.ResponseBadRequest(ctx, err)
			return
		}

		if _, ok := result[riverType]; !ok {
			result[riverType] = make(map[string]int)
		}

		result[riverType][observation] = count
	}

	utils.ResponseSuccess(ctx, &result)
}
