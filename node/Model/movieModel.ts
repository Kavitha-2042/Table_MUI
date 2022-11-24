import mongoose from "mongoose";

export const movieSchema = new mongoose.Schema({
    id:{
        type:String,
        unique:true
    },
    name:{
        type:String,
        
    },
    type:{
        type:String
    },
    language:{
        type:String
    },
    premiered:{
        type:String
    },
    officialSite:{
        type:String
    }

})

export default mongoose.model("movies",movieSchema)