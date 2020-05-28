export const read = (userid, token)=> {
    console.log("user id: ", userid);
    return fetch(`https://carbazar-server.herokuapp.com/user/${userid}`,{
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type" : "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(res => {
            return res.json();
        }).catch(err=> console.log(err));


};

export const list = ()=> {
    return fetch(`https://carbazar-server.herokuapp.com/users`,{
        method: "GET"
    })
        .then(res => {
            return res.json();
        }).catch(err=> console.log(err));

};

export const remove = (userid, token)=> {
    return fetch(`https://carbazar-server.herokuapp.com/user/${userid}`,{
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type" : "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(res => {
            return res.json();
        }).catch(err=> console.log(err));


};

export const searchUser = (name, token)=> {
    console.log("searh from method ", name);
    return fetch(`https://carbazar-server.herokuapp.com/finduser?q=${encodeURIComponent(name)}`,{
        method: "Get",
        headers: {
            Accept: "application/json",
            "Content-Type" : "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(res => {
            return res.json();
        }).catch(err=> console.log(err));


};

export const update = (userid, token, user)=>{
    console.log("User data:" , user);
    return fetch(`https://carbazar-server.herokuapp.com/user/${userid}`,{
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: user
    })
        .then(res => {
            return res.json();
        }).catch(err=> console.log(err));


};

export const updateAuthUser = (user, next) =>{
    if(typeof window !== "undefined"){
        if(localStorage.getItem("jwt")){
            let auth = JSON.parse(localStorage.getItem("jwt"));
            auth.user = user;
            localStorage.setItem("jwt", JSON.stringify(auth));
            next();
        }
    }

};

export const follow = (userid, token, followId)=>{
    return fetch("https://carbazar-server.herokuapp.com/user/follow",{
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type" : "application/json",
            Authorization: `Bearer ${token}`
        },

        body: JSON.stringify({userid, followId})
    })
        .then(res => {
            return res.json();
        }).catch(err=> console.log(err));

};

export const Unfollow = (userid, token, UnfollowId)=>{
    return fetch("https://carbazar-server.herokuapp.com/user/unfollow",{
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type" : "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({userid, UnfollowId})
    })
        .then(res => {
            return res.json();
        }).catch(err=> console.log(err));
};


export const reportUser = (user_id, Reported_user_id, username, text ,token )=>{
    return fetch("https://carbazar-server.herokuapp.com/report",{
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type" : "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({user_id, Reported_user_id, username, text })
    })
        .then(res => {
            return res.json();
        }).catch(err=> console.log(err));
};


export const findpeople = (userid, token)=>{
    console.log("userid " + userid);
    console.log("userid " + token);
    return fetch(`https://carbazar-server.herokuapp.com/user/findpeople/${userid}`,{
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type" : "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(res => {
            return res.json();
        }).catch(err=> console.log(err));
};


