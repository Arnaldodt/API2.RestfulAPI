var express = require("express");
var cors = require("cors");

var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/titulo', {useNewUrlParser: true});
const esquema = new mongoose.Schema({
        title: {type:String, required:[true,'campo requerido'],maxlength:20,unique:true},
        description: {type:String, default: ''},
        completed: {type:Boolean, default: false}
    },{timestamps:true})
const TIT = mongoose.model('tit', esquema);

var app = express();
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({extended:true}));

app.get('/', async function(req, res) {
    await TIT.find()
        .then(datos =>{
            if (datos.length===0){
                res.json({mensaje:"No Existen Datos"})
            } else {
                res.json(datos)
            }
        })
        .catch(err => res.json(err))
})

app.post('/', function(req, res) {
    const {title, description, completed} = {...req.body}
    const tit = new TIT
    tit.title = title;
    if (description !== undefined){tit.description = description};
    if (completed !== undefined){tit.completed = completed};
    tit.save()
        .then(newper => {res.json(newper)})
        .catch(err => res.json(err))
})

app.get('/:id', function(req, res) {
    TIT.findOne({_id:req.params.id})
    .then(datos =>{
        if (datos === null){
            res.json({mensaje:"No Existe Dato"})
        } else {
            res.json(datos)
        }
    })
    .catch(err => res.json(err))
})

app.put('/:id', function(req, res) {
    TIT.updateOne({_id:req.params.id},req.body)
    .then(datos =>{(
        console.log(datos))
        if (datos === null){
            res.json({mensaje:"No Existe Dato"})
        } else {
           
            TIT.findOne({_id:req.params.id})
            .then(datos =>{
                if (datos === null){
                    res.json({mensaje:"No Existe Dato"})
                } else {
                    res.json(datos)
                }
            })
            .catch(err => res.json(err))

        }
    })
    .catch(err => res.json(err))    
})


app.patch('/:id', function(req, res) {
    TIT.updateOne({_id:req.params.id},req.body)
    .then(datos =>{(
        console.log(datos))
        if (datos === null){
            res.json({mensaje:"No Existe Dato"})
        } else {
           
            TIT.findOne({_id:req.params.id})
            .then(datos =>{
                if (datos === null){
                    res.json({mensaje:"No Existe Dato"})
                } else {
                    res.json(datos)
                }
            })
            .catch(err => res.json(err))

        }
    })
    .catch(err => res.json(err))    
})

app.delete('/:id', function(req, res) {
    TIT.deleteOne({_id:req.params.id})
        .then(res.json({mensaje:"Dato Eliminado"}))
        .catch(err => res.json(err))
})

app.listen(8000, function() {
    console.log("listening on port 8000");
})