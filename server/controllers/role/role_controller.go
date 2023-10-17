package role

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
	var role []*models.Role
	var filter Filter
	ctx.BindQuery(&filter)

	pagination := utils.GetPagination(ctx)
	preload := "Permissions"

	repository.GetWithFilterWithPreload(&role, &filter, pagination, preload)

	utils.ResponseSuccess(ctx, role)
}

func Create(ctx *gin.Context) {
	var role models.Role

	err := ctx.BindJSON(&role)
	if err != nil {
		utils.ResponseBadRequest(ctx, err)
		return
	}

	err = repository.Create(&role)
	if err != nil {
		utils.ResponseBadRequest(ctx, err)
		return
	}

	utils.ResponseCreated(ctx, role)
}

func GetByID(ctx *gin.Context) {
	var role models.Role

	id := ctx.Param("id")
	err := repository.GetByIDWithPreload(&role, id, "Permissions")

	fmt.Println("err", err)
	if err != nil {
		utils.ResponseNotFound(ctx, err)
		return
	}

	utils.ResponseSuccess(ctx, role)
}

func Update(ctx *gin.Context) {
	var role models.Role
	id := ctx.Param("id")
	err := repository.GetByID(&role, id)

	if err != nil {
		utils.ResponseNotFound(ctx, err)
		return
	}

	err = ctx.BindJSON(&role)
	if err != nil {
		utils.ResponseBadRequest(ctx, err)
		return
	}

	err = repository.Update(&role)
	if err != nil {
		utils.ResponseBadRequest(ctx, err)
		return
	}

	utils.ResponseSuccess(ctx, role)
}

func Delete(ctx *gin.Context) {
	var role models.Role
	id := ctx.Param("id")
	err := repository.GetByID(&role, id)

	if err != nil {
		utils.ResponseNotFound(ctx, err)
		return
	}

	err = repository.Delete(&role)
	if err != nil {
		utils.ResponseBadRequest(ctx, err)
		return
	}

	utils.ResponseSuccess(ctx, role)
}

func AddPermissions(ctx *gin.Context) {
	var permissions AddPermissionsToRole
	id := ctx.Param("id")
	err := ctx.BindJSON(&permissions)
	if err != nil {
		utils.ResponseBadRequest(ctx, err)
		return
	}

	err = repository.AddPermissionsToRole(id, permissions.Permission)
	if err != nil {
		utils.ResponseBadRequest(ctx, err)
		return
	}

	utils.ResponseSuccess(ctx, nil)
}
