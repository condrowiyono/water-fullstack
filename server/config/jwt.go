package config

import (
	"github.com/spf13/viper"
)

func JWTConfig() string {
	viper.SetDefault("JWT_SECRET", "secret")

	return viper.GetString("JWT_SECRET")
}
