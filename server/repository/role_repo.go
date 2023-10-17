package repository

import (
	"errors"
	"mini-bank/infra/database"
	"mini-bank/infra/logger"
	"mini-bank/models"

	"gorm.io/gorm"
)

func AddPermissionsToRole(roleID string, permissions []string) error {
	var role models.Role
	err := database.DB.Where("id = ?", roleID).First(&role).Error

	if errors.Is(err, gorm.ErrRecordNotFound) {
		return gorm.ErrRecordNotFound
	}

	var permission []models.Permission
	permissionsIDs := database.DB.Where("name IN ?", permissions).Find(&permission)

	if permissionsIDs.RowsAffected == 0 {
		return gorm.ErrRecordNotFound
	}

	err = database.DB.Model(&role).Association("Permissions").Replace(permission)

	if err != nil {
		logger.Errorf("error, not save data %v", err)
		return err
	}

	return nil
}
