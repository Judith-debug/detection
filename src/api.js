import Login from "@/views/Login.vue";
import axios from "axios";

const apiClient=axios.create({
    baseURL: 'http://localhost:3000/api/auth',
    withCredentials:false,
    headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
});
export default{
register(credentials){
    return apiClient.post('/register', credentials);
},


login(credentials){
    return apiClient.post('/register', credentials);
}
}