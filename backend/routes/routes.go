package routes

import (
	"github.com/gin-gonic/gin"
	"irts-ecommerce/controllers"
	"irts-ecommerce/middleware"
)

func SetupRoutes(r *gin.Engine) {
	api := r.Group("/api")

	api.POST("/login", controllers.Login)
	api.POST("/register", controllers.Register)
	api.GET("/products", controllers.GetProducts)
	api.GET("/products/:id", controllers.GetProduct)


	auth := api.Group("/")
	auth.Use(middleware.AuthMiddleware())
	{
		auth.GET("/me", controllers.Me)
		auth.PUT("/profile", controllers.UpdateProfile)
		auth.POST("/favorites/:product_id", controllers.AddFavorite)
		auth.GET("/favorites", controllers.GetFavorites)
	}


	admin := api.Group("/admin")
	admin.Use(middleware.AuthMiddleware(), middleware.AdminOnly())
	{
		admin.GET("/products", controllers.AdminGetProducts)
		admin.POST("/products", controllers.AdminCreateProduct)
		admin.PUT("/products/:id", controllers.AdminUpdateProduct)
		admin.DELETE("/products/:id", controllers.AdminDeleteProduct)

		admin.GET("/users", controllers.AdminGetUsers)
		admin.GET("/users/:id", controllers.AdminGetUser)
		admin.POST("/users", controllers.AdminCreateUser)
		admin.PUT("/users/:id", controllers.AdminUpdateUser)
		admin.DELETE("/users/:id", controllers.AdminDeleteUser)
	}
}
