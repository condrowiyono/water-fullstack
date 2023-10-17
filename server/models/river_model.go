package models

import (
	"time"

	"gorm.io/gorm"
)

type RiverObservation struct {
	ID               uint           `gorm:"primarykey" json:"id"`
	Name             string         `json:"name"`
	Type             string         `json:"type"` // PCH, TMA, and IKLIM
	RiverRegion      string         `json:"river_region"`
	Watershed        string         `json:"watershed"`
	Tributary        string         `json:"tributary"`
	MainRiver        string         `json:"main_river"`
	RegistryNumber   string         `json:"registry_number"`
	Latitude         float64        `json:"latitude"`
	Longitude        float64        `json:"longitude"`
	Village          string         `json:"village"`
	District         string         `json:"district"`
	City             string         `json:"city"`
	Observation      string         `json:"observation"` // Manual or Telemetry
	File             string         `json:"file"`
	GreenLight       float64        `json:"green_light"`
	YellowLight      float64        `json:"yellow_light"`
	RedLight         float64        `json:"red_light"`
	Elevation        float64        `json:"elevation"`
	ConstructionYear int            `json:"construction_year"`
	Operator         string         `json:"operator"`
	Maker            string         `json:"maker"`
	CreatedAt        time.Time      `json:"created_at"`
	UpdatedAt        time.Time      `json:"updated_at"`
	DeletedAt        gorm.DeletedAt `gorm:"index" json:"deleted_at"`
}
