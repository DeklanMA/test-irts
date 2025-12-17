package dto
import "irts-ecommerce/models"
type AdminCreateUserInput struct {
	Name     string `json:"name" binding:"required,min=3"`
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required,min=6"`
	Role     string `json:"role" binding:"required,oneof=admin customer"`
}

type AdminUpdateUserInput struct {
	Name  string `json:"name" binding:"required,min=3"`
	Email string `json:"email" binding:"required,email"`
	Role  string `json:"role" binding:"required,oneof=admin customer"`
}

type UserResponse struct {
	ID    uint   `json:"id"`
	Name  string `json:"name"`
	Email string `json:"email"`
	Role  string `json:"role"`
}
type UpdateProfileInput struct {
	Name     string `json:"name" binding:"required,min=3"`
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password"`
}

func ToUserResponse(user models.User) UserResponse {
	return UserResponse{
		ID:    user.ID,
		Name:  user.Name,
		Email: user.Email,
		Role:  user.Role,
	}
}

func ToUserResponseList(users []models.User) []UserResponse {
	result := make([]UserResponse, 0, len(users))
	for _, u := range users {
		result = append(result, ToUserResponse(u))
	}
	return result
}