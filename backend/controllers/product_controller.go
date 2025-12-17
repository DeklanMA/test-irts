package controllers

import (
	"math"
	"net/http"
	"strconv"

	"irts-ecommerce/config"
	"irts-ecommerce/dto"
	"irts-ecommerce/models"

	"github.com/gin-gonic/gin"
)

func GetProducts(c *gin.Context) {
	var products []models.Product

	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "10"))

	if page < 1 {
		page = 1
	}
	if limit < 1 {
		limit = 10
	}

	offset := (page - 1) * limit

	var total int64
	if err := config.DB.Model(&models.Product{}).Count(&total).Error; err != nil {
		c.JSON(http.StatusInternalServerError, dto.APIResponse{
			Success: false,
			Message: "failed to count products",
		})
		return
	}

	if err := config.DB.
		Order("created_at DESC").
		Limit(limit).
		Offset(offset).
		Find(&products).Error; err != nil {

		c.JSON(http.StatusInternalServerError, dto.APIResponse{
			Success: false,
			Message: "failed to fetch products",
		})
		return
	}

	c.JSON(http.StatusOK, dto.APIResponse{
		Success: true,
		Message: "products fetched successfully",
		Data:    products,
		Meta: gin.H{
			"page":        page,
			"limit":       limit,
			"total":       total,
			"total_pages": int(math.Ceil(float64(total) / float64(limit))),
		},
	})
}

func GetProduct(c *gin.Context) {
	var product models.Product

	if err := config.DB.First(&product, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, dto.APIResponse{
			Success: false,
			Message: "product not found",
		})
		return
	}

	c.JSON(http.StatusOK, dto.APIResponse{
		Success: true,
		Message: "product fetched successfully",
		Data:    product,
	})
}
