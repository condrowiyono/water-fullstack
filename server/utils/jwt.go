package utils

import (
	"errors"
	"mini-bank/config"
	"strings"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)

var (
	AuthSigningMethod = "HS256"
	Secret            = config.JWTConfig()

	JwtPayload = "JWTPayload"

	SubscriptionAccess = "SubscriptionAccess"
	UserID             = "UserID"
	Email              = "Email"

	ErrInvalidSigningAlgorithm = errors.New("invalid signing algorithm")
	ErrEmptyAuthHeader         = errors.New("auth header is empty")
	ErrInvalidAuthHeader       = errors.New("auth header is invalid")
)

type TokenPayload struct {
	Id    uint   `json:"id"`
	Email string `json:"email"`
}

func tokenParser(token *jwt.Token) (interface{}, error) {
	if jwt.GetSigningMethod(AuthSigningMethod) != token.Method {
		return nil, ErrInvalidSigningAlgorithm
	}

	return []byte(Secret), nil
}

func GenerateToken(payload TokenPayload) (string, error) {
	expire := time.Now().Add(time.Hour * 24 * 7).Unix()

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"id":    payload.Id,
		"email": payload.Email,
		"exp":   expire,
	})

	return token.SignedString([]byte(Secret))
}

func ExtractToken(ctx *gin.Context) (*jwt.Token, error) {
	// tokenString, err := ctx.Cookie("token")
	tokenString := ctx.Request.Header.Get("Authorization")
	if tokenString == "" {
		return nil, ErrEmptyAuthHeader
	}

	parts := strings.SplitN(tokenString, " ", 2)
	if !(len(parts) == 2 && parts[0] == "Bearer") {
		return nil, ErrInvalidAuthHeader
	}
	tokenString = parts[1]
	jwtToken, err := jwt.Parse(tokenString, tokenParser)

	if err != nil {
		return nil, err
	}

	return jwtToken, nil
}
