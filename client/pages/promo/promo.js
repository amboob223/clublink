document.addEventListener("DOMContentLoaded", function () {
    const namee = document.getElementById("namee");
    const sections = document.getElementById("sections");
    const phone = document.getElementById("phone");
    const email = document.getElementById("email");
    const club = document.getElementById("club");
    const cost = document.getElementById("cost");
    const pic = document.getElementById("pic");
    const date = document.getElementById("date");
    const description = document.getElementById("description");
    const pbtn = document.getElementById("pbtn");

    pbtn.addEventListener("click", async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append("namee", namee.value);
            formData.append("sections", sections.value);
            formData.append("date", date.value);
            formData.append("phone", phone.value);
            formData.append("email", email.value);
            formData.append("club", club.value);
            formData.append("cost", cost.value);
            formData.append("pic", pic.files[0]);
            formData.append("description", description.value);

            const response = await fetch("http://localhost:5000/promo", {
                method: "POST",
                body: formData
            });

            if (response.ok) {
                console.log("Request successful");
                // You can do something with the response here if needed.
            } else {
                console.log("Request failed with status: " + response.status);
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });
});
