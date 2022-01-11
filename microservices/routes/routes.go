package routes

import (
	service "microservice/services"
	"net/http"

	"github.com/labstack/echo"
)

func Init() *echo.Echo {
	e := echo.New()

	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello, this is echo!")
	})

	grp := e.Group("/article")
	{
		grp.POST("/create", service.CreatePost)
		grp.GET("/paging", service.ReadPostWithPaging)
		grp.GET("/byId", service.ReadPostById)
		grp.PUT("/update", service.UpdatePostById)
		grp.DELETE("/delete", service.DeletePostById)

		grp.GET("/byStatus", service.ReadPostByStatus)
		grp.GET("/getCount", service.GetCountByStatus)
	}

	return e
}
