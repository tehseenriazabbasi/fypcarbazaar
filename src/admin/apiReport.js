export const getReportedUsers = (token)=> {

    return fetch(`https://carbazar-server.herokuapp.com/getReportedUsers`,{
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

export const getUserReports = (token)=> {

    return fetch(`https://carbazar-server.herokuapp.com/getUserReports`,{
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


export const disableUser = (userid, token)=>{

    return fetch(`https://carbazar-server.herokuapp.com/user/disable/${userid}`,{
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }

    })
        .then(res => {
            return res.json();
        }).catch(err=> console.log(err));


};

export const enableUser = (userid, token)=>{

    return fetch(`https://carbazar-server.herokuapp.com/user/enable/${userid}`,{
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }

    })
        .then(res => {
            return res.json();
        }).catch(err=> console.log(err));


};

export const getReportedPosts = (token)=> {

    return fetch(`https://carbazar-server.herokuapp.com/getReportedPosts`,{
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

export const getReportedPostsSearch = (token, search)=> {

    return fetch(`https://carbazar-server.herokuapp.com/postSearch?search=${search} `,{
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

export const PostsSearch = (token, search)=> {

    return fetch(`https://carbazar-server.herokuapp.com/postSearchall?search=${search} `,{
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

export const getReportedUserSearch = (token, search)=> {

    return fetch(`https://carbazar-server.herokuapp.com/userSearch?search=${search} `,{
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


export const UserSearch = (token, search)=> {

    return fetch(`https://carbazar-server.herokuapp.com/userSearchall?search=${search} `,{
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

export const getUserPostReports = (token)=> {

    return fetch(`https://carbazar-server.herokuapp.com/getUserPostReports`,{
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

export const getPendingRequests = (token)=> {

    return fetch(`https://carbazar-server.herokuapp.com/getPendingUsers`,{
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

export const disablePost = (postid, token)=>{

    return fetch(`https://carbazar-server.herokuapp.com/post/disable/${postid}`,{
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }

    })
        .then(res => {
            return res.json();
        }).catch(err=> console.log(err));


};


export const enablePost = (postid, token)=>{

    return fetch(`https://carbazar-server.herokuapp.com/post/enable/${postid}`,{
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }

    })
        .then(res => {
            return res.json();
        }).catch(err=> console.log(err));


};

export const warnUser = (email, postname) => {
    console.log("email: ", email);
    return fetch(`https://carbazar-server.herokuapp.com/warn-user/`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email ,postname})
    })
        .then(response => {
            console.log("User warned");
            return response.json();
        })
        .catch(err => console.log(err));
};

export const totalUsers = (token)=> {

    return fetch(`https://carbazar-server.herokuapp.com/getTotalUsers`,{
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

export const totalPosts = (token)=> {

    return fetch(`https://carbazar-server.herokuapp.com/getTotalPosts`,{
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

export const activePosts = (token)=> {

    return fetch(`https://carbazar-server.herokuapp.com/getActiveTotalPosts`,{
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

export const deactivePosts = (token)=> {

    return fetch(`https://carbazar-server.herokuapp.com/getDeactivedTotalPosts`,{
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

export const newMembers = (token)=> {

    return fetch(`https://carbazar-server.herokuapp.com/getNewMembers/`,{
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
    return fetch(`https://carbazar-server.herokuapp.com/getallposts/`,{
        method: "GET"
    })
        .then(res => {
            return res.json();
        }).catch(err=> console.log(err));

};

export const deactivatedPosts = ()=> {
    return fetch(`https://carbazar-server.herokuapp.com/getDeactivatedposts/`,{
        method: "GET"
    })
        .then(res => {
            return res.json();
        }).catch(err=> console.log(err));

};

export const getnewUsers = ()=> {
    return fetch(`https://carbazar-server.herokuapp.com/getnewUsers/`,{
        method: "GET"
    })
        .then(res => {
            return res.json();
        }).catch(err=> console.log(err));

};

export const getPending = ()=> {
    return fetch(`https://carbazar-server.herokuapp.com/pendingDealers/`,{
        method: "GET"
    })
        .then(res => {
            return res.json();
        }).catch(err=> console.log(err));

};

export const verifyDealer = (userid, token)=>{

    return fetch(`https://carbazar-server.herokuapp.com/dealer/verify/${userid}`,{
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }

    })
        .then(res => {
            return res.json();
        }).catch(err=> console.log(err));


};

export const getolx = (days)=> {
    return fetch(`https://carbazar.herokuapp.com?days=ss${days}`,{
        method: "GET"
    })
        .then(res => {
            return res.json();
        }).catch(err=> console.log(err));

};

export const getpkw = (days)=> {
    return fetch(`https://carbazar.herokuapp.com?days=${days}`,{
        method: "GET"
    })
        .then(res => {
            return res.json();
        }).catch(err=> console.log(err));

};

export const getpkm = (days)=> {
    return fetch(`https://carbazar.herokuapp.com?days=${days}`,{
        method: "GET"
    })
        .then(res => {
            return res.json();
        }).catch(err=> console.log(err));

};