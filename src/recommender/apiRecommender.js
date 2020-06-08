export const bestmodel = ()=>{

    return fetch(`https://carbazar-server.herokuapp.com/recommendCar`,{
        method: "GET",
        headers: {
            Accept: "application/json",
        }

    })
        .then(res => {
            return res.json();
        }).catch(err=> console.log(err));


};

export const bestbrand = ()=>{

    return fetch(`https://carbazar-server.herokuapp.com/recommendCarBrand`,{
        method: "GET",
        headers: {
            Accept: "application/json",
        }

    })
        .then(res => {
            return res.json();
        }).catch(err=> console.log(err));


};


export const bestMileage = ()=>{

    return fetch(`https://carbazar-server.herokuapp.com/recommendCarMileage`,{
        method: "GET",
        headers: {
            Accept: "application/json",
        }

    })
        .then(res => {
            return res.json();
        }).catch(err=> console.log(err));


};

export const bestPrice = (min, max)=>{
    console.log(min)
    return fetch(`https://carbazar-server.herokuapp.com/recommendCarPrice`,{
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type" : "application/json",
        },
        body: JSON.stringify({min, max })

    })
        .then(res => {
            return res.json();
        }).catch(err=> console.log(err));


};