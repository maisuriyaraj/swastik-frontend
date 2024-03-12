import axios from 'axios';


export const BASE_URL = "https://f222-2402-a00-172-d2cf-4401-fc82-157a-d93e.ngrok-free.app"
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