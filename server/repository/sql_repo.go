package repository

import (
	"errors"
	"mini-bank/helpers"
	"mini-bank/infra/database"
	"mini-bank/infra/logger"
	"mini-bank/utils"
	"reflect"

	"gorm.io/gorm"
)

func Create(model interface{}) error {
	err := database.DB.Create(model).Error

	if err != nil {
		logger.Errorf("error, not save data %v", err)
		return err
	}

	return nil
}

func Get(model interface{}, filter interface{}) error {

	query := database.DB.Order("created_at DESC")

	if filter != nil {
		query = query.Where(filter)
	}

	return query.Find(model).Error
}

func GetWithPreload(model interface{}, preload string) error {
	err := database.DB.Order("created_at DESC").Preload(preload).Find(model).Error
	return err
}

func GetWithFilter(model interface{}, filter interface{}, pagination utils.Pagination) (int64, error) {
	var count int64

	query := database.DB

	if filter != nil {
		query = query.Where(filter)
	}

	query.Model(model).Count(&count)

	return count, query.Scopes(helpers.WithPagination(pagination)).Order("created_at DESC").Find(model).Error
}

func GetWithSearchFilter(model interface{}, filter interface{}, pagination *utils.Pagination, preload *[]string) (int64, error) {
	var count int64

	query := database.DB

	if filter != nil {
		value := reflect.ValueOf(filter).Elem()

		clauses := map[string]string{
			"name":  utils.ReflectValueToString(value, "Name"),
			"email": utils.ReflectValueToString(value, "Email"),
			"type":  utils.ReflectValueToString(value, "Type"),
		}

		for key, value := range clauses {
			query = query.Scopes(helpers.Search(key, value))
		}
	}

	query.Model(model).Count(&count)

	if pagination != nil {
		query = query.Scopes(helpers.WithPagination(*pagination))
	}

	if preload != nil {
		for _, value := range *preload {
			query = query.Preload(value)
		}
	}

	return count, query.Order("created_at DESC").Find(model).Error
}

func GetWithFilterWithPreload(model interface{}, filter interface{}, pagination utils.Pagination, preload string) error {
	err := database.DB.Scopes(helpers.WithPagination(pagination)).Preload(preload)

	if filter != nil {
		err = err.Where(filter)
	}

	return err.Order("created_at DESC").Find(model).Error
}

func GetLast(model interface{}) error {
	err := database.DB.Last(model).Error
	return err
}

func GetByID(model interface{}, id string) error {
	err := database.DB.Where("id = ?", id).First(model).Error

	if errors.Is(err, gorm.ErrRecordNotFound) {
		return gorm.ErrRecordNotFound
	}

	return err
}

func GetByIDWithPreload(model interface{}, id string, preload string) error {
	err := database.DB.Where("id = ?", id).Preload(preload).First(model).Error

	if errors.Is(err, gorm.ErrRecordNotFound) {
		return gorm.ErrRecordNotFound
	}

	return err
}

func Find(model interface{}) error {
	err := database.DB.Find(model).Error
	return err
}

func Update(model interface{}) error {
	err := database.DB.Save(model).Error
	return err
}

func Delete(model interface{}) error {
	err := database.DB.Delete(model).Error
	return err
}
