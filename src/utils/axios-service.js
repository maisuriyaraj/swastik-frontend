import axios from 'axios';


export const BASE_URL = "https://103f-2402-a00-162-82d3-11d4-eb04-df81-1b38.ngrok-free.app"
export function getRequest(url, payload={},headers={}) {
    return new Promise((resolve, reject) => {
        axios.get(BASE_URL +url ,payload,{headers:headers}).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err)
        })
    })
}

export function postRequest(url, payload={},headers={}) {
    return new Promise((resolve, reject) => {
        axios.post(BASE_URL + url, payload,{headers:headers}).then((res) => {
            resolve(res);
        }).catch(err => {
            reject(err)
        })
    })
}

export function putRequest(url, payload={},headers={}) {
    return new Promise((resolve, reject) => {
        axios.put(BASE_URL + url, payload,{headers:headers}).then((res) => {
            resolve(res);
        }).catch(err => {
            reject(err)
        })
    })
}
export function deleteRequest(url, payload) {
    return new Promise((resolve, reject) => {
        axios.delete(BASE_URL + url, payload).then((res) => {
            resolve(res);
        }).catch(err => {
            reject(err)
        })
    })
}