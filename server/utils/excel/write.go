package excel

import (
	"fmt"

	excelize "github.com/xuri/excelize/v2"
)

var header = []string{"A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"}

func CreateFile() (*excelize.File, error) {
	f := excelize.NewFile()
	index, err := f.NewSheet("Sheet1")

	if err != nil {
		println(err.Error())
		return nil, err
	}

	f.SetActiveSheet(index)

	return f, nil
}

func SetRow(file *excelize.File, data []string, row int, sheet string) {
	if sheet == "" {
		sheet = "Sheet1"
	}

	for i, v := range data {
		file.SetCellValue(sheet, header[i]+fmt.Sprintf("%d", row), v)
	}
}
