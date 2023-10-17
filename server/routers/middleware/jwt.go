package middleware

import (
	"mini-bank/utils"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)

func AuthMiddleware() gin.HandlerFunc {
	return func(ctx *gin.Context) {

		token, err := utils.ExtractToken(ctx)
		if err != nil {
			utils.ResponseUnauthorized(ctx, err)
			return
		}

		claims, _ := token.Claims.(jwt.MapClaims)
		ctx.Set("Id", claims["id"])
		ctx.Set("Email", claims["email"])

		ctx.Next()
	}
}
