document.addEventListener("DOMContentLoaded", function () {
    // Your existing code for the "ubtn" button and form submission can remain as it is.

    const namee = document.getElementById("namee");
    const phone = document.getElementById("phone");
    const email = document.getElementById("email");
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
            console.log("beans")
        } catch (error) {
            console.log(error)
        }
    })

    const getclubs = document.getElementById("getclubs");
    const spotsTable = document.getElementById("clubInfo").querySelector("thead"); // Select the <thead> element

    getclubs.addEventListener("click", async (event) => {
        try {
            event.preventDefault();
            const data = await fetch("http://localhost:5000/promo");
            if (!data.ok) {
                throw new Error("Failed to fetch data");
            }

            const json = await data.json();

            // Show the table header when data is fetched
            spotsTable.style.display = 'table-header-group';

            // Clear the table before populating it with data
            spotsTable.parentNode.querySelector("tbody").innerHTML = "";

            if (json.length > 0) {
                json.forEach((element, index) => {
                    const row = spotsTable.parentNode.querySelector("tbody").insertRow();
                    row.classList.add("git")



                    console.log(element.pic)
                    //this is the part thhat makes this a link 
                    row.addEventListener("click", () => {


                        const pageurl = `/Users/playabook/Desktop/oct/clublink/client/pages/confim/confirm.html?name=${encodeURIComponent(element.name)}&sections=${encodeURIComponent(element.sections)}&club=${encodeURIComponent(element.club)}&phone=${encodeURIComponent(element.phone)}&pic=${element.pic}`
                        window.location.href = pageurl



                    })


                    const cell2 = row.insertCell(0);
                    const cell3 = row.insertCell(1);
                    const cell4 = row.insertCell(2);
                    const cell5 = row.insertCell(3);
                    const cell6 = row.insertCell(4);
                    const cell7 = row.insertCell(5);


                    cell2.textContent = element.club;
                    cell3.textContent = element.description;
                    cell4.textContent = element.date;
                    cell5.textContent = element.cost;
                    cell6.textContent = element.sections
                    cell7.textContent = element.name

                });
            } else {
                console.log("No club data found");
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });
});

