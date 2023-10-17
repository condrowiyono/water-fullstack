package climate

import (
	"mini-bank/utils"
)

type ClimateFilterDTO struct {
	utils.Pagination
	Name    string `gorm:"name" form:"name"`
	RiverID uint   `form:"river_id"`
}

type ExportDTO struct {
	Year string `form:"year"`
}

type FilterAllByDateDTO struct {
	Date string `form:"date" binding:"required"`
}
