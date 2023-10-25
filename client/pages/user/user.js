
const namee = document.getElementById("namee");
const phone = document.getElementById("phone");
const email = document.getElementById("phone");
const ubtn = document.getElementById("ubtn");

ubtn.addEventListener("click", async (event) => {
    try {

        event.preventDefault()
        // const body = new FormData(); because we are uplpading only text data not text and file data in whoch case we use the fdorm data objkect 
        const body = {
            namee: namee.value,
            phone: phone.value,
            email: email.value
        };


        const response = await fetch("http://localhost:5000/user", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(body)
        })
        console.log("hhh")
    } catch (error) {
        console.log(error)
    }
})