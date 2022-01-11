package db

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/go-sql-driver/mysql"
)

func ConnectDB() (*sql.DB, error) {
	db, err := sql.Open("mysql", "root:@tcp(localhost:3306)/article")
	if err != nil {
		log.Println(err.Error())
		panic(err)
	}

	err = db.Ping()
	if err != nil {
		log.Println(err.Error())
		panic(err)
	}

	fmt.Println("Connect success!")
	return db, nil
}
