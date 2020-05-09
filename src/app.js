const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

const publicDirPath = path.join(__dirname,"../public")
const viewsPath = path.join(__dirname,"../templates/views")
const hbsPath = path.join(__dirname , "../templates/partials")

app.set("view engine","hbs")
app.set("views" ,viewsPath )
hbs.registerPartials(hbsPath)

app.use(express.static(publicDirPath))  

app.get("" , (req,res) => {
    res.render('index.hbs' , {
        title : "weather app",
        name : "Nayanika"
    })
})

app.get("/about" , (req,res) => {
    res.render('about' , {
        title : "About Me",
        name : "Nayanika"
    })
})

app.get("/help" , (req,res) => {
    res.render('help' , {
        title : "Help",
        name : "Nayanika",
        msg : "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book."
    })
})

app.get("/weather",(req,res) => {
    if(!req.query.address) {
        return res.send("please provide an address")
    }

    const address = req.query.address

    geocode(address,(error,{longitude,latitude,location} = {}) => {

        if(!error) {
            const city = location
        
            forecast(latitude,longitude,(error,data) => {
                if(error) {
                    return res.send({error})
                }
                res.send({
                    city,
                    forecast : data
                })
            })

        }else{
            res.send({error})
        }

    })
})

app.get("/help/*",(req,res) => {
    res.render('error',{
        title : "404",
        msg : "help article not found",
        name : "Nayanika"
    })
})

app.get("*",(req,res) => {
    res.render('error',{
        title : "404",
        msg : "Page not found",
        name : "Nayanika"
    })
})

app.listen(port,() => {
    console.log("server started at port " + port )
})

// app.get("",(req,res) => {
//     res.send()
// })