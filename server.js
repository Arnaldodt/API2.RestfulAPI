var express = require("express");

var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/titulo', {useNewUrlParser: true});
const esquema = new mongoose.Schema({
        title: {type:String, required:[true,'campo requerido'],maxlength:20,unique:true},
        description: {type:String, default: ''},
        completed: {type:Boolean, default: false}
    },{timestamps:true})
const TIT = mongoose.model('tit', esquema);

var app = express();
app.use(express.json());
 

app.get('/', function(req, res) {
    TIT.find()
        .then(datos =>{
            if (datos.length===0){
                res.send({mensaje:"No Existen Datos"})
            } else {
                res.send({datos})
            }
        })
        .catch(err => res.send({error:err}))
})

app.post('/', function(req, res) {
    const {title, description, completed} = {...req.body}
    const tit = new TIT
    tit.title = title;
    if (description !== undefined){tit.description = description};
    if (completed !== undefined){tit.completed = completed};
    tit.save()
        .then(newper => {res.send(newper)})
        .catch(err => res.send({error:err}))
})

app.get('/:id', function(req, res) {
    TIT.findOne({_id:req.params.id})
    .then(datos =>{
        if (datos === null){
            res.send({mensaje:"No Existe Dato"})
        } else {
            res.send({datos})
        }
    })
    .catch(err => res.send({error:err}))
})

app.put('/:id', function(req, res) {
    TIT.updateOne({_id:req.params.id},req.body)
    .then(datos =>{(
        console.log(datos))
        if (datos === null){
            res.send({mensaje:"No Existe Dato"})
        } else {
           
            TIT.findOne({_id:req.params.id})
            .then(datos =>{
                if (datos === null){
                    res.send({mensaje:"No Existe Dato"})
                } else {
                    res.send({datos})
                }
            })
            .catch(err => res.send({error:err}))

        }
    })
    .catch(err => res.send({error:err}))    
})


app.patch('/:id', function(req, res) {
    TIT.updateOne({_id:req.params.id},req.body)
    .then(datos =>{(
        console.log(datos))
        if (datos === null){
            res.send({mensaje:"No Existe Dato"})
        } else {
           
            TIT.findOne({_id:req.params.id})
            .then(datos =>{
                if (datos === null){
                    res.send({mensaje:"No Existe Dato"})
                } else {
                    res.send({datos})
                }
            })
            .catch(err => res.send({error:err}))

        }
    })
    .catch(err => res.send({error:err}))    
})

app.delete('/:id', function(req, res) {
    TIT.deleteOne({_id:req.params.id})
        .then(res.send({mensaje:"Dato Eliminado"}))
        .catch(err => res.send({error:err}))
})

app.listen(8000, function() {
    console.log("listening on port 8000");
})