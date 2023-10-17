package migrations

import (
	"mini-bank/infra/database"
	"mini-bank/models"
)

// Migrate Add list of model add for migrations
// TODO later separate migration each models
func Migrate() {
	var migrationModels = []interface{}{
		&models.Example{},
		&models.RiverObservation{},
		&models.Permission{},
		&models.Role{},
		&models.User{},

		// data
		&models.RainfallObservation{},
		&models.WaterLevelObservation{},
		&models.ClimateObservation{},
	}

	err := database.DB.AutoMigrate(migrationModels...)

	if err != nil {
		return
	}
}
