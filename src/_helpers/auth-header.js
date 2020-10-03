export function authHeader() {
    try{
        let user = JSON.parse(localStorage.getItem('user'));
        if (user && user.token) {
            return { 'Authorization': 'Token ' + user.token };
        }else{
            return {}
        }
    }catch(e){
        return {};
    }
}