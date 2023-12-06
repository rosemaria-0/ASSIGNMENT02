const mongoose = require('mongoose');
const SchemaDefinition =  {
name:{
    type:String,
    require:true
}
    };

    const courseSchema = new mongoose.Schema(SchemaDefinition);
    module.exports =  mongoose.model('Courses', courseSchema );   