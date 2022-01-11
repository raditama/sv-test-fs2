package main

import (
	"microservice/routes"

	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

func main() {
	e := routes.Init()

	// Middleware
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	// CORS
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{echo.GET, echo.HEAD, echo.PUT, echo.PATCH, echo.POST, echo.DELETE},
	}))

	e.Logger.Fatal(e.Start(":8000"))
}
