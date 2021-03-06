export const signup = (user) => {

    return fetch("https://carbazar-server.herokuapp.com/signup", {
        method : "POST",
        headers: {
            Accept : "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const signin = (user) => {
    return fetch("https://carbazar-server.herokuapp.com/signin", {
        method : "POST",
        headers: {
            Accept : "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const signout= (next) => {


    if(typeof window !== "undefined"){
        localStorage.removeItem("jwt");
        next();

        return fetch("https://carbazar-server.herokuapp.com/signout",{
            method: "GET"
        }).then ((response)=>{
            console.log("Signout" , response)
            return response.json();
        }).catch((err)=>{
            console.log(err);
        });
    }
};


export const authenticate =(jwt, next) =>{
    if(typeof window !== "undefined"){
        localStorage.setItem("jwt", JSON.stringify(jwt));
        next();
    }
};


export const isAuthenticated = () => {
    if(typeof window == "undefined"){
        return false;
    }
    if(localStorage.getItem("jwt")){
        return JSON.parse(localStorage.getItem("jwt"));
    }
    else{
        return false;
    }
};

export const senEmail = (email) => {
    return fetch(`https://carbazar-server.herokuapp.com/verification-email/`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email})

    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const forgotPassword = email => {
    console.log("email: ", email);
    return fetch(`https://carbazar-server.herokuapp.com/forgot-password/`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
    })
        .then(response => {
            console.log("forgot password response: ", response);
            return response.json();
        })
        .catch(err => console.log(err));
};



export const resetPassword = resetInfo => {
    return fetch(`https://carbazar-server.herokuapp.com/reset-password/`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(resetInfo)
    })
        .then(response => {
            console.log("forgot password response: ", response);
            return response.json();
        })
        .catch(err => console.log(err));
};

export const socialLogin = user => {
    return fetch(`https://carbazar-server.herokuapp.com/social-login/`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        // credentials: "include", // works only in the same origin
        body: JSON.stringify(user)
    })
        .then(response => {
            console.log("signin response: ", response);
            return response.json();
        })
        .catch(err => console.log(err));
};

export const verifyLink = (verifyAccountLink) => {
    return fetch(`https://carbazar-server.herokuapp.com/verifyLink/`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ verifyAccountLink })

    })

        .then(response => {
            console.log("response: ", response);
            return response.json();
        })
        .catch(err => console.log(err));
};



export const update = () => {
    if(typeof window == "undefined"){
        return false;
    }
    if(localStorage.getItem("jwt")){
        const local =  JSON.parse(localStorage.getItem("jwt"));
        console.log(local);
        local.user.verified = true;
        localStorage.setItem("jwt", JSON.stringify(local));
        return true;
    }
    else{
        return false;
    }
};