
const jwt = require('jwt-simple');
const config = require('../config');
var mongoose = require('mongoose');
var async = require("async");
const Parser = require('../util/parser');
/*
 ref:http://bcho.tistory.com/1083
 waterfall : 각자의 흐름이 의존성이 있을때 순차적으로 실행.
 series : 각자의 흐름이 의존성이 없을때 순차적으로 실행.
 parallel : 각자의 흐름이 의존성도 없으며, 순차적으로 실행될 필요도 없을때.
 */


/*
 import 명령어: mongoimport --db specker --collection specs --file init_spec.json
 export 명령어: mongoexport -d specker -c specs -o init_spec.json
 */


exports.saveFeed = function(req, res, next){

    var a =req.body.html;
    console.log(a);
    // console.log("hell!");
    // for(var i=0; i<a.length; i++){
    //     console.log(a[i]);
    // }
    // var a = req.body.html;
    // console.log(a);
    Parser.parser(a);

}

