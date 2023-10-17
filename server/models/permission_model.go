package models

import (
	"time"

	"gorm.io/gorm"
)

type Permission struct {
	ID          uint           `gorm:"primarykey"`
	Name        string         `gorm:"unique" json:"name" binding:"required"`
	Description string         `json:"description" binding:"required"`
	CreatedAt   time.Time      `json:"created_at"`
	UpdatedAt   time.Time      `json:"updated_at"`
	DeletedAt   gorm.DeletedAt `gorm:"index" json:"deleted_at"`
}

// TableName is Database TableName of this model
func (permission *Permission) TableName() string {
	return "permissions"
}
