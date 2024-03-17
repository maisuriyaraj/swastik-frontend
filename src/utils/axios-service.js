import axios from 'axios';


export const BASE_URL = "https://9397-2402-a00-162-82d3-58dd-93be-1d5-fb7f.ngrok-free.app"
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