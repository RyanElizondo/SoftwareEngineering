exports.sendContactForm = async (data) => fetch('functions/contact.js',{
        method: "POST",
        body: JSON.stringify(data),
        headers:{
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
})