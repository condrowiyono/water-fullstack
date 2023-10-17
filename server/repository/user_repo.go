package repository

import (
	"errors"
	"mini-bank/helpers"
	"mini-bank/infra/database"
	"mini-bank/models"
	"mini-bank/utils"
	"reflect"

	"gorm.io/gorm"
)

func GetAllUser(model interface{}, filter interface{}, pagination utils.Pagination) (int64, error) {
	var count int64
	query := database.DB.Model(model).Omit("password")

	if filter != nil {
		value := reflect.ValueOf(filter).Elem()
		clauses := map[string]string{
			"email": utils.ReflectValueToString(value, "Email"),
			"name":  utils.ReflectValueToString(value, "Name"),
		}

		for key, value := range clauses {
			query = query.Scopes(helpers.Search(key, value))
		}

		starDate := utils.ReflectValueToInt64(value, "StartDate")
		endDate := utils.ReflectValueToInt64(value, "EndDate")

		query = query.Scopes(helpers.RangeDate("created_at", starDate, endDate))
	}

	query.Model(model).Count(&count)

	query = query.Scopes(helpers.WithPagination(pagination)).Order("created_at DESC").Find(model)

	return count, query.Error
}

func GetUserByEmail(model interface{}, email string) error {
	err := database.DB.
		Where("email = ?", email).
		Preload("Roles").
		Preload("River").
		First(model).Error

	if errors.Is(err, gorm.ErrRecordNotFound) {
		return gorm.ErrRecordNotFound
	}

	return err
}

func AttachRoleToUser(userID string, roles []string) error {
	var user models.User
	err := database.DB.Where("id = ?", userID).First(&user).Error

	if errors.Is(err, gorm.ErrRecordNotFound) {
		return gorm.ErrRecordNotFound
	}

	var role []models.Role
	rolesIDs := database.DB.Where("id IN ?", roles).Find(&role)

	if rolesIDs.RowsAffected == 0 {
		return gorm.ErrRecordNotFound
	}

	err = database.DB.Model(&user).Association("Roles").Replace(role)

	if err != nil {
		return err
	}

	return nil
}

func GetUsersPermission(model interface{}, userID uint) error {
	err := database.DB.
		Where("id = ?", userID).
		Preload("Roles.Permissions").
		First(model).Error

	if errors.Is(err, gorm.ErrRecordNotFound) {
		return gorm.ErrRecordNotFound
	}

	return err
}
