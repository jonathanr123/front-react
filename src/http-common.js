import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-type": "application/json",
    "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjI5OTYzNDk3LCJqdGkiOiJhNzZlYWU0ZDEyOWE0MmFiOGUwMjVlYjYzN2VlYWE2ZCIsInVzZXJfaWQiOiJqb25hIn0._J-ROFmyAZZWqxKcagCddBZBOKDjXrlFHo2C7cV53Bk"
  }
});