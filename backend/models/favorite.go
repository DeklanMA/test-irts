package models

import "gorm.io/gorm"

type Favorite struct {
	gorm.Model
	UserID    uint    `gorm:"not null;index" json:"user_id"`
	ProductID uint    `gorm:"not null;index" json:"product_id"`
	Product Product `gorm:"foreignKey:ProductID" json:"product"`
}
