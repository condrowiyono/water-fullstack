package waterlevel

import "mini-bank/utils"

type WaterLevelFilterDTO struct {
	utils.Pagination
	Name    string `gorm:"name" form:"name"`
	RiverID uint   `form:"river_id"`
}

type WaterLevelExportDTO struct {
	Year string `form:"year"`
}

type FilterAllByDateDTO struct {
	Date string `form:"date" binding:"required"`
}
