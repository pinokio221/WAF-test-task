const knex = require('../knexfile');

const getShowsList = (req, res) => {
    try {
        let items = {};
        knex.select('*').table('shows')
        .then(function(result) {
            if(result) {
                items.items = result
                items.totalShows = result.length
            }
            return res.status(200).json({
                shows: items.items,
                totalShows: items.totalShows
            })
        })

    } catch(error) {
        console.log(error);
        res.status(400).send(error);
    }
}

const getMoviesList = (req, res) => {
    try {
        let items = {};
        knex.select('*').table('movies')
        .then(function(result) {
            if(result) {
                items.items = result
                items.totalShows = result.length
            }
            return res.status(200).json({
                movies: items.items,
                totalMovies: items.totalShows
            })
        })

    } catch(error) {
        console.log(error);
        res.status(400).send(error);
    }
}

const addItem = (req, res) => {
    try{
        const {title, type, year, genre, rating, image, link} = req.body.data
        console.log(link)
        if(type === "show") {
            knex.insert({title, year, genre, rating, image, link}).into('shows').returning('*')
            .then(function(result) {
                if(result) {
                    res.status(201).json({
                        message: "New show succesfully added!",
                        value: result[0],
                        category: "show"
                    })
                }
            })
        }
        if(type === "movie") {
            knex.insert({title, year, genre, rating, image, link}).into('movies').returning('*')
            .then(function(result) {
                if(result) {
                    res.status(201).json({
                        message: "New movie succesfully added!",
                        value: result[0],
                        category: "movie"
                    })
                }
            })
        }

    }catch(error) {
        console.log(error);
        res.status(400).send(error);
    }
}

module.exports = {
    getShowsList: getShowsList,
    getMoviesList: getMoviesList,
    addItem: addItem
}