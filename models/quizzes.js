//Import mongoose
const mongoose = require('mongoose');
//Create schema definition object
const schemaDefinition = {
    name:{
        type: String,
        require:true
    },
    duedate:{  
        type: Date
       
    },
    course:{
        type: String,
        require:true
    },
    status:{
        type: String,
        default: 'TO DO'
    }
};
//create mongoose schema using the def obj
var mongooseSchema = new mongoose.Schema(schemaDefinition);

//create and export mongoose Model
module.exports = mongoose.model('Quizzes', mongooseSchema);