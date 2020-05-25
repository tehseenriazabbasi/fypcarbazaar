export const searchReviews = (make, model, version)=>{

    return fetch(`http://localhost:8080/searchCar?make=${make}&model=${model}&version=${version}`,{
        method: "GET",
        headers: {
            Accept: "application/json",
        }

    })
        .then(res => {
            return res.json();
        }).catch(err=> console.log(err));


};

export const createReview = (review)=>{
        console.log(review);
    return fetch(`http://localhost:8080/createReview`,{
        method: "POST",
        headers: {
            Accept : "application/json",
            "Content-Type": "application/json"
        },
         body: JSON.stringify(review)

    })
        .then(res => {
            return res.json();
        }).catch(err=> console.log(err));


};

export const like = (review)=>{
    console.log(review);
    return fetch(`http://localhost:8080/likecar`,{
        method: "PUT",
        headers: {
            Accept : "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(review)

    })
        .then(res => {
            return res.json();
        }).catch(err=> console.log(err));


};

export const dislike = (review)=>{
    console.log(review);
    return fetch(`http://localhost:8080/dislikecar`,{
        method: "PUT",
        headers: {
            Accept : "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(review)

    })
        .then(res => {
            return res.json();
        }).catch(err=> console.log(err));


};

