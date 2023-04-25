export const sendContactForm = async (data) => 
fetch("http://localhost:3000/api/contact",{
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