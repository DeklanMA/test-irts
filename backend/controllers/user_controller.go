package controllers

import (
	"errors"
	"net/http"

	"irts-ecommerce/config"
	"irts-ecommerce/dto"
	"irts-ecommerce/models"
	"irts-ecommerce/utils"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

func Me(c *gin.Context) {
	userID := c.GetUint("user_id")
	if userID == 0 {
		c.JSON(http.StatusUnauthorized, dto.APIResponse{
			Success: false,
			Message: "unauthorized",
		})
		return
	}

	var user models.User
	if err := config.DB.First(&user, userID).Error; err != nil {
		c.JSON(http.StatusNotFound, dto.APIResponse{
			Success: false,
			Message: "user not found",
		})
		return
	}

	response := dto.UserResponse{
		ID:    user.ID,
		Name:  user.Name,
		Email: user.Email,
		Role:  user.Role,
	}

	c.JSON(http.StatusOK, dto.APIResponse{
		Success: true,
		Message: "user fetched successfully",
		Data:    response,
	})
}

func UpdateProfile(c *gin.Context) {
	userID := c.GetUint("user_id")
	if userID == 0 {
		c.JSON(http.StatusUnauthorized, dto.APIResponse{
			Success: false,
			Message: "unauthorized",
		})
		return
	}

	var input dto.UpdateProfileInput
	if err := c.ShouldBindJSON(&input); err != nil {

		var ve validator.ValidationErrors
		if errors.As(err, &ve) {
			firstErr := ve[0]

			var msg string
			switch firstErr.Field() {
			case "Name":
				if firstErr.Tag() == "required" {
					msg = "name is required"
				} else if firstErr.Tag() == "min" {
					msg = "name must be at least 3 characters"
				}
			case "Email":
				if firstErr.Tag() == "email" {
					msg = "email is not valid"
				}
			case "Password":
				if firstErr.Tag() == "min" {
					msg = "password must be at least 6 characters"
				}
			default:
				msg = "invalid request"
			}

			c.JSON(http.StatusBadRequest, dto.APIResponse{
				Success: false,
				Message: msg,
			})
			return
		}

		c.JSON(http.StatusBadRequest, dto.APIResponse{
			Success: false,
			Message: "invalid request payload",
		})
		return
	}

	var user models.User
	if err := config.DB.First(&user, userID).Error; err != nil {
		c.JSON(http.StatusNotFound, dto.APIResponse{
			Success: false,
			Message: "user not found",
		})
		return
	}

	user.Name = input.Name
	user.Email = input.Email

	if input.Password != "" {
		user.Password = utils.HashPassword(input.Password)
	}

	if err := config.DB.Save(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, dto.APIResponse{
			Success: false,
			Message: "failed to update profile",
		})
		return
	}

	c.JSON(http.StatusOK, dto.APIResponse{
		Success: true,
		Message: "profile updated successfully",
		Data: dto.UserResponse{
			ID:    user.ID,
			Name:  user.Name,
			Email: user.Email,
			Role:  user.Role,
		},
	})
}
