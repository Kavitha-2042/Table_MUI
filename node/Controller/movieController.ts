import express from "express";
import asyncHandler from "express-async-handler"
import movieModel from "../Model/movieModel";

export const allMovies = (req: express.Request, res: express.Response) => {
  movieModel
    .find({})
    .sort({ id: 1 })
    .select(["id", "name", "type", "language", "premiered", "officialSite"])
    .then((allResponse) => {
      return res.json({
        message: "All Movies Returned",
        movieLength: allResponse.length,
        Movies: allResponse,
      });
    })
    .catch((err) => console.log(err));
};

// export const search = (req: express.Request, res: express.Response) => {
//   const { input } = req.body;

// //   const value = input.toLowerCase()

  
//   movieModel
// //   .find({$text:{$search:`/${input}/i`}})
//     .find({ name: { $regex: ".*" + `${input}` + ".*" },$options:'i' })
//     // .find({name:`/^${input}/`})
//     // .find({name:{$regex:input}})
//     // .collation({locale:'en',strength:2})
//     .sort({ id: 1 })
//     .select(["id", "name", "type", "language", "premiered", "officialSite"])
//     .then((findResponse) => {
//       if (findResponse) {
//         return res.json({
//           message: "Message Returned",
//           count: findResponse.length,
//           searchResult: findResponse,
//         });
//       }
//     })
//     .catch((err) => console.log(err));
// };


export const search = async(req:express.Request, res:express.Response) =>{
    const {input} = req.body
    
    await movieModel.find({})
    .select([
        "id",
        "name",
        "type",
        "language",
        "premiered"
    ])
    .then((findResponse)=>{
        let value = findResponse.filter((val)=>val.name?.includes(input) || val.type?.includes(input) || val.language?.includes(input) || val.premiered?.includes(input))
        return res.json({
        message:"Listed",
        count:value.length,
        searchResult:value
       })
        // function filterItems(input:any) {
        //     return (
        //     findResponse.filter((el:any) => {
        //         if(el.name === input){
        //             value = el.name
        //         }
        //     })
        //     )
        // }
        // console.log(filterItems)
           
    })
    .catch(err=>console.log(err))
}


// express.get('/', asyncHandler(async (req, res, next) => {
// 	const bar = await foo.findAll();
// 	res.send(bar)
// }))