package models

import "gorm.io/gorm"

type Product struct {
	gorm.Model
	ProductName     string `json:"product_name"`
	ProductPrice    int64  `json:"product_price"`
	Brand           string `json:"brand"`
	ProductImageURL string `json:"product_image_url"`
	ProductInfo     string `json:"product_info"`
	RealPDPURL      string `json:"real_pdp_url"`
}
