export const getReportedUsers = (token)=> {

    return fetch(`http://localhost:8080/getReportedUsers`,{
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

    return fetch(`http://localhost:8080/getUserReports`,{
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

    return fetch(`http://localhost:8080/user/disable/${userid}`,{
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

    return fetch(`http://localhost:8080/user/enable/${userid}`,{
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

    return fetch(`http://localhost:8080/getReportedPosts`,{
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

    return fetch(`http://localhost:8080/postSearch?search=${search} `,{
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

    return fetch(`http://localhost:8080/postSearchall?search=${search} `,{
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

    return fetch(`http://localhost:8080/userSearch?search=${search} `,{
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

    return fetch(`http://localhost:8080/userSearchall?search=${search} `,{
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

    return fetch(`http://localhost:8080/getUserPostReports`,{
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

    return fetch(`http://localhost:8080/getPendingUsers`,{
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

    return fetch(`http://localhost:8080/post/disable/${postid}`,{
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

    return fetch(`http://localhost:8080/post/enable/${postid}`,{
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
    return fetch(`${process.env.REACT_APP_API_URL}/warn-user/`, {
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

    return fetch(`http://localhost:8080/getTotalUsers`,{
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

    return fetch(`http://localhost:8080/getTotalPosts`,{
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

    return fetch(`http://localhost:8080/getActiveTotalPosts`,{
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

    return fetch(`http://localhost:8080/getDeactivedTotalPosts`,{
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

    return fetch(`http://localhost:8080/getNewMembers/`,{
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
    return fetch(`http://localhost:8080/getallposts/`,{
        method: "GET"
    })
        .then(res => {
            return res.json();
        }).catch(err=> console.log(err));

};

export const deactivatedPosts = ()=> {
    return fetch(`http://localhost:8080/getDeactivatedposts/`,{
        method: "GET"
    })
        .then(res => {
            return res.json();
        }).catch(err=> console.log(err));

};

export const getnewUsers = ()=> {
    return fetch(`http://localhost:8080/getnewUsers/`,{
        method: "GET"
    })
        .then(res => {
            return res.json();
        }).catch(err=> console.log(err));

};

export const getPending = ()=> {
    return fetch(`http://localhost:8080/pendingDealers/`,{
        method: "GET"
    })
        .then(res => {
            return res.json();
        }).catch(err=> console.log(err));

};

export const verifyDealer = (userid, token)=>{

    return fetch(`http://localhost:8080/dealer/verify/${userid}`,{
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
