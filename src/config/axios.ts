import axios from 'axios'

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-cg-demo-api-key': import.meta.env.VITE_API_KEY,
  },
})

export default http
