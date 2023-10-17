package models

import (
	"time"

	"gorm.io/gorm"
)

type Role struct {
	ID          uint           `gorm:"primarykey"`
	Name        string         `gorm:"unique" json:"name" binding:"required"`
	Description string         `json:"description" binding:"required"`
	Permissions []Permission   `gorm:"many2many:role_permissions;" json:"permissions,omitempty"`
	CreatedAt   time.Time      `json:"created_at"`
	UpdatedAt   time.Time      `json:"updated_at"`
	DeletedAt   gorm.DeletedAt `gorm:"index" json:"deleted_at"`
}

// TableName is Database TableName of this model
func (role *Role) TableName() string {
	return "roles"
}
