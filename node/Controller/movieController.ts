import express from "express"
import movieModel from "../Model/movieModel"

export const allMovies = (req:express.Request, res:express.Response) =>{
    movieModel.find({}).sort({id:1}).select([
        "id",
        "name",
        "type",
        "language",
        "premiered",
        "officialSite"
    ])
    .then((allResponse)=>{
        return res.json({
            message:"All Movies Returned",
            movieLength:allResponse.length,
            Movies:allResponse
        })
    })
    .catch(err=>console.log(err))
}   