package chart

import (
	"time"
)

type ChartDate struct {
	RiverID   int       `json:"river_id"`
	RiverName string    `json:"river_name"`
	Data      float64   `json:"data"`
	Date      time.Time `json:"date"`
}

func AggregateSum(interval []time.Time, data []ChartDate) map[string]float64 {
	date := make(map[string]float64)

	for i := 0; i < len(interval)-1; i++ {
		start := interval[i]
		end := interval[i+1]

		var sum float64
		var count int
		for _, entry := range data {
			if entry.Date.After(start) && entry.Date.Before(end) {
				sum += entry.Data
				count++
			}
		}

		if count > 0 {
			average := sum / float64(count)
			date[start.Format("2006-01-02T15:04:05-0700")] = average
		} else {
			date[start.Format("2006-01-02T15:04:05-0700")] = 0
		}
	}

	return date
}
