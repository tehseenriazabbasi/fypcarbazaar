export const sendMail = (name, email, subject, message) => {
    console.log("email: ", email);
    return fetch(`${process.env.REACT_APP_API_URL}/contact-us/`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name ,email, subject, message})
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};