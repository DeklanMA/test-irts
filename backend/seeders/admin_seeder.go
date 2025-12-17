package seeders

import (
	"log"

	"irts-ecommerce/config"
	"irts-ecommerce/models"
	"irts-ecommerce/utils"
)

func SeedAdminUser() {
	var count int64

	config.DB.
		Model(&models.User{}).
		Where("role = ?", "admin").
		Count(&count)

	if count > 0 {
		log.Println("Seeder skipped: admin user already exists")
		return
	}

	admin := models.User{
		Name:     "admin",
		Email:    "admin@admin.com",
		Password: utils.HashPassword("admin123"), 
		Role:     "admin",
	}

	if err := config.DB.Create(&admin).Error; err != nil {
		log.Println("Failed to seed admin user:", err)
		return
	}

	log.Println("Seeder finished: admin user created")
	log.Println("➡️ Email: admin@admin.com")
	log.Println("➡️ Password: admin123")
}
