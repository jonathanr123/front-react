import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-type": "application/json",
    "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjMxNjU4OTA3LCJqdGkiOiIyNjRhM2RkZGRhZjQ0YzRjOTI2NTQ2MDYwODNhZGI3ZCIsInVzZXJfaWQiOiJqb25hIn0.YGBLMc5eSlYkk1nuUkh896IU4AU8XVSbSShrgGrHtV8"
  }
});