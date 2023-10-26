

const email = document.getElementById("email");
const password = document.getElementById("password");
const auth = document.getElementById("abtn");
const login = document.getElementById("lbtn");

auth.addEventListener("click", async (event) => {
    try {
        event.preventDefault()

        const body = {
            email: email.value,
            password: password.value,

        }
        const response = await fetch("http://localhost:5000/signup", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(body)
        });

        //parse data 
        const data = await response.json()
        document.getElementById("message").innerText = `okay you are user number ${data.id}`
    } catch (error) {
        console.log(error)
    }
})

//login
login.addEventListener("click", async (event) => {
    try {
        event.preventDefault();

        const uemail = document.getElementById("uemail");
        const upassword = document.getElementById("upassword");

        const body = {
            email: uemail.value,
            password: upassword.value
        }

        const response = await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(body)
        });

        if (response.status === 200) {
            window.location.href = "index.html";
        } else {
            document.getElementById("message").innerText = "Try again";
        }
    } catch (error) {
        console.log(error);
    }
});

const loginForm = document.getElementById("lform");
const signupForm = document.getElementById("sform");

const switchFormLink = document.getElementById("switchFormButton");

switchFormLink.addEventListener("click", (event) => {
    event.preventDefault();
    if (loginForm.style.display === "block") {
        loginForm.style.display = "none";
        signupForm.style.display = "block";
    } else {
        loginForm.style.display = "block";
        signupForm.style.display = "none";
    }
});
