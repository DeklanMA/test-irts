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

func AdminGetProducts(c *gin.Context) {
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
		Order("id DESC").
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
		Data:    products,
		Meta: gin.H{
			"page":        page,
			"limit":       limit,
			"total":       total,
			"total_pages": int(math.Ceil(float64(total) / float64(limit))),
		},
	})
}



func AdminCreateProduct(c *gin.Context) {
	var input dto.ProductInput

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, dto.APIResponse{
			Success: false,
			Message: err.Error(),
		})
		return
	}

	product := models.Product{
		ProductName:     input.ProductName,
		ProductPrice:    input.ProductPrice,
		Brand:           input.Brand,
		ProductImageURL: input.ProductImageURL,
		ProductInfo:     input.ProductInfo,
		RealPDPURL:      input.RealPDPURL,
	}

	if err := config.DB.Create(&product).Error; err != nil {
		c.JSON(http.StatusInternalServerError, dto.APIResponse{
			Success: false,
			Message: "failed to create product",
		})
		return
	}

	c.JSON(http.StatusCreated, dto.APIResponse{
		Success: true,
		Message: "product created",
		Data:    product,
	})

}



func AdminUpdateProduct(c *gin.Context) {
	var product models.Product
	var input dto.ProductInput

	if err := config.DB.First(&product, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, dto.APIResponse{
			Success: false,
			Message: "product not found",
		})
		return
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, dto.APIResponse{
			Success: false,
			Message: err.Error(),
		})
		return
	}

	product.ProductName = input.ProductName
	product.ProductPrice = input.ProductPrice
	product.Brand = input.Brand
	product.ProductImageURL = input.ProductImageURL
	product.ProductInfo = input.ProductInfo
	product.RealPDPURL = input.RealPDPURL

	if err := config.DB.Save(&product).Error; err != nil {
		c.JSON(http.StatusInternalServerError, dto.APIResponse{
			Success: false,
			Message: "failed to update product",
		})
		return
	}

	c.JSON(http.StatusOK, dto.APIResponse{
		Success: true,
		Message: "product updated",
		Data:    product,
	})
}



func AdminDeleteProduct(c *gin.Context) {
	var product models.Product

	if err := config.DB.First(&product, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, dto.APIResponse{
			Success: false,
			Message: "product not found",
		})
		return
	}

	if err := config.DB.Delete(&product).Error; err != nil {
		c.JSON(http.StatusInternalServerError, dto.APIResponse{
			Success: false,
			Message: "failed to delete product",
		})
		return
	}

	c.JSON(http.StatusOK, dto.APIResponse{
		Success: true,
		Message: "product deleted",
	})
}
