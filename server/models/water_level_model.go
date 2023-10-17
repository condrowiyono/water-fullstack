package models

import (
	"time"

	"gorm.io/gorm"
)

type WaterLevelObservation struct {
	ID          uint              `gorm:"primarykey" json:"id"`
	RiverID     uint              `json:"river_id" binding:"required" form:"river_id"`
	River       *RiverObservation `json:"river"`
	Date        time.Time         `json:"date" form:"date"`
	Data        float64           `json:"data" binding:"required" form:"data"`
	Observation string            `json:"observation"` // Manual or Telemetry
	Descrption  string            `json:"description"`
	Event       string            `json:"event"`
	UserID      uint              `json:"user_id"`
	User        *User             `json:"user" binding:""`
	CreatedAt   time.Time         `json:"created_at"`
	UpdatedAt   time.Time         `json:"updated_at"`
	DeletedAt   gorm.DeletedAt    `gorm:"index" json:"deleted_at"`
}
