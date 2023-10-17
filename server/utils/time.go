package utils

import "time"

var DEFAULT_TIME_ZONE = "Asia/Singapore"

func StartOfDay(t time.Time) time.Time {
	location, _ := time.LoadLocation(DEFAULT_TIME_ZONE)
	year, month, day := t.In(location).Date()

	dayStartTime := time.Date(year, month, day, 0, 0, 0, 0, location)

	return dayStartTime
}

func EndOfDay(t time.Time) time.Time {
	location, _ := time.LoadLocation(DEFAULT_TIME_ZONE)
	year, month, day := t.In(location).Date()

	dayEndTime := time.Date(year, month, day, 23, 59, 59, 0, location)

	return dayEndTime
}

func StartOfMonth(t time.Time) time.Time {
	location, _ := time.LoadLocation(DEFAULT_TIME_ZONE)
	year, month, _ := t.In(location).Date()

	monthStartTime := time.Date(year, month, 1, 0, 0, 0, 0, location)

	return monthStartTime
}

func EndOfMonth(t time.Time) time.Time {
	location, _ := time.LoadLocation(DEFAULT_TIME_ZONE)
	year, month, _ := t.In(location).Date()

	monthEndTime := time.Date(year, month+1, 1, 0, 0, 0, 0, location)

	return monthEndTime.Add(-time.Nanosecond)
}

func StartOfYear(t time.Time) time.Time {
	location, _ := time.LoadLocation(DEFAULT_TIME_ZONE)
	year, _, _ := t.In(location).Date()

	yearStartTime := time.Date(year, 1, 1, 0, 0, 0, 0, location)

	return yearStartTime
}

func EndOfYear(t time.Time) time.Time {
	location, _ := time.LoadLocation(DEFAULT_TIME_ZONE)
	year, _, _ := t.In(location).Date()

	yearEndTime := time.Date(year+1, 1, 1, 0, 0, 0, 0, location)

	return yearEndTime.Add(-time.Nanosecond)
}
