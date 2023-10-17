package chart

import (
	"mini-bank/infra/database"
	"mini-bank/utils"

	"time"
)

func generateHourlyIntervals(date time.Time) []time.Time {
	var intervals []time.Time
	startTime := utils.StartOfDay(date)
	for i := 0; i <= 24; i++ {
		hourInterval := startTime.Add(time.Hour * time.Duration(i))
		intervals = append(intervals, hourInterval)
	}
	return intervals
}

func GetRainfallIntraday(date string, riverID uint) (map[string]float64, error) {
	parsedDate, err := time.Parse("2006-01-02", date)
	if err != nil {
		return nil, err
	}

	startTime := utils.StartOfDay(parsedDate)
	endTime := utils.EndOfDay(parsedDate)

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

	hourlyIntervals := generateHourlyIntervals(parsedDate)
	hourlyData := AggregateSum(hourlyIntervals, rainfall)

	return hourlyData, nil
}
