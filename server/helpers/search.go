package helpers

import (
	"fmt"
	"mini-bank/utils"
	"time"

	"gorm.io/gorm"
)

func Search(field, search string) func(db *gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {
		if search != "" {
			db = db.Where(fmt.Sprintf("lower(%s) LIKE ?", field), fmt.Sprintf("%%%s%%", search))
		}
		return db
	}
}

func RangeDate(field string, startDate, endDate int64) func(db *gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {
		if startDate > 0 && endDate > 0 {
			start := time.Unix(startDate, 0)
			end := time.Unix(endDate, 0)

			db = db.Where(fmt.Sprintf("%s BETWEEN ? AND ?", field), start, end)
		}
		return db
	}
}

func WithPagination(pagination utils.Pagination) func(db *gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {
		page := pagination.Page
		limit := pagination.Limit

		if page < 0 {
			page = 1
		}
		if limit <= 0 {
			limit = 20
		} else if limit > 100 {
			limit = 100
		}

		offset := (page - 1) * limit
		return db.Offset(offset).Limit(limit)
	}
}
