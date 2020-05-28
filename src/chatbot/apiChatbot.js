export const sendMessage = (message, sessionid)=>{
    console.log("message:", message);
    return fetch(`https://carbazar-server.herokuapp.com/ask/83c5ce1b-e823-4fd0-820b-070278b955bb?make=${message}&sessionid=${sessionid}`,{
        method: "GET",
        headers: {
            Accept: "application/json",

        }
    })
        .then(res => {
            return res.json();
        }).catch(err=> console.log(err));

};

export const storeSession =(jwt, next) =>{
    if(typeof window !== "undefined"){
        window.sessionStorage.setItem("IMB", JSON.stringify(jwt));
        next();
    }
};

export const getSession = () => {
    if(typeof window == "undefined"){
        return false;
    }
    if(window.sessionStorage.getItem("IMB")){
        return JSON.parse(window.sessionStorage.getItem("IMB"));
    }
    else{
        return false;
    }
};


export const createSession = ()=>{

    return fetch(`https://carbazar-server.herokuapp.com/sessionId`,{
        method: "GET",
        headers: {
            Accept: "application/json",

        }
    })
        .then(res => {
            return res.json();
        }).catch(err=> console.log(err));

};
