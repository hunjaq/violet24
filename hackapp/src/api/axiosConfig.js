import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:8080', //ngrok is needed to not be blocked?
    headers: {"ngrok-skip-browser-warning": "true", "Access-Control-Allow-Origin":"http://localhost:3000"} 
})