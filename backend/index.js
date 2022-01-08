const express = require("express")
const app = express()
const mongoose = require('mongoose')
const helmet = require('helmet')
const morgan = require('morgan')
const userRoute = require('./routes/users')
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')

const multer = require('multer')
const path = require("path")

if (process.env.NODE_ENV !== "PRODUCTION") {
    require('dotenv').config()
}

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Mongo DB connected'))
.catch(error => console.log(error))

app.use("/images", express.static(path.join(__dirname, "public/images")))

// middleware

app.use(express.json())
app.use(helmet())
app.use(morgan("common"))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, "public/images"));
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  })
  
  const upload = multer({ storage: storage})

  app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
      return res.status(200).json("File uploded successfully");
    } catch (error) {
      console.error(error);
    }
  })

app.use("/api/users", userRoute)
app.use("/api/auth", authRoute)
app.use("/api/posts", postRoute)

app.get("/", (req, res) => {
    res.send("Welcome to homepage")
})

app.listen(process.env.PORT, ()=> {
    console.log(`Server running on PORT: ${process.env.PORT}`)
})