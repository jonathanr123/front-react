import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-type": "application/json",
    "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjMzMzA4MjIxLCJqdGkiOiJjNzFlOWYwZTIxNjQ0NWNkOTdlNzdlZGYwMGU1NzU3ZCIsInVzZXJfaWQiOiJqb25hIn0.1ZBy5r8Q6x52uguUg8R6jmsD4SyFiCl0PrvPfm0zSwk"
  }
});