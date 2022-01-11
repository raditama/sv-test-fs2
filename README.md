TES-SV-FS
---------

* Versi Golang = go1.16.6
* Database = MySQL
* File SQL db = article.sql
* Database name = article
* Database username = root
* Database password =
* Postman collection = article.postman_collection.json

Run Application
---------------

Client:
``` bash
# install node module
$ npm install

# running program
$ npm start
```

Microservices:
``` bash
# running program
$ go run main.go
```

HOW TO USE
----------
Import db di mysql

Import postman collection

Running program

Daftar API sesuai soal:
1. Create Article
2. Read Paging Article
3. Read by Id Article
4. Update by Id Article
5. Delete by Id Article

Tambahan API (untuk kebutuhan FE)
1. Pagination by Status Article
* Menampilkan article di database berdasarkan status yang di request dan terdapat paging pada parameter limit & offset
2. Get Count by Status Article
* Menampilkan jumlah article di database berdasarkan status yang di request

Tampilan Client dibuka melalui link berikut:
* All Posts <http://localhost:3000/#/posts/allposts>
* Add New <http://localhost:3000/#/posts/addnew>
* Preview <http://localhost:3000/#/posts/preview>
