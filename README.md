# Project Setup 
1. Download the zip file from : https://github.com/sarthpatil8/BookReviewSystem.git

2. Unzip the folder 
3. Install all depedencies 
    ``` 
        npm install 
    ```
4. Create a .env file and add the required values (Check .env.example)
5. Start command 
    ``` 
    npm start / node server.js 
    ```

# Tech used
1. Tech used :
        Node JS 
        Express JS 
        Mongo DB 

# DB : 
    Connection string = mongodb://127.0.0.1:27017/bookreview

# Authentication: 
1. POST /signup – register a new user
2. POST /login – authenticate and return a token


        curl --location 'http://127.0.0.1:5000/auth/login' \
        --header 'Content-Type: application/json' \
        --data '{
            "username" : "",
            "password" : "" 
        }'

# Core Features:
1. POST /books – Add a new book (Authenticated users only)
         Generate token using login 

            curl --location 'http://127.0.0.1:5000/books' \
            --header 'Content-Type: application/json' \
            --header 'Authorization: Bearer <token>' \
            --data '{
            "title": "<title u want to add> ",
            "author" : "<Author u want to add>",
            "genre" :  "<Genre u want to add>"
            }'

2. GET /books – Get all books (with pagination and optional filters by author and genre)
        
                curl --location 'http://127.0.0.1:5000/books<>'
                ?author= <>&
                ?title=<>&
                ?page=<>&
                limit=<>


3.  GET /books/:id – Get book details by ID, including:
                                Average rating
                                Reviews (with pagination)

                curl --location 'http://127.0.0.1:5000/books/<book id>' \

4.  POST /books/:id/reviews – Submit a review (Authenticated users only, one review per user per book)

                curl --location 'http://127.0.0.1:5000/review/<book id>/reviews' \
                --header 'Content-Type: application/json' \
                --header 'Authorization: Bearer <token>' \
                --data '{
                "review": <>,
                "rating": <>
                } '

5. PUT /reviews/:id – Update your own review

                curl --location --request PUT 'http://127.0.0.1:5000/review/<review id >' \
                --header 'Content-Type: application/json' \
                --header 'Authorization: Bearer <token>' \
                --data '{
                "review": "TEst book!",
                "rating": 3
                }
                '   
6. DELETE /reviews/:id – Delete your own review

                    curl --location --request DELETE 'http://127.0.0.1:5000/review/<review id>' \
                        --header 'Content-Type: application/json' \
                        --header 'Authorization: <token>' 
                        

# Additional Feature:

7.    GET /search – Search books by title or author (partial and case-insensitive)

                curl --location 'http://127.0.0.1:5000/books/search?query=<search word>' 
       