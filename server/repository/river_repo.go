package repository

import (
	"mini-bank/infra/database"
	"mini-bank/utils"
	"time"
)

type GetAllTodayDTO struct {
	ID   uint    `json:"id"`
	Name string  `json:"name"`
	Data float64 `json:"data"`
}

func ExportObservationByYear(model interface{}, id, year string) error {
	query := database.DB.Model(model).Where("river_id = ?", id).Where("date LIKE ?", year+"%").Preload("User").Find(model)

	return query.Error
}

func GetToday(model interface{}, id string) error {
	startTime := utils.StartOfDay(time.Now())
	endTime := utils.EndOfDay(time.Now())

	query := database.DB.Model(model).Where("river_id = ?", id).Where("date BETWEEN ? AND ?", startTime, endTime).Preload("User").First(model)

	return query.Error
}

func FindToday(model interface{}, id string) error {
	startTime := utils.StartOfDay(time.Now())
	endTime := utils.EndOfDay(time.Now())

	query := database.DB.Model(model).Where("river_id = ?", id).Where("date BETWEEN ? AND ?", startTime, endTime).Preload("User").Find(model)

	return query.Error
}

func GetAllRainfallByDate(time time.Time) ([]GetAllTodayDTO, error) {
	var allToday []GetAllTodayDTO
	startTime := utils.StartOfDay(time)
	endTime := utils.EndOfDay(time)

	rows, err := database.DB.
		Raw(`
		SELECT
			river_observations.id,
			river_observations.name,
			COALESCE((SELECT AVG(data) FROM rainfall_observations WHERE river_id = river_observations.id AND date BETWEEN ? AND ?), 0) as data
		FROM
    	river_observations
		WHERE
    	river_observations.type = 'pch'
		`,
			startTime,
			endTime,
		).Rows()

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	for rows.Next() {
		var today GetAllTodayDTO
		err = rows.Scan(&today.ID, &today.Name, &today.Data)
		if err != nil {
			return nil, err
		}
		allToday = append(allToday, today)
	}

	return allToday, nil
}

func GetAllWaterLevelByDate(time time.Time) ([]GetAllTodayDTO, error) {
	var allToday []GetAllTodayDTO
	startTime := utils.StartOfDay(time)
	endTime := utils.EndOfDay(time)

	rows, err := database.DB.
		Raw(`
		SELECT
			river_observations.id,
			river_observations.name,
			COALESCE((SELECT AVG(data) FROM water_level_observations WHERE river_id = river_observations.id AND date BETWEEN ? AND ?), 0) as data
		FROM
    	river_observations
		WHERE
    	river_observations.type = 'tma'
		`,
			startTime,
			endTime,
		).Rows()

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	for rows.Next() {
		var today GetAllTodayDTO
		err = rows.Scan(&today.ID, &today.Name, &today.Data)
		if err != nil {
			return nil, err
		}
		allToday = append(allToday, today)
	}

	return allToday, nil
}

func GetAllClimateByDate(time time.Time) ([]GetAllTodayDTO, error) {
	var allToday []GetAllTodayDTO
	startTime := utils.StartOfDay(time)
	endTime := utils.EndOfDay(time)

	rows, err := database.DB.
		Raw(`
		SELECT
			river_observations.id,
			river_observations.name,
			COALESCE((SELECT AVG(rainfall) FROM climate_observations WHERE river_id = river_observations.id AND date BETWEEN ? AND ?), 0) as data
		FROM
    	river_observations
		WHERE
    	river_observations.type = 'iklim'
		`,
			startTime,
			endTime,
		).Rows()

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	for rows.Next() {
		var today GetAllTodayDTO
		err = rows.Scan(&today.ID, &today.Name, &today.Data)
		if err != nil {
			return nil, err
		}
		allToday = append(allToday, today)
	}

	return allToday, nil
}
