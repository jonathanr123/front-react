import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-type": "application/json",
    // "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjMzNjU4ODUwLCJqdGkiOiIwM2Q2OTY5NWJiOWY0NGQwYWY1MmE3MGU4NmI3MGZkMSIsInVzZXJfaWQiOiJqb25hIn0.3x5JuoNhYqxHFU4JziWRo1DyTjKuDoqhDaQpJ7NpTOM"
  },
});
