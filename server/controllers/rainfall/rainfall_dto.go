package rainfall

import (
	"mini-bank/utils"
)

type RainfallFilterDTO struct {
	utils.Pagination
	RiverID uint   `form:"river_id"`
	Name    string `gorm:"name" form:"name"`
}

type ExportDTO struct {
	Year string `form:"year"`
}

type ChartDataDTO struct {
	Date    string `form:"date" binding:"required"`
	RiverID uint   `form:"river_id" binding:"required"`
}

type FilterAllByDateDTO struct {
	Date string `form:"date" binding:"required"`
}
