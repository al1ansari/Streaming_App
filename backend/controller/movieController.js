const {getMediaList, TMDB_ENDPOINT} = require("../utility")



async function getCurrentMovies(req,res){
   const currentMovieList = await getMediaList(TMDB_ENDPOINT.fetchcurrentMovies);
   res.status(200).json({
    "status":"success",
    "message":currentMovieList
   })
}

async function getTopRatedMovies(req,res){
    const topRatedMovieList = await getMediaList(TMDB_ENDPOINT.fetchTopRated)
    res.status(200).json({
        "status":"success",
        "message":topRatedMovieList
    })
}

module.exports = { getCurrentMovies, getTopRatedMovies}