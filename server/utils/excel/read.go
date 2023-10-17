package excel

import (
	"fmt"
	"io"

	excelize "github.com/xuri/excelize/v2"
)

func ReadXLSX(file io.Reader) ([][]string, []string, error) {
	results := [][]string{}
	headers := []string{}

	// read file
	xlsx, err := excelize.OpenReader(file)
	if err != nil {
		fmt.Println(err)
		return nil, nil, err
	}

	// Get all the rows in the Sheet1.
	rows, err := xlsx.GetRows("Sheet1")
	if err != nil {
		fmt.Println(err)
		return nil, nil, err
	}

	for indexRow, row := range rows {
		if indexRow == 0 {
			for _, colCell := range row {
				headers = append(headers, colCell)
			}
		}
	}

	for indexRow, row := range rows {
		if indexRow != 0 {
			result := make([]string, len(headers))
			for indexCol, colCell := range row {
				result[indexCol] = colCell
			}
			results = append(results, result)
		}
	}

	return results, headers, nil
}
