package repositories

import (
	"fmt"
	"microservice/db"
	"microservice/models"
	"time"
)

type Response struct {
	Code    int
	Message string
}

type CountData struct {
	Count int
}

// Create Post
func CreatePost(U *models.Posts) *Response {
	result := &Response{500, "Internal Server Error"}

	db, err := db.ConnectDB()
	if err != nil {
		fmt.Println(err.Error())
		return result
	}
	defer db.Close()

	if len(U.Title) >= 20 && len(U.Content) >= 200 && len(U.Category) >= 3 && (U.Status == "publish" || U.Status == "draft" || U.Status == "thrash") {
		_, err = db.Exec(`INSERT INTO posts (title, content, category, created_date, status) VALUES (?, ?, ?, ?, ?)`, U.Title, U.Content, U.Category, time.Now(), U.Status)
		fmt.Println(time.Now())

		if err != nil {
			fmt.Println(err.Error())
			result = &Response{400, err.Error()}
			return result
		}
		fmt.Println("insert success!")
		result = &Response{200, "Success save Data"}
	} else {
		fmt.Println("invalid input!")
		result = &Response{400, "Invalid input! Title minimal 20 karakter, Content minimal 200 karakter, Category minimal 3 karakter, Status harus memilih antara 'publish', 'draft', 'thrash'"}
	}

	return result
}

// Read Post With Paging
func ReadPostWithPaging(limit int, offset int) []models.PostDTO {
	var result []models.PostDTO

	db, _ := db.ConnectDB()
	defer db.Close()

	items, err := db.Query("SELECT id, title, content, category, status FROM posts LIMIT ? OFFSET ?", limit, offset)

	if err != nil {
		fmt.Println(err.Error())
		return nil
	}
	fmt.Printf("%T\n", items)

	for items.Next() {
		var each = models.PostDTO{}
		var err = items.Scan(&each.Id, &each.Title, &each.Content, &each.Category, &each.Status)

		if err != nil {
			fmt.Println(err.Error())
			return nil
		}

		result = append(result, each)
	}

	if err = items.Err(); err != nil {
		fmt.Println(err.Error())
		return nil
	}

	return result
}

// Read Post by Id
func ReadPostById(id int) []models.PostDTO {
	var result []models.PostDTO
	db, _ := db.ConnectDB()
	defer db.Close()

	items, _ := db.Query("SELECT id, title, content, category, status FROM posts WHERE id = ?", id)

	fmt.Printf("%T\n", items)

	for items.Next() {
		var each = models.PostDTO{}
		var err = items.Scan(&each.Id, &each.Title, &each.Content, &each.Category, &each.Status)

		if err != nil {
			fmt.Println(err.Error())
			return nil
		}

		result = append(result, each)
	}

	return result
}

// Update Post by Id
func UpdatePostById(U *models.Posts, id int) *Response {
	result := &Response{500, "Internal Server Error"}
	db, err := db.ConnectDB()
	if err != nil {
		fmt.Println(err.Error())
		return result
	}
	defer db.Close()

	if len(U.Title) >= 20 && len(U.Content) >= 200 && len(U.Category) >= 3 && (U.Status == "publish" || U.Status == "draft" || U.Status == "thrash") {

		_, err = db.Exec("UPDATE posts SET title = ?, content = ?, category = ?, status = ?, updated_date = ? where Id = ?", U.Title, U.Content, U.Category, U.Status, time.Now(), id)
		if err != nil {
			fmt.Println(err.Error())
			result = &Response{400, err.Error()}
			return result
		}

		fmt.Println("Update success!")
		result = &Response{200, "Success save Data"}

	} else {
		fmt.Println("invalid input!")
		result = &Response{400, "Invalid input! Title min 20 karakter, Content min 200 karakter, Category min 3 karakter, Status only 'publish', 'draft', 'thrash'"}
	}

	return result
}

// Delete Post by Id
func DeletePostById(id int) *Response {
	result := &Response{500, "Internal Server Error"}
	db, err := db.ConnectDB()

	if err != nil {
		fmt.Println(err.Error())
		return result
	}
	defer db.Close()

	_, err = db.Exec("DELETE FROM posts WHERE Id = ?", id)

	if err != nil {
		fmt.Println(err.Error())
		result = &Response{400, err.Error()}
		return result
	}

	fmt.Println("Delete success!")
	result = &Response{200, "Success save Data"}
	return result
}

// Read Post By Status
func ReadPostByStatus(status string, limit int, offset int) []models.PostDTO {
	var result []models.PostDTO
	db, _ := db.ConnectDB()

	defer db.Close()
	items, _ := db.Query("SELECT id, title, content, category, status FROM posts WHERE status = ? LIMIT ? OFFSET ?", status, limit, offset)
	fmt.Printf("%T\n", items)

	for items.Next() {
		var each = models.PostDTO{}
		var err = items.Scan(&each.Id, &each.Title, &each.Content, &each.Category, &each.Status)

		if err != nil {
			fmt.Println(err.Error())
			return nil
		}

		result = append(result, each)
	}
	return result
}

// Get Count By Status
func GetCountByStatus(status string) []CountData {
	var result []CountData
	db, _ := db.ConnectDB()

	defer db.Close()
	items, _ := db.Query("SELECT COUNT(id) FROM posts WHERE status = ?", status)
	fmt.Printf("%T\n", items)

	for items.Next() {
		var each = CountData{}
		var err = items.Scan(&each.Count)

		if err != nil {
			fmt.Println(err.Error())
			return nil
		}

		result = append(result, each)
	}
	return result
}
