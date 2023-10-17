package utils

import (
	"strconv"

	"github.com/gin-gonic/gin"
)

type Pagination struct {
	Page  int `form:"page" json:"page"`
	Limit int `form:"limit" json:"limit"`
}

func GetPagination(ctx *gin.Context) Pagination {
	page, _ := strconv.Atoi(ctx.DefaultQuery("page", "1"))
	limit, _ := strconv.Atoi(ctx.DefaultQuery("limit", "20"))

	if page < 0 {
		page = 1
	}

	if limit <= 0 {
		limit = 20
	} else if limit > 100 {
		limit = 100
	}

	return Pagination{Page: page, Limit: limit}
}
