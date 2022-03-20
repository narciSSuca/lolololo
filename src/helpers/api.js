export const api = async (url, method = null, body, headers) => {

    
    try {
        let response ="";

        if(method === 'GET') {
            response = await fetch(url, {method,headers})
        } else {
            response = await fetch(url, {method,body,headers})
        
        }
        const data = await response.json()
        return data;
    } catch (e) {
        return {status:e.status, message: e.message}
    }
}