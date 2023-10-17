package utils

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type Meta struct {
	Page  int   `json:"page"`
	Limit int   `json:"limit"`
	Total int64 `json:"total"`
}

type Response struct {
	Code    int         `json:"code"`
	Message string      `json:"message"`
	Data    interface{} `json:"data"`
	Meta    *Meta       `json:"meta,omitempty"`
}

type ResponseError struct {
	Code      int         `json:"code"`
	ErrorCode int         `json:"error_code"`
	Message   string      `json:"message"`
	Errors    interface{} `json:"errors"`
}

func ResponseListSuccess(ctx *gin.Context, data interface{}, meta Meta) {
	ctx.JSON(http.StatusOK, Response{
		Code:    http.StatusOK,
		Message: "success",
		Data:    data,
		Meta:    &meta,
	})
}

func ResponseSuccess(ctx *gin.Context, data interface{}) {
	ctx.JSON(http.StatusOK, Response{
		Code:    http.StatusOK,
		Message: "success",
		Data:    data,
	})
}

func ResponseCreated(ctx *gin.Context, data interface{}) {
	ctx.JSON(http.StatusCreated, Response{
		Code:    http.StatusCreated,
		Message: "success",
		Data:    data,
	})
}

func ResponseBadRequest(ctx *gin.Context, err error) {
	ctx.AbortWithStatusJSON(http.StatusBadRequest, ResponseError{
		Code:    http.StatusBadRequest,
		Message: "failed",
		Errors:  err.Error(),
	})
}

func ResponseNotFound(ctx *gin.Context, err error) {
	ctx.AbortWithStatusJSON(http.StatusNotFound, ResponseError{
		Code:    http.StatusNotFound,
		Message: "failed",
		Errors:  err.Error(),
	})
}

func ResponseInternalServerError(ctx *gin.Context, err error) {
	ctx.AbortWithStatusJSON(http.StatusInternalServerError, ResponseError{
		Code:    http.StatusInternalServerError,
		Message: "failed",
		Errors:  err.Error(),
	})
}

func ResponseUnauthorized(ctx *gin.Context, err error) {
	ctx.AbortWithStatusJSON(http.StatusUnauthorized, ResponseError{
		Code:    http.StatusUnauthorized,
		Message: "failed",
		Errors:  err.Error(),
	})
}

func ResponseForbidden(ctx *gin.Context, err error) {
	ctx.AbortWithStatusJSON(http.StatusForbidden, ResponseError{
		Code:    http.StatusForbidden,
		Message: "failed",
		Errors:  err.Error(),
	})
}
