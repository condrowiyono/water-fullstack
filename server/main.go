package main

import (
	"mini-bank/config"
	"mini-bank/infra/database"
	"mini-bank/infra/logger"
	"mini-bank/migrations"
	"mini-bank/routers"
	"time"

	"github.com/spf13/viper"
)

func main() {
	//set timezone
	loc, _ := time.LoadLocation(viper.GetString("SERVER_TIMEZONE"))
	time.Local = loc

	if err := config.SetupConfig(); err != nil {
		logger.Fatalf("config SetupConfig() error: %s", err)
	}
	masterDSN := config.DbConfiguration()

	if err := database.DbConnection(masterDSN); err != nil {
		logger.Fatalf("database DbConnection error: %s", err)
	}

	//later separate migration
	migrations.Migrate()

	router := routers.SetupRoute()
	logger.Fatalf("%v", router.Run(config.ServerConfig()))

}
