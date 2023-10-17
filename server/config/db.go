package config

import (
	"fmt"
	"time"

	"github.com/spf13/viper"

	"github.com/go-sql-driver/mysql"
)

type DatabaseConfiguration struct {
	Driver   string
	Dbname   string
	Username string
	Password string
	Host     string
	Port     string
	LogMode  bool
}

func DbConfiguration() string {
	masterDBName := viper.GetString("MASTER_DB_NAME")
	masterDBUser := viper.GetString("MASTER_DB_USER")
	masterDBPassword := viper.GetString("MASTER_DB_PASSWORD")
	masterDBHost := viper.GetString("MASTER_DB_HOST")
	masterDBPort := viper.GetString("MASTER_DB_PORT")

	masterDBTimeZone := viper.GetString("SERVER_TIMEZONE")

	loc, _ := time.LoadLocation(masterDBTimeZone)

	c := mysql.Config{
		Net:                  "tcp",
		User:                 masterDBUser,
		Passwd:               masterDBPassword,
		Addr:                 fmt.Sprintf("%v:%v", masterDBHost, masterDBPort),
		DBName:               masterDBName,
		ParseTime:            true,
		Loc:                  loc,
		AllowNativePasswords: true,
	}

	masterDBDSN := c.FormatDSN()

	return masterDBDSN
}
