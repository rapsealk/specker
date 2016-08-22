const Spec = require('../models/spec');
const jwt = require('jwt-simple');
const config = require('../config');
var mongoose = require('mongoose');
const User = require('../models/user');

/*
 import 명령어: mongoimport --db specker --collection specs --file init_spec.json
 export 명령어: mongoexport -d specker -c specs -o init_spec.json
 */



exports.getClassification = function(req, res, next){

    var data=[];
    var query='';
    if(req.body.keyword){
        query=req.body.keyword;
    }
    console.log("query", query);
    Spec.find({name : {$regex : query}, depth:"C"},function(err, datas){

        for(var i=0; i<datas.length; i++){
            data.push({"id":i,"name":datas[i].name});
        }

        res.send(data);
    });

    // db.terms.findOne({term : {$regex : "지수적"}})
};


exports.saveClassification = function(req, res, next){
    var token = req.body.token;
    var decoded = jwt.decode(token, config.secret);
    var objectId = mongoose.Types.ObjectId(decoded.sub);
    User.findOne({ _id: objectId }, function(err, existingUser){
        if(err)
            throw err;
        existingUser
    })

};