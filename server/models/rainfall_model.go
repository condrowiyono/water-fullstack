package models

import (
	"time"

	"gorm.io/gorm"
)

type RainfallObservation struct {
	ID          uint              `gorm:"primarykey" json:"id"`
	RiverID     uint              `json:"river_id" binding:"required" form:"river_id"`
	River       *RiverObservation `json:"river"`
	Date        time.Time         `json:"date" form:"date"`
	Data        float64           `json:"data" binding:"required" form:"data"`
	Observation string            `json:"observation"` // Manual or Telemetry
	Duration    uint              `json:"duration"`    // in minutes
	Descrption  string            `json:"description"`
	Event       string            `json:"event"`
	UserID      uint              `json:"user_id"`
	User        *User             `json:"user"`
	CreatedAt   time.Time         `json:"created_at"`
	UpdatedAt   time.Time         `json:"updated_at"`
	DeletedAt   gorm.DeletedAt    `gorm:"index" json:"deleted_at"`
}
