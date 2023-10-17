package chart

import (
	"mini-bank/infra/database"
	"mini-bank/utils"

	"time"
)

func generateMonthlyIntervals(date time.Time) []time.Time {
	var intervals []time.Time
	start := utils.StartOfYear(date)
	lastDay := utils.EndOfYear(date).AddDate(0, 1, 0)

	for start.Before(lastDay) {
		intervals = append(intervals, start)
		start = start.AddDate(0, 1, 0)
	}

	return intervals
}

func GetRainfallYearly(date string, riverID uint) (map[string]float64, error) {
	parsedDate, err := time.Parse("2006-01-02", date)
	if err != nil {
		return nil, err
	}

	startTime := utils.StartOfYear(parsedDate)
	endTime := utils.EndOfYear(parsedDate)

	var rainfall []ChartDate

	err = database.DB.Table("rainfall_observations").
		Select(`river_id, river_observations.name as river_name, data, date, TIME(date) as time`).
		Joins("JOIN river_observations ON river_observations.id = rainfall_observations.river_id").
		Where("date BETWEEN ? AND ?", startTime, endTime).
		Where("river_id = ?", riverID).
		Order("date ASC").
		Scan(&rainfall).
		Error

	if err != nil {
		return nil, err
	}

	hourlyIntervals := generateMonthlyIntervals(parsedDate)
	hourlyData := AggregateSum(hourlyIntervals, rainfall)

	return hourlyData, nil
}
