package utils

import "reflect"

func ReflectValueToString(refl reflect.Value, field string) string {
	target := refl.FieldByName(field)

	if target.IsValid() && target.Type().String() == "string" {
		return target.String()
	}

	return ""
}

func ReflectValueToInt64(refl reflect.Value, field string) int64 {
	target := refl.FieldByName(field)

	if target.IsValid() && target.Type().String() == "int64" {
		return target.Int()
	}

	return 0
}

func ReflectValueToBool(refl reflect.Value, field string) bool {
	target := refl.FieldByName(field)

	if target.IsValid() && target.Type().String() == "bool" {
		return target.Bool()
	}

	return false
}
