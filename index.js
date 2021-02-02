const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const fs = require('fs')

//middleware
//help us uselayout
app.use(expressLayouts)

//body-parser middleware
app.use(express.urlencoded({extended: false}));

//for views use .ejs file
app.set('view engine', 'ejs')

//routes
app.get('/', (req, res)=>{
    res.send('Hi there')
})

//route2 - index view
//localhost:8000/dinosaurs
app.get('/dinosaurs', (req, res)=>{
    //to read 
    let dinos = fs.readFileSync('./dinosaurs.json')
    dinos = JSON.parse(dinos)
    console.log(dinos)
    //in our views folder render this page
    res.render('dinosaurs/index', { dinos: dinos})
})


//new view
app.get('/dinosaurs/new', (req, res)=>{
    
    res.render('dinosaurs/new')
    
    })
    




//show view
//localhost:8000/dinosaurs/4
app.get('/dinosaurs/:index', (req, res)=>{
    let dinos = fs.readFileSync('./dinosaurs.json')
    dinos = JSON.parse(dinos)
    //to get particlar dino
    //req.params.index
    const dino =dinos[req.params.index]

    res.render('dinosaurs/show', { dino })

})


//post route, dont have view
//localhost:8000/dinosaurs
app.post('/dinosaurs', (req, res)=>{
    let dinos = fs.readFileSync('./dinosaurs.json')
    dinos = JSON.parse(dinos)
    //to get particlar dino
    //req.params.index
    const newDino = {
        name: req.body.name,
        type: req.body.type
    }
    //update the dinos with new dinos
    dinos.push(newDino)
    //from to 
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinos))

    //redirect to dinosaurs
    res.redirect('/dinosaurs')
    
    //this is coming from form submit
   console.log(req.body)
    
    })



const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})

// app.listen(8000)
