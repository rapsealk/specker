const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const userSchema = new Schema({
    public:{
        email: { type: String, unique: true, lowercase: true },
        name:{ type: String, lowercase:true },
        phone:{ type:String },
        gender:{ type: String },
        age:{ type: Number },
        description:{ type: String },
        gravatar: String,     //아바타 사진
        popular: {
            like: {type: Number, default: 0},
            unlike: {type: Number, default: 0}
        },
        teams :[{type:Schema.ObjectId}],
        rooms:[{type:Schema.ObjectId}],
        friends:[{type:Schema.ObjectId}],
        spec:[{type:Schema.ObjectId}],
        goal:[{type:Schema.ObjectId}],
        address : {     //추후 작업 요구
            post:String,
            subpost:String,
            zipcode:String
        }

    },
    private:{
        password: String,
        created_at:{ type: Date, default: Date.now },
        lastSignInDate:{ type: Date, default: Date.now },
        role: {
            type: String,
            default: 'user'
        },
        provider: {
            "type": { type: String, default: 'local', lowercase: true },
            "id": Number
        }
    }

});



userSchema.pre('save', function(next){
    const user = this;

    bcrypt.genSalt(10, function(err, salt){
        if(err){
            return next(err);
        }

        bcrypt.hash(user.private.password, salt, null, function(err, hash){
            if(err){
                return next(err);
            }

            user.private.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function(candidatePassword, callback){
    console.log("candidatePassword", candidatePassword);
    console.log("this.private.password", this.private.password);
    bcrypt.compare(candidatePassword, this.private.password, function(err, isMatch){
        console.log("isMatch", isMatch);

        if(err){
            return callback(err);
        }
        callback(null, isMatch);
    });
};


const ModelClass = mongoose.model('user', userSchema);


module.exports = ModelClass;