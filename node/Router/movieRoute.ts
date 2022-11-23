import express from "express"
import * as movieController from "../Controller/movieController"

const movieRoute = express.Router()

movieRoute.get("/all",movieController.allMovies)

export default movieRoute