package chart

import (
	"mini-bank/infra/database"
	"mini-bank/utils"

	"time"
)

func generateDailyIntervals(date time.Time) []time.Time {
	var intervals []time.Time
	start := utils.StartOfMonth(date)
	lastDay := utils.EndOfMonth(date).AddDate(0, 0, 1)

	for start.Before(lastDay) {
		intervals = append(intervals, start)
		start = start.AddDate(0, 0, 1)
	}

	return intervals
}

func GetRainfallMonthly(date string, riverID uint) (map[string]float64, error) {
	parsedDate, err := time.Parse("2006-01-02", date)
	if err != nil {
		return nil, err
	}

	startTime := utils.StartOfMonth(parsedDate)
	endTime := utils.EndOfMonth(parsedDate)

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

	hourlyIntervals := generateDailyIntervals(parsedDate)
	hourlyData := AggregateSum(hourlyIntervals, rainfall)

	return hourlyData, nil
}
