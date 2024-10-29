import axios from "axios";

const API_URL = "http://localhost:8001/api/companies/1/students";
const BEARER_TOKEN =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwMDEvYXBpL2xvZ2luIiwiaWF0IjoxNzI5ODA1MjExLCJleHAiOjE3MzA2NjkyMTEsIm5iZiI6MTcyOTgwNTIxMSwianRpIjoiV2RKSHNuUEZxN2VuVVRLcCIsInN1YiI6IjEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.iEtVH-vKWD9My25fce8j-8BLnpZnQVGDdhR_iKGejQY";

export const fetchStudents = async () => {
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${BEARER_TOKEN}`,
    },
  });

  if (response.status !== 200) {
    throw new Error("Failed to fetch students");
  }

  return response.data;
};
