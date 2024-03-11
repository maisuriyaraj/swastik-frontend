export const isLoggedIn = (loggedIn) =>{
    
    if(sessionStorage.getItem("AdminAuth") === null || sessionStorage.getItem("token") === undefined){
        return false;
    }else{
        return true;
    }

}

export const isCustomerLoggedIn = () =>{ 

    if(sessionStorage.getItem("userToken") === null || sessionStorage.getItem("AdminAuth") === undefined){
        return false;
    }else{
        return true;
    }
}

export const isStaffLoggedIn = () =>{
    if(sessionStorage.getItem("staffAuth") === null || sessionStorage.getItem("staffAuth") === undefined){
        return false;
    }else{
        return true;
    }
}

export const LogOut = (key) =>{
    if(key){
        sessionStorage.clear();
        window.location.reload();
    }
}

export function generateRandomString() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 5; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }