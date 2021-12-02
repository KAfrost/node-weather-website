const path = require("path");
const { response } = require("express");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode.js");
const weather = require("./utils/weather.js");

const app = express();

// Define Paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
//if your views are stored anywhere but inside of a "views" directory you must provide the correct path
const viewsPath = path.join(__dirname,"../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
// and set that path as the correct route for handlebars
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static dir to serve
app.use(express.static(publicDirectoryPath));

app.get("",(req,res)=> {
    res.render('index', {
        title: "Weather App",
        name: "Kristan Frost"
    });
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Page",
        name: "Kristan Frost"
    })
})

app.get("/help", (req,res)=> {
    res.render("help", {
        title: "Help Page",
        message: "I don't want to do get help.",
        name: "Kristan Frost"
    })
})

app.get("/weather", (req, res) => {
    if (!req.query.address){
        return res.send({
            error:"Please provide a location."
        })
    }                                    // destructured properties
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error){
            return res.send({ error: "Location not found"})
        }

        weather(latitude , longitude, (error, forecastData) => {
            if (error){
                return res.send({
                    error: "Location not found"
                })
            }
            res.send({
                location: location,
                forecast: forecastData,
                address: req.query.address
            })
        })
    }); 
   // res.send({forecast: "Partly sunny", location: "Philidelphia", address: req.query.address})
})

app.get("/products", (req,res) => {
    if (!req.query.search){
       return res.send({
            error:"Search term required"
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

// wildcard allows for specific 404's
app.get("/help/*", (req, res) => {
   res.render("404", {
       title: "404",
       message: "Help article not found.", 
       name: "Kristan Frost"
   })
})

// use * to route for a 404 
// needs to be last... Express checks from top down and will render the first one that matches
app.get("*", (req,res) => {
    res.render("404",{
        title: "404",
        message: "Page not found", 
        name: "Kristan Frost"
    });
})

// starts the server - argument1 = port to listen on
app.listen(3000, () => {
    console.log("Server is up on port 3000.")
})

//nodemon src/app.js -e js,hbs