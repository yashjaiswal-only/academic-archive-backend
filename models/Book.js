const mongoose=require("mongoose");

const BookSchema=new mongoose.Schema(
    {
        uid: [
            {
            type: String,
            required: true,
            },
        ],
        title: {
            type: String,
        },
        authors:[
            {
                first:{type:String},
                middle:{type:String},
                last:{type:String},
                corresponding:{type:Boolean}
            },
        ],
        publishedOn:{
            type:String,
        },
        doi:{
            type:String,
            unique:true
        },
        publisher:{
            type:String,
        },
        isbn:{
            type:String,
        },
        edition:{
            type:String,
        },
        bookType:{
            type:String,
        },
        nationality:{
            type:String,
        },
        refType:{
            type:String,
        },
    },
    {timestamps:true}
);

module.exports=mongoose.model("Book",BookSchema);

//this is how we can create an model 