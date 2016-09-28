var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema= new Schema({
    for:{type:Schema.ObjectId},
    user:{type:Schema.ObjectId},

    popular: {
        like: [{
            who:{type:Schema.ObjectId},
            date:{type:Date, default:Date.now}
        }],
        unlike: [{
            who:{type:Schema.ObjectId},
            date:{type:Date, default:Date.now}
        }],
        block:[{
            who:{type:Schema.ObjectId},
            date:{type:Date, default:Date.now}
        }],
    },

    date:{type:Date, default:Date.now},
    content:{type:String},
    depth:{type:Number, default:0}
});



const ModelClass = mongoose.model('comment', commentSchema);
module.exports = ModelClass;
