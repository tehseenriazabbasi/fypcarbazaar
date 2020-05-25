export const changeAdSetting = (userId)=>{
    return fetch("http://localhost:8080/userAdsNoSetting/",{
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type" : "application/json"

        },

        body: JSON.stringify({userId})
    })
        .then(res => {
            return res.json();
        }).catch(err=> console.log(err));

};