package controllers

import (
	"math"
	"net/http"
	"strconv"

	"irts-ecommerce/config"
	"irts-ecommerce/dto"
	"irts-ecommerce/models"
	"irts-ecommerce/utils"

	"github.com/gin-gonic/gin"
)


func AdminGetUsers(c *gin.Context) {
	var users []models.User

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
	if err := config.DB.Model(&models.User{}).Count(&total).Error; err != nil {
		c.JSON(http.StatusInternalServerError, dto.APIResponse{
			Success: false,
			Message: "failed to count users",
		})
		return
	}

	if err := config.DB.
		Order("id DESC").
		Limit(limit).
		Offset(offset).
		Find(&users).Error; err != nil {

		c.JSON(http.StatusInternalServerError, dto.APIResponse{
			Success: false,
			Message: "failed to fetch users",
		})
		return
	}

	message := "users fetched successfully"
	if len(users) == 0 {
		message = "no users found"
	}

	c.JSON(http.StatusOK, dto.APIResponse{
		Success: true,
		Message: message,
		Data:    users,
		Meta: gin.H{
			"page":        page,
			"limit":       limit,
			"total":       total,
			"total_pages": int(math.Ceil(float64(total) / float64(limit))),
		},
	})
}



func AdminGetUser(c *gin.Context) {
	var user models.User

	if err := config.DB.First(&user, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, dto.APIResponse{
			Success: false,
			Message: "user not found",
		})
		return
	}

	c.JSON(http.StatusOK, dto.APIResponse{
		Success: true,
		Data:    user,
	})
}


func AdminCreateUser(c *gin.Context) {
	var input dto.AdminCreateUserInput

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, dto.APIResponse{
			Success: false,
			Message: err.Error(),
		})
		return
	}

	hashed := utils.HashPassword(input.Password)

	user := models.User{
		Name:     input.Name,
		Email:    input.Email,
		Password: hashed,
		Role:     input.Role,
	}

	if err := config.DB.Create(&user).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"error":   "email already exists",
		})
		return
	}

	c.JSON(http.StatusCreated, dto.APIResponse{
		Success: true,
		Message: "user created",
		Data: dto.UserResponse{
			ID:    user.ID,
			Name:  user.Name,
			Email: user.Email,
			Role:  user.Role,
		},
	})
}


func AdminUpdateUser(c *gin.Context) {
	var user models.User
	var input dto.AdminUpdateUserInput

	if err := config.DB.First(&user, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, dto.APIResponse{
			Success: false,
			Message: "user not found",
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

	user.Name = input.Name
	user.Email = input.Email
	user.Role = input.Role

	config.DB.Save(&user)

	c.JSON(http.StatusOK, dto.APIResponse{
		Success: true,
		Message: "user updated",
		Data: dto.UserResponse{
			ID:    user.ID,
			Name:  user.Name,
			Email: user.Email,
			Role:  user.Role,
		},
	})
}


func AdminDeleteUser(c *gin.Context) {
	var user models.User
	adminID := c.GetUint("user_id")

	if err := config.DB.First(&user, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, dto.APIResponse{
			Success: false,
			Message: "user not found",
		})
		return
	}


	if user.ID == adminID {
		c.JSON(http.StatusBadRequest, dto.APIResponse{
			Success: false,
			Message: "cannot delete your own account",
		})
		return
	}

	config.DB.Delete(&user)

	c.JSON(http.StatusOK, dto.APIResponse{
		Success: true,
		Message: "user deleted",
	})
}
