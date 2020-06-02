export const list = ()=> {
    return fetch(`https://carbazar-server.herokuapp.com/posts`,{
        method: "GET"
    })
        .then(res => {
            return res.json();
        }).catch(err=> console.log(err));

};

export const list_buyerPosts = ()=> {
    return fetch(`https://carbazar-server.herokuapp.com/b_posts`,{
        method: "GET"
    })
        .then(res => {
            return res.json();
        }).catch(err=> console.log(err));

};

export const listolx = ()=> {
    return fetch(`https://carbazar-scrapper.herokuapp.com/olx`,{
        method: "GET"
    })
        .then(res => {
            return res.json();
        }).catch(err=> console.log(err));

};


export const listolxhome = ()=> {
    return fetch(`https://carbazar-scrapper.herokuapp.com/olxhome`,{
        method: "GET"
    })
        .then(res => {
            return res.json();
        }).catch(err=> console.log(err));

};


export const listPKWhome = ()=> {

    return fetch(`https://carbazar-scrapper.herokuapp.com/pakWheelsHome`,{
        method: "GET"
    })
        .then(res => {
            return res.json();
        }).catch(err=> console.log(err));

};


export const listPKMhome = ()=> {
    return fetch(`https://carbazar-scrapper.herokuapp.com/pkMotorsHome`,{
        method: "GET"
    })
        .then(res => {
            return res.json();
        }).catch(err=> console.log(err));

};

export const searchOlx = (search)=> {
    return fetch(`https://carbazar-scrapper.herokuapp.com/search?query=${search}`,{
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type" : 'application/json'
        }
    })
        .then(res => {
            return res.json();
        }).catch(err=> console.log(err));

};

export const searchPKW = (search)=> {
    console.log(search);

    return fetch(`https://carbazar-scrapper.herokuapp.com/pakWheelsSearch?query=${search}`,{
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type" : 'application/json'
        }
    })
        .then(res => {
            return res.json();
        }).catch(err=> console.log(err));

};


export const searchPKM = (search)=> {
    console.log(search);

    return fetch(`https://carbazar-scrapper.herokuapp.com/pkMotorsSearch?query=${search}`,{
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type" : 'application/json'
        }
    })
        .then(res => {
            return res.json();
        }).catch(err=> console.log(err));

};

export const searchCarBazar = (name)=> {

    return fetch(`https://carbazar-server.herokuapp.com/searchCarBazaar?q=${encodeURIComponent(name)}`,{
        method: "Get",
        headers: {
            Accept: "application/json",
            "Content-Type" : "application/json"
        }
    })
        .then(res => {
            return res.json();
        }).catch(err=> console.log(err));


};


export const searchOlxFilters = (make, model , kmd , et, min, max, regC, yearfrom, yearto, color, trans , cond)=> {
    console.log("yaerfrom: ", yearfrom);
    console.log("yaerto: ", yearto);

    return fetch(`http://localhost:5000/olxFilters?make=${make}&KMDriven=${kmd}&engineType=${et}&price=${min}-${max}&regCity=${regC}&year=${yearfrom}-${yearto}&color=${color}&transmission=${trans}&condition=${cond}`,{
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type" : 'application/json'
        }
    })
        .then(res => {
            return res.json();
        }).catch(err=> console.log(err));

};

export const searchPKWFilters = (make, model , kmd , et, min, max, regC, yearfrom, yearto, location, color, trans , cond)=> {
    console.log("yaerfrom: ", yearfrom);
    console.log("yaerto: ", yearto);

    return fetch(`http://localhost:5000/pakWheelsFilters?make=${make}&KMDriven=${kmd}&engineType=${et}&price=${min}-${max}&regCity=${regC}&year=${yearfrom}-${yearto}&model=${model}&location=${location}&color=${color}&transmission=${trans}&condition=${cond}`,{
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type" : 'application/json'
        }
    })
        .then(res => {
            return res.json();
        }).catch(err=> console.log(err));

};



export const searchPKMFilters = (make, model , kmd , et, min, max, regC, yearfrom, yearto, location, color, trans , cond)=> {
    console.log("yaerfrom: ", yearfrom);
    console.log("yaerto: ", yearto);

    return fetch(`http://localhost:5000/pkMotorsFilters?make=${make}&KMDriven=${kmd}&engineType=${et}&price=${min}-${max}&regCity=${regC}&year=${yearfrom}-${yearto}&model=${model}&location=${location}&color=${color}&transmission=${trans}&condition=${cond}`,{
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type" : 'application/json'
        }
    })
        .then(res => {
            return res.json();
        }).catch(err=> console.log(err));

};


export const searchCbFilters = (make, model , kmd , et, min, max, regC, yearfrom, yearto, location, exterior_color, condition, trans, cc)=> {
    console.log("yaerfrom: ", yearfrom);
    console.log("yaerto: ", yearto);

    return fetch(`https://carbazar-server.herokuapp.com/CarBazaarFilters?make=${make}&KMDriven=${kmd}&engineType=${et}&min=${min}&max=${max}&regCity=${regC}&yearmin=${yearfrom}&yearmax=${yearto}&model=${model}&location=${location}&color=${exterior_color}&condition=${condition}&transmission=${trans}&engine_capacity=${cc}`,{
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type" : 'application/json'
        }
    })
        .then(res => {
            return res.json();
        }).catch(err=> console.log(err));

};



export const create = (userId, token, post)=>{
    // console.log("User data:" , ...post);
    // Display the key/value pairs

    console.log("User data:" );
    for (var pair of post.entries()) {
        console.log(pair[0]+ ', ' + pair[1]);
    }

    return fetch(`https://carbazar-server.herokuapp.com/post/new/${userId}`,{
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: post
    })
        .then(res => {
            return res.json();
        }).catch(err=> console.log(err));

};


export const createBuyer = (userId, token, post)=>{
    // console.log("User data:" , ...post);
    // Display the key/value pairs

    return fetch(`https://carbazar-server.herokuapp.com/post/newBuyer/${userId}`,{
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: post
    })
        .then(res => {
            return res.json();
        }).catch(err=> console.log(err));

};




export const singlePost = (postId)=> {
    return fetch(`https://carbazar-server.herokuapp.com/post/${postId}`,{
        method: "GET"
    })
        .then(res => {
            return res.json();
        }).catch(err=> console.log(err));

};

export const b_singlePost = (postId)=> {
    return fetch(`https://carbazar-server.herokuapp.com/b_post/${postId}`,{
        method: "GET"
    })
        .then(res => {
            return res.json();
        }).catch(err=> console.log(err));

};

export const listByUser = (userId, token)=> {
    return fetch(`https://carbazar-server.herokuapp.com/posts/by/${userId}`,{
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type" : 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(res => {
            return res.json();
        }).catch(err=> console.log(err));

};


export const listBuyerByUser = (userId, token)=> {
    return fetch(`https://carbazar-server.herokuapp.com/Buyerposts/by/${userId}`,{
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type" : 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(res => {
            return res.json();
        }).catch(err=> console.log(err));

};

export const listSavedByUser = (userId, token)=> {
    return fetch(`https://carbazar-server.herokuapp.com/postsSaved/by/${userId}`,{
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type" : 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(res => {
            return res.json();
        }).catch(err=> console.log(err));

};

export const listBuyerSavedByUser = (userId, token)=> {
    return fetch(`https://carbazar-server.herokuapp.com/postsSaved/by/${userId}`,{
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type" : 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(res => {
            return res.json();
        }).catch(err=> console.log(err));

};

export const remove = (postid, token)=> {
    return fetch(`https://carbazar-server.herokuapp.com/post/${postid}`,{
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

export const removebuyer = (postid, token)=> {
    console.log("from back", postid);
    return fetch(`https://carbazar-server.herokuapp.com/b_post/${postid}`,{
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

export const update = (postId, token, post)=>{

    return fetch(`https://carbazar-server.herokuapp.com/post/${postId}`,{


        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: post
    })
        .then(res => {
            return res.json();
        }).catch(err=> console.log(err));


};

export const updatebuyer = (postId, token, post)=>{

    return fetch(`https://carbazar-server.herokuapp.com/b_post/${postId}`,{


        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: post
    })
        .then(res => {
            return res.json();
        }).catch(err=> console.log(err));


};

export const like = (userId, token, postId)=>{
    return fetch(`https://carbazar-server.herokuapp.com/post/like`,{
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type" : "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({userId, postId})
    })
        .then(res => {
            return res.json();
        }).catch(err=> console.log(err));


};

export const unlike = (userId, token, postId)=>{
    return fetch(`https://carbazar-server.herokuapp.com/post/unlike`,{
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type" : "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({userId, postId})
    })
        .then(res => {
            return res.json();
        }).catch(err=> console.log(err));


};

export const getMake = ()=> {
    return fetch(`https://carbazar-server.herokuapp.com/make/`,{
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type" : 'application/json'
        }
    })
        .then(res => {
            return res.json();
        }).catch(err=> console.log(err));

};

export const getModel = (make)=> {
    return fetch(`https://carbazar-server.herokuapp.com/model?make=${make}`,{
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type" : 'application/json'
        }
    })
        .then(res => {
            return res.json();
        }).catch(err=> console.log(err));

};


export const getVariant = (model)=> {
    return fetch(`https://carbazar-server.herokuapp.com/variants?model=${model}`,{
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type" : 'application/json'
        }
    })
        .then(res => {
            return res.json();
        }).catch(err=> console.log(err));

};

export const save = (userId,  postId, token)=>{
    return fetch(`https://carbazar-server.herokuapp.com/savePost/${userId}`,{
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type" : "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({userId, postId})
    })
        .then(res => {
            return res.json();
        }).catch(err=> console.log(err));


};

export const saveBuyer = (userId,  postId, token)=>{
    return fetch(`https://carbazar-server.herokuapp.com/saveBuyerPost/${userId}`,{
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type" : "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({userId, postId})
    })
        .then(res => {
            return res.json();
        }).catch(err=> console.log(err));


};

export const unsave = (userId,  postId, token)=>{
    return fetch(`https://carbazar-server.herokuapp.com/unsavePost/${userId}`,{
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type" : "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({userId, postId})
    })
        .then(res => {
            return res.json();
        }).catch(err=> console.log(err));


};


export const unsaveBuyer = (userId,  postId, token)=>{
    return fetch(`https://carbazar-server.herokuapp.com/unsaveBuyerPost/${userId}`,{
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type" : "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({userId, postId})
    })
        .then(res => {
            return res.json();
        }).catch(err=> console.log(err));


};

export const reportPost = (user_id, post_id, username, text ,token )=>{
    return fetch("https://carbazar-server.herokuapp.com/reportPost",{
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type" : "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({user_id, post_id, username, text })
    })
        .then(res => {
            return res.json();
        }).catch(err=> console.log(err));
};



export const sendMail = (name, email, subject, message, posterEmail) => {

    return fetch(`https://carbazar-server.herokuapp.com/contactSeller/`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name ,email, subject, message, posterEmail})
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const findmatches = (post)=>{

    return fetch("https://carbazar-server.herokuapp.com/b_post/match",{
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({make: post.make, model:post.model })
    })
        .then(res => {
            return res.json();
        }).catch(err=> console.log(err));
};


export const publish = (token, postId) => {

    return fetch(`https://carbazar-server.herokuapp.com/publishPost/${postId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`

        },
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};