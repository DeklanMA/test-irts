package dto


type ProductInput struct {
	ProductName     string `json:"product_name" binding:"required"`
	ProductPrice    int64  `json:"product_price" binding:"required"`
	Brand           string `json:"brand"`
	ProductImageURL string `json:"product_image_url"`
	ProductInfo     string `json:"product_info"`
	RealPDPURL      string `json:"real_pdp_url"`
}

type ProductResponse struct {
	ID              uint   `json:"id"`
	ProductName     string `json:"product_name"`
	ProductPrice    int64  `json:"product_price"`
	Brand           string `json:"brand"`
	ProductImageURL string `json:"product_image_url"`
	ProductInfo     string `json:"product_info"`
	RealPDPURL      string `json:"real_pdp_url"`
	CreatedAt       string `json:"created_at,omitempty"`
	UpdatedAt       string `json:"updated_at,omitempty"`
}
