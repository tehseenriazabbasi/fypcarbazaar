export const bestmodel = ()=>{

    return fetch(`http://localhost:8080/recommendCar`,{
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

    return fetch(`http://localhost:8080/recommendCarBrand`,{
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

    return fetch(`http://localhost:8080/recommendCarMileage`,{
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
    return fetch(`http://localhost:8080/recommendCarPrice`,{
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