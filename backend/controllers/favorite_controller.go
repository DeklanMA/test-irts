package controllers

import (
	"net/http"

	"irts-ecommerce/config"
	"irts-ecommerce/dto"
	"irts-ecommerce/models"
	"irts-ecommerce/utils"

	"github.com/gin-gonic/gin"
)



func AddFavorite(c *gin.Context) {
	userID := c.GetUint("user_id")
	if userID == 0 {
		c.JSON(http.StatusUnauthorized, gin.H{
			"success": false,
			"error":   "unauthorized",
		})
		return
	}

	productID := utils.StringToUint(c.Param("product_id"))
	if productID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"error":   "invalid product id",
		})
		return
	}


	var product models.Product
	if err := config.DB.First(&product, productID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"success": false,
			"error":   "product not found",
		})
		return
	}

	var fav models.Favorite

	err := config.DB.
		Where("user_id = ? AND product_id = ?", userID, productID).
		First(&fav).Error

	if err == nil {
		if err := config.DB.Delete(&fav).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"success": false,
				"error":   "failed to remove favorite",
			})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"success": true,
			"message": "removed from favorite",
			"status":  "unfavorited",
		})
		return
	}

	newFav := models.Favorite{
		UserID:    userID,
		ProductID: productID,
	}

	if err := config.DB.Create(&newFav).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"error":   "failed to add favorite",
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"success": true,
		"message": "added to favorite",
		"status":  "favorited",
	})
}



func GetFavorites(c *gin.Context) {
	userID := c.GetUint("user_id")
	if userID == 0 {
		c.JSON(http.StatusUnauthorized, dto.APIResponse{
			Success: false,
			Message: "unauthorized",
		})
		return
	}

	var favs []models.Favorite

	if err := config.DB.
		Preload("Product").
		Where("user_id = ?", userID).
		Find(&favs).Error; err != nil {

		c.JSON(http.StatusInternalServerError, dto.APIResponse{
			Success: false,
			Message: "failed to fetch favorites",
		})
		return
	}

	message := "favorites fetched successfully"
	if len(favs) == 0 {
		message = "no favorites yet"
	}

	c.JSON(http.StatusOK, dto.APIResponse{
		Success: true,
		Message: message,
		Data:    favs,
	})
}
