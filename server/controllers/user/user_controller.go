package user

import (
	"fmt"
	"mini-bank/models"
	"mini-bank/repository"
	"mini-bank/utils"

	"github.com/gin-gonic/gin"
)

func GetAll(ctx *gin.Context) {
	var user []*models.User
	var filter UserFilerDTO
	ctx.BindQuery(&filter)

	pagination := utils.Pagination{Page: filter.Page, Limit: filter.Limit}
	preload := []string{"Roles", "River"}
	total, err := repository.GetWithSearchFilter(&user, &filter, &pagination, &preload)

	if err != nil {
		utils.ResponseBadRequest(ctx, err)
		return
	}

	utils.ResponseListSuccess(ctx, user, utils.Meta{Page: pagination.Page, Limit: pagination.Limit, Total: total})
}

func Create(ctx *gin.Context) {
	var user models.User

	err := ctx.BindJSON(&user)
	if err != nil {
		utils.ResponseBadRequest(ctx, err)
		return
	}

	user.Password = utils.HashPassword(user.Password)

	err = repository.Create(&user)
	if err != nil {
		utils.ResponseBadRequest(ctx, err)
		return
	}

	utils.ResponseCreated(ctx, user)
}

func GetByID(ctx *gin.Context) {
	var user models.User

	id := ctx.Param("id")
	preload := "Roles"
	err := repository.GetByIDWithPreload(&user, id, preload)

	fmt.Println("err", err)
	if err != nil {
		utils.ResponseNotFound(ctx, err)
		return
	}
	user.Password = ""
	utils.ResponseSuccess(ctx, user)
}

func Update(ctx *gin.Context) {
	var user models.User
	id := ctx.Param("id")
	err := repository.GetByID(&user, id)

	if err != nil {
		utils.ResponseNotFound(ctx, err)
		return
	}

	err = ctx.BindJSON(&user)
	if err != nil {
		utils.ResponseBadRequest(ctx, err)
		return
	}

	user.Password = utils.HashPassword(user.Password)

	err = repository.Update(&user)
	if err != nil {
		utils.ResponseBadRequest(ctx, err)
		return
	}

	utils.ResponseSuccess(ctx, user)
}

func Delete(ctx *gin.Context) {
	var user models.User
	id := ctx.Param("id")
	err := repository.GetByID(&user, id)

	if err != nil {
		utils.ResponseNotFound(ctx, err)
		return
	}

	err = repository.Delete(&user)
	if err != nil {
		utils.ResponseBadRequest(ctx, err)
		return
	}

	utils.ResponseSuccess(ctx, user)
}

func AttachRole(ctx *gin.Context) {
	var roles AttachRoleToUser
	id := ctx.Param("id")
	err := ctx.BindJSON(&roles)
	if err != nil {
		utils.ResponseBadRequest(ctx, err)
		return
	}

	err = repository.AttachRoleToUser(id, roles.Role)
	if err != nil {
		utils.ResponseBadRequest(ctx, err)
		return
	}

	utils.ResponseSuccess(ctx, nil)
}
