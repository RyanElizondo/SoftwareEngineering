export const sendContactForm = async (data) => 
fetch("https://expressocafeweb.netlify.app/api/contact",{
        method: "POST",
        body: JSON.stringify(data),
        headers:{
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
})
.catch((err)=> {
    console.log(err.message);
})