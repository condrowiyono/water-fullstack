package upload

import (
	"fmt"
	"mini-bank/utils"
	"path/filepath"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/gosimple/slug"
)

func UploadImage(ctx *gin.Context) {
	filename := ctx.PostForm("filename")
	file, err := ctx.FormFile("file")

	if err != nil {
		utils.ResponseBadRequest(ctx, err)
		return
	}

	timestamp := time.Now().Format("20060102150405") // Format: YYYYMMDDHHmmss
	extension := filepath.Ext(file.Filename)
	slug := slug.Make(filename)
	dst := fmt.Sprintf("public/%s_%s%s", timestamp, slug, extension)
	ctx.SaveUploadedFile(file, dst)

	utils.ResponseSuccess(ctx, gin.H{"filename": dst})
}
