import axios from 'axios';


export const BASE_URL = "https://a19c-2402-a00-162-82d3-69af-c112-c9c-e410.ngrok-free.app"
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