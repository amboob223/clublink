
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

const clubbersButton = document.getElementById("clubbers");
const clubbersTable = document.getElementById("info");

clubbersButton.addEventListener("click", async (event) => {
    try {
        event.preventDefault();

        const data = await fetch("http://localhost:5000/user");
        if (!data.ok) {
            throw new Error("Failed to fetch data");
        }

        const json = await data.json();
        const tableHeader = clubbersTable.querySelector("thead"); // Select the <thead> element


        // Clear the table before populating it with data
        clubbersTable.innerHTML = "";

        if (json.length > 0) {
            const thead = document.createElement("thead");
            thead.classList.add("yay")
            thead.style.display = 'table-header-group'
            const row = thead.insertRow();


            // const co = document.querySelector("ese")

            // co.addEventListener("click", () => {
            //     console.log("persians")
            // })
            // Create table header cells
            const headers = ["Name", "Phone", "Email"];
            headers.forEach(headerText => {
                const header = document.createElement("th");
                header.textContent = headerText;
                row.appendChild(header);
            });

            clubbersTable.appendChild(thead);
            clubbersTable.classList.add("table");

            // Create table rows with user data
            json.forEach(user => {
                const userRow = clubbersTable.insertRow();
                userRow.classList.add("leg")
                console.log(userRow)

                // userRow.addEventListener("click", () => {
                //     window.location.href = "/Users/playabook/Desktop/oct/clublink/client/pages/confim/confirm.html"


                // })
                userRow.insertCell(0).textContent = user.name;
                userRow.insertCell(1).textContent = user.phone;
                userRow.insertCell(2).textContent = user.email;
                console.log(user)
            });

            // Show the header row when data is fetched
            tableHeader.style.display = 'table-row-group';
        } else {
            console.log("No data found");
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
});

