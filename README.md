📝 RESTful Blog Application API

A complete backend project built using Node.js, Express, MongoDB, and JWT Authentication, supporting full CRUD operations for posts and comments.


Installation & Setup
1. Clone the Repo
git clone <https://github.com/sumitsingh1011/BlogAPI.git>
cd BLOG-API

2. Install Dependencies
npm install

3. Create .env
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key

4. Start Server
npm start
Server runs on:
👉 http://localhost:5000

📌 Project Overview
This project is a RESTful Blog API that allows users to:

Register & Login (JWT Authentication)
Create, Read, Update, Delete blog posts
Create, Read, Update, Delete comments
Manage authentication & authorization
Use proper validation, error handling, and HTTP responses

This backend can be used by any frontend team (React, Angular, Vue).

🚀 Features
✅ User Authentication

Register new users
Login to generate JWT token
Token-based protected routes

✅ Blog Post Management

Create Post
Get All Posts
Get Single Post
Update Post
Delete Post

✅ Comment Management

Create Comment
Get Comments by Post
Update Comment
Delete Comment

✅ Security

- Passwords are hashed using bcrypt
- JWT used for authentication
- Protected routes using middleware
- Environment variables used for secrets
- Input validation to prevent invalid data
- Pagination to avoid heavy DB load


blog-api/
 ├── README.md
 ├── .env
 ├── package.json
 ├── package-lock.json
 ├── node_modules/
 ├── src/
 │     ├── app.js
 │     ├── models/
 │     │      ├── userModel.js
 │     │      ├── postModel.js
 │     │      └── commentModel.js
 │     ├── controllers/
 │     │      ├── userController.js
 │     │      ├── postController.js
 │     │      └── commentController.js
 │     ├── routes/
 │     │      ├── userRoutes.js
 │     │      ├── postRoutes.js
 │     │      └── commentRoutes.js
 │     ├── middleware/
 │     │      └── auth.js
 │     └── config/
 │            └── db.js



🧠 API Documentation
🔐 AUTH ROUTES
1. Register
POST /api/auth/register


Body

{
  "username": "sumit",
  "email": "sumit@example.com",
  "password": "123456"
}

2. Login
POST /api/auth/login


Response

{
  "token": "XYZ123..."
}

✍️ POST ROUTES
Create Post
POST /api/posts
Header: Authorization: Bearer <token>

Get All Posts
GET /api/posts

Get One Post
GET /api/posts/:id

Update Post
PUT /api/posts/:id
Header: Authorization: Bearer <token>

Delete Post
DELETE /api/posts/:id
Header: Authorization: Bearer <token>

💬 COMMENT ROUTES
Create Comment
POST /api/comments
Header: Authorization: Bearer <token>

Get Comments of a Post
GET /api/comments/:postId

Update Comment
PUT /api/comments/:id
Header: Authorization: Bearer <token>

Delete Comment
DELETE /api/comments/:id
Header: Authorization: Bearer <token>

📘 User Guide
🟦 Step 1 – Register

Use the /register endpoint to create a user.

🟦 Step 2 – Login

Login to receive the JWT token.

🟦 Step 3 – Use Token

Every protected route must include:

Authorization: Bearer <your-token>

🟦 Step 4 – Start Creating Posts & Comments

Use Postman or any frontend to interact.

🧪 Testing

Unit tests for controllers

Integration tests for routes

Manual testing using Postman

📄 ER Diagram
Users (1) ----- (∞) Posts (1) ----- (∞) Comments


A user can create many posts
A post can have many comments
A comment belongs to 1 user & 1 post

📚 Tech Stack

Node.js
Express.js
MongoDB + Mongoose
JWT
bcrypt
Nodemon  

