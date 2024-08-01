const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const CompanyInformation = require("./Models/companyInformation");
const corsOptions = {
  origin: "http://localhost:3000", // Allow requests from this origin
  methods: "GET,POST,PUT,DELETE", // Allowed HTTP methods
  allowedHeaders: "Content-Type,Authorization", // Allowed headers
};

app.use(cors(corsOptions)); 
require('dotenv').config();
require('./Models/db');

const PORT = process.env.PORT || 8080;
app.get('/ping',(req,res) => {
    res.send('pong');
})

// app.use(cors());
app.use(bodyParser.json());
app.use('/auth',AuthRouter);
app.use(express.json());

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})

app.post("/companyInformation", async (req, res) => {
  const newCompanyInfo = new CompanyInformation(req.body);
  try {
    const savedCompanyInfo = await newCompanyInfo.save();
    res.status(201).json(savedCompanyInfo);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error saving company information", error });
  }
});