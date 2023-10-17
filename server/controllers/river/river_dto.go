package river

import "mini-bank/utils"

type RiverFilterDTO struct {
	utils.Pagination
	Name string `json:"name" form:"name"`
	Type string `json:"type" form:"type"`
}
