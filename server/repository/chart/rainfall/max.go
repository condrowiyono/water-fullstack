package chart

import (
	"mini-bank/infra/database"
	"mini-bank/utils"

	"time"
)

func generateMaxIntervals(first time.Time) []time.Time {
	var intervals []time.Time
	start := utils.StartOfMonth(first)
	lastDay := utils.EndOfMonth(time.Now()).AddDate(0, 0, 1)

	for start.Before(lastDay) {
		intervals = append(intervals, start)
		start = start.AddDate(0, 0, 1)
	}

	return intervals
}

func GetRainfallMax(date string, riverID uint) (map[string]float64, error) {
	parsedDate, err := time.Parse("2006-01-02", date)
	if err != nil {
		return nil, err
	}

	endTime := utils.EndOfMonth(parsedDate)

	var rainfall []ChartDate

	err = database.DB.Table("rainfall_observations").
		Select(`river_id, river_observations.name as river_name, data, date, TIME(date) as time`).
		Joins("JOIN river_observations ON river_observations.id = rainfall_observations.river_id").
		Where("date <= ?", endTime).
		Where("river_id = ?", riverID).
		Order("date ASC").
		Scan(&rainfall).
		Error

	if err != nil {
		return nil, err
	}

	if len(rainfall) == 0 {
		return nil, nil
	}

	hourlyIntervals := generateMaxIntervals(rainfall[0].Date)
	hourlyData := AggregateSum(hourlyIntervals, rainfall)

	return hourlyData, nil
}
