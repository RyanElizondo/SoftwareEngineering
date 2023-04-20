exports.sendContactForm = async (data) => fetch('./contact',{
        method: "POST",
        body: JSON.stringify(data),
        headers:{
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
})