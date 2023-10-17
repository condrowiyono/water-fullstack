package routers

import (
	"mini-bank/controllers/auth"
	"mini-bank/controllers/climate"
	"mini-bank/controllers/example"
	"mini-bank/controllers/permission"
	"mini-bank/controllers/rainfall"
	"mini-bank/controllers/river"
	"mini-bank/controllers/role"
	"mini-bank/controllers/upload"
	"mini-bank/controllers/user"
	"mini-bank/controllers/waterlevel"
	"mini-bank/routers/middleware"
	"net/http"

	"github.com/gin-gonic/gin"
)

// RegisterRoutes add all routing list here automatically get main router
func RegisterRoutes(route *gin.Engine) {
	route.NoRoute(func(ctx *gin.Context) {
		ctx.JSON(http.StatusNotFound, gin.H{"status": http.StatusNotFound, "message": "Route Not Found"})
	})

	route.GET("/health", func(ctx *gin.Context) { ctx.JSON(http.StatusOK, gin.H{"live": "ok"}) })

	route.GET("/example", example.GetData)
	route.POST("/login", auth.Login)
	route.POST("/register", auth.Register)

	route.GET("/rivers", river.GetAllNoPagination)
	route.GET("/rivers/:id", river.GetByID)
	route.GET("/rivers-count", river.GetRiverCount)

	route.GET("/rainfalls/today/:river", rainfall.GetToday)
	route.GET("/waterlevels/today/:river", waterlevel.GetToday)
	route.GET("/climates/today/:river", climate.GetToday)

	route.GET("/data/rainfalls/today", rainfall.GetAllToday)
	route.GET("/data/rainfalls/by-date", rainfall.GetAllByDate)
	route.GET("/data/rainfalls/intraday", rainfall.GetIntraday)
	route.GET("/data/rainfalls/monthly", rainfall.GetMonthly)
	route.GET("/data/rainfalls/yearly", rainfall.GetYearly)
	route.GET("/data/rainfalls/max", rainfall.GetMax)

	route.GET("/data/waterlevels/today", waterlevel.GetAllToday)
	route.GET("/data/waterlevels/by-date", waterlevel.GetAllByDate)

	route.GET("/data/climates/today", climate.GetAllToday)
	route.GET("/data/climates/by-date", climate.GetAllByDate)

	route.POST("/upload", upload.UploadImage)

	meRoute := route.Group("/me")
	{
		meRoute.Use(middleware.AuthMiddleware())

		meRoute.GET("", auth.GetProfile)
	}

	adminReadRoute := route.Group("/admin")
	{
		adminReadRoute.GET("/rivers", river.GetAll)
		adminReadRoute.GET("/rivers/:id", river.GetByID)

		adminReadRoute.GET("/rainfalls", rainfall.GetAll)
		adminReadRoute.GET("/rainfalls/:id", rainfall.GetByID)

		adminReadRoute.GET("/waterlevels", waterlevel.GetAll)
		adminReadRoute.GET("/waterlevels/:id", waterlevel.GetByID)

		adminReadRoute.GET("/climates", climate.GetAll)
		adminReadRoute.GET("/climates/:id", climate.GetByID)
	}

	adminWriteRoute := route.Group("/admin")
	{
		adminWriteRoute.Use(middleware.AuthMiddleware())

		adminWriteRoute.GET("/permissions", permission.GetAll)
		adminWriteRoute.GET("/permissions/:id", permission.GetByID)
		adminWriteRoute.POST("/permissions", permission.Create)
		adminWriteRoute.PUT("/permissions/:id", permission.Update)
		adminWriteRoute.DELETE("/permissions/:id", permission.Delete)

		adminWriteRoute.GET("/roles", role.GetAll)
		adminWriteRoute.GET("/roles/:id", role.GetByID)
		adminWriteRoute.POST("/roles/:id/add-permissions", role.AddPermissions)
		adminWriteRoute.POST("/roles", role.Create)
		adminWriteRoute.PUT("/roles/:id", role.Update)
		adminWriteRoute.DELETE("/roles/:id", role.Delete)

		adminWriteRoute.GET("/users", user.GetAll)
		adminWriteRoute.GET("/users/:id", user.GetByID)
		adminWriteRoute.POST("/users/:id/attach-roles", user.AttachRole)
		adminWriteRoute.POST("/users", user.Create)
		adminWriteRoute.PUT("/users/:id", user.Update)
		adminWriteRoute.DELETE("/users/:id", user.Delete)

		adminWriteRoute.POST("/rivers", river.Create)
		adminWriteRoute.PUT("/rivers/:id", river.Update)
		adminWriteRoute.DELETE("/rivers/:id", river.Delete)

		adminWriteRoute.PUT("/waterlevels/:id", waterlevel.Update)
		adminWriteRoute.DELETE("/waterlevels/:id", waterlevel.Delete)
		adminWriteRoute.GET("/waterlevels/:id/export", waterlevel.ExportByID)
		adminWriteRoute.POST("/waterlevels/:id/import", waterlevel.Import)

		adminWriteRoute.PUT("/rainfalls/:id", rainfall.Update)
		adminWriteRoute.DELETE("/rainfalls/:id", rainfall.Delete)
		adminWriteRoute.GET("/rainfalls/:id/export", rainfall.ExportByID)
		adminWriteRoute.POST("/rainfalls/:id/import", rainfall.Import)

		adminWriteRoute.PUT("/climates/:id", climate.Update)
		adminWriteRoute.DELETE("/climates/:id", climate.Delete)
		adminWriteRoute.GET("/climates/:id/export", climate.ExportByID)
		adminWriteRoute.POST("/climates/:id/import", climate.Import)
	}

	mobileRoute := route.Group("/mobile")
	{
		mobileRoute.Use(middleware.AuthMiddleware())

		mobileRoute.POST("/waterlevels", waterlevel.Create)
		mobileRoute.POST("/rainfalls", rainfall.Create)
		mobileRoute.POST("/climates", climate.Create)
	}

	staticRoute := route.Group("/public")
	{
		staticRoute.Static("", "./public")
	}

}
