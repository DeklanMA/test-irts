package seeders

import (
	"encoding/csv"
	"log"
	"os"
	"strconv"

	"irts-ecommerce/config"
	"irts-ecommerce/models"
)

func SeedProductsFromCSV() {
	var count int64
	config.DB.Model(&models.Product{}).Count(&count)
	if count > 0 {
		log.Println("Seeder skipped: products already exist")
		return
	}

	file, err := os.Open("data/ibox-product.csv")
	if err != nil {
		panic(err)
	}
	defer file.Close()

	reader := csv.NewReader(file)
	records, _ := reader.ReadAll()

	for i, row := range records {
		if i == 0 {
			continue 
		}

		price, _ := strconv.ParseInt(row[2], 10, 64)

		product := models.Product{
			ProductName:     row[1],
			ProductPrice:    price,
			Brand:           row[3],
			ProductImageURL: row[4],
			ProductInfo:     row[5],
			RealPDPURL:      row[6],
		}

		config.DB.Create(&product)
	}

	log.Println("Seeder finished: products inserted")
}
