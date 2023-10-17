package models

import (
	"time"

	"gorm.io/gorm"
)

type ClimateObservation struct {
	ID                   uint              `gorm:"primarykey" json:"id"`
	RiverID              uint              `json:"river_id"`
	River                *RiverObservation `json:"river"`
	Rainfall             float64           `json:"rainfall"`
	Date                 time.Time         `json:"date"`
	MinTemperature       float64           `json:"min_temperature"`
	MaxTemperature       float64           `json:"max_temperature"`
	Humidity             float64           `json:"humidity"`
	WetHumidity          float64           `json:"wet_humidity"`
	DryHumidity          float64           `json:"dry_humidity"`
	WindSpeed            float64           `json:"wind_speed"`
	IlluminationDuration float64           `json:"illumination_duration"`
	Evaporation          float64           `json:"evaporation"`
	MinFloatLevel        float64           `json:"min_float_level"` // Minimum Apung
	MaxFloatLevel        float64           `json:"max_float_level"` // Maximum Apung
	UpperHook            float64           `json:"upper_hook"`      // Hook Niak
	LowerHook            float64           `json:"lower_hook"`      // Hook Turun
	Observation          string            `json:"observation"`     // Manual or Telemetry
	IlluminationProcess  string            `json:"illumination_process"`
	UserID               uint              `json:"user_id"`
	User                 *User             `json:"user"`
	CreatedAt            time.Time         `json:"created_at"`
	UpdatedAt            time.Time         `json:"updated_at"`
	DeletedAt            gorm.DeletedAt    `gorm:"index" json:"deleted_at"`
}
