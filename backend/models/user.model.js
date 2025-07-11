import mangoose from 'mongoose';

const userSchema = new mangoose.Schema({
    email : {
        type: String,
        required: true,
        unique: true,
},
    password : {
        type: String,
        required: true,
    },
    name : {
        type: String,
        required: true,
    },
    lastLogin : {
        type: Date,
        default: Date.now,
    }, 
    isVerified : {
        type: Boolean,
        default: false,
    }, 
    
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
},{timetamps: true});
//createat and updateat fields will be added automatically into the document

export const User = mangoose.model('User', userSchema);



