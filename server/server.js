const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const multer = require("multer");
const path = require("path");
const bcrypt = require("bcrypt");

//middleware
app.use(express.json());
app.use(cors());
app.set("view engine", "ejs")
app.use(express.static('server/images'))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images/")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)) // original file bame is the file name on the xonmputer

    }
});

const upload = multer({
    storage: storage
}); // this is a multer instance where we use the multer object and thestorage property

//signup
app.post("/signup", async (req, res) => {
    try {
        const { email, password } = req.body;
        const saltRounds = 10;
        const hashedword = await bcrypt.hash(password, saltRounds); // Corrected typo: brcrypt -> bcrypt
        const data = await pool.query(
            "INSERT INTO pass(email, password) VALUES($1, $2) RETURNING *",
            [email, hashedword]
        );
        res.json(data.rows[0]);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message }); // Send an error response with the error message
    }
});


app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body
        const data = await pool.query(
            "SELECT password FROM pass WHERE email = $1",
            [email])

        if (data.rows.length === 1) {
            const hashedPassword = data.rows[0].password;
            const passwordMatch = await bcrypt.compare(password, hashedPassword)

            if (passwordMatch) {
                res.status(200).json({ message: "login succesful" })
            } else {
                res.status(401).json({ error: "invalid" })
            }

        }
    } catch (error) {
        console.log(error)
        res.status(500)
    }
})
app.post("/promo", upload.single("pic"), async (req, res) => {
    try {
        const { namee, sections, club, phone, date, cost, description } = req.body;

        if (req.file) { // Check if a file has been uploaded
            const pic = req.file.filename;

            const data = await pool.query(
                "INSERT INTO promo(name,sections,club,phone,date,cost,pic,description) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *",
                [namee, sections, club, phone, date, cost, pic, description]
            );

            res.json(data.rows[0]);
            console.log("better")
        } else {
            // Handle the case where no file was uploaded
            res.status(400).json({ error: "No file uploaded" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong" });
    }
});


app.get("/promo", async (req, res) => {
    try {
        const data = await pool.query(
            "SELECT * FROM promo;"
        );
        res.json(data.rows)
    } catch (error) {
        console.log(error)
    }
});

app.post("/user", async (req, res) => {
    try {
        const { namee, phone, email } = req.body;

        const data = await pool.query(
            "INSERT INTO \"user\" (name, phone, email) VALUES ($1, $2, $3) RETURNING *",
            [namee, phone, email]
        );
        res.json(data.rows[0]);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong" });
    }
});


app.get("/user", async (req, res) => {
    try {
        const data = await pool.query(
            "SELECT * FROM user;"
        );
        res.json(data.rows)
    } catch (error) {
        console.log(error)
    }
});

app.listen("5000", () => {
    console.log("cool")
})