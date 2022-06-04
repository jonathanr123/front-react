import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-type": "application/json",
    "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQ0ODc0MTUwLCJqdGkiOiIwYzM1M2ZmNTA4NzA0NGYyYWQzMjgzNTkxYzRhZWI3NSIsInVzZXJfaWQiOiJqb25hIn0.IFf-JA76A5DIYQu3CN5rRXqeeZmGG7D1Sl7I6CIUJh8"
  }
});