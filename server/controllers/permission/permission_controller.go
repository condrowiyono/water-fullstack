package permission

import (
	"fmt"
	"mini-bank/models"
	"mini-bank/repository"
	"mini-bank/utils"

	"github.com/gin-gonic/gin"
)

type Filter struct {
	Name string `form:"name"`
}

func GetAll(ctx *gin.Context) {
	var permission []*models.Permission
	var filter Filter
	ctx.BindQuery(&filter)
	pagination := utils.GetPagination(ctx)
	repository.GetWithFilter(&permission, &filter, pagination)

	utils.ResponseSuccess(ctx, permission)
}

func Create(ctx *gin.Context) {
	var permission models.Permission

	err := ctx.BindJSON(&permission)
	if err != nil {
		utils.ResponseBadRequest(ctx, err)
		return
	}

	err = repository.Create(&permission)
	if err != nil {
		utils.ResponseBadRequest(ctx, err)
		return
	}

	utils.ResponseCreated(ctx, permission)
}

func GetByID(ctx *gin.Context) {
	var permission models.Permission

	id := ctx.Param("id")
	err := repository.GetByID(&permission, id)

	fmt.Println("err", err)
	if err != nil {
		utils.ResponseNotFound(ctx, err)
		return
	}

	utils.ResponseSuccess(ctx, permission)
}

func Update(ctx *gin.Context) {
	var permission models.Permission
	id := ctx.Param("id")
	err := repository.GetByID(&permission, id)

	if err != nil {
		utils.ResponseNotFound(ctx, err)
		return
	}

	err = ctx.BindJSON(&permission)
	if err != nil {
		utils.ResponseBadRequest(ctx, err)
		return
	}

	err = repository.Update(&permission)
	if err != nil {
		utils.ResponseBadRequest(ctx, err)
		return
	}

	utils.ResponseSuccess(ctx, permission)
}

func Delete(ctx *gin.Context) {
	var permission models.Permission
	id := ctx.Param("id")
	err := repository.GetByID(&permission, id)

	if err != nil {
		utils.ResponseNotFound(ctx, err)
		return
	}

	err = repository.Delete(&permission)
	if err != nil {
		utils.ResponseBadRequest(ctx, err)
		return
	}

	utils.ResponseSuccess(ctx, permission)
}
