import axios, { AxiosResponse } from "axios";
import { Budget } from "../models/budget";

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    })
}

axios.defaults.baseURL = 'http://localhost:5000/api';

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

axios.interceptors.response.use(async response => {
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
        
    }
})

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => {
        console.log(`PUT request to ${url} with body:`, body);  // Debug log
        return axios.put<T>(url, body).then(responseBody);
    },
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const Budgets = {
    list: () => requests.get<Budget[]>(`/budget`),
    details: (id: string) => requests.get<Budget>(`/budget/${id}`),
    create: (budget: Budget) => requests.post<void>(`/budget`, budget),
    update: (budget: Budget) => requests.put<void>(`/budget/${budget.id}`, budget),
    delete: (id: string) => requests.del<void>(`/budget/${id}`)
}

const agent = {
    Budgets
}

export default agent;