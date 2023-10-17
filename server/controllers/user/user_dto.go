package user

import "mini-bank/utils"

type UserFilerDTO struct {
	utils.Pagination
	Name  string `gorm:"name" form:"name"`
	Email string `gorm:"email" form:"email"`
}

type AttachRoleToUser struct {
	Role []string `json:"roles" binding:"required"`
}
