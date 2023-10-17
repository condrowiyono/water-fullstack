package example

import (
	"mini-bank/models"
	"mini-bank/repository"
	"mini-bank/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetData(ctx *gin.Context) {
	var example []*models.Example
	repository.Get(&example, nil)

	ctx.JSON(http.StatusOK, utils.Response{
		Code:    http.StatusOK,
		Message: "success",
		Data:    example,
	})
}
