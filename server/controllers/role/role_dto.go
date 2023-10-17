package role

type AddPermissionsToRole struct {
	Permission []string `json:"permissions" binding:"required"`
}
