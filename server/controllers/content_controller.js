'use strict'
const knex = require('knex')(require('../knexfile'));

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
        const {title, category, year, genre, rating, image, link} = req.body.data
        if(category === "show") {
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
        if(category === "movie") {
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

const removeItem = (req, res) => {
    try {
        const id = req.query.id;
        const category = req.query.category;
    
        if(category == "show") {
            knex('shows').where('id', id).del().returning('*').then(function(result){
                if(result[0]) {
                    return res.status(200).json({
                        message: "Item succesfully removed",
                        item: result[0],
                        category: "show"
                    })
                }
                return res.status(404).json({
                    message: "Item not found"
                })
                
            })
        }
        

    } catch(error) {
        console.log(error);
        res.status(400).send(error);
    }
}

const updateItem = (req, res) => {
    try{
        const {id, title, category, year, genre, rating, image, link} = req.body.data
        if(category === "show") {
            knex('shows').update({title, year, genre, rating, image, link}).where('id', id).returning('*')
            .then(function(result) {
                if(result) {
                    res.status(200).json({
                        message: "Show successfully updated",
                        item: result[0],
                        category: "show"
                    })
                }
            })
        }
        if(category === "movie") {
            knex('movies').update({title, year, genre, rating, image, link}).where('id', id).returning('*')
            .then(function(result) {
                if(result) {
                    res.status(200).json({
                        message: "Movie successfully updated",
                        item: result[0],
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

const titleValidation = (req, res) => {
    try {
        if(req.query.category === 'show') {
            knex.select('id').where('title', req.query.title).from("shows").first().then(function(row) {
                if(row) {
                    if(row.id == req.query.itemId) {
                        return true;
                    }
                    return res.status(302).json({
                        message: "Show with this title already exists!"
                    })
                }
                return res.status(200).send()
            })
        }
        if(req.query.category === "movie") {
            knex.select('id').where('title', req.query.title).from("movies").first().then(function(row) {
                if(row) {
                    if(row.id == req.query.itemId) {
                        return true;
                    }
                    return res.status(302).json({
                        message: "Movie with this title already exists!"
                    })
                }
                return res.status(200).send()
            })
        }
        

    } catch(error) {
        console.log(error);
        res.status(400).send(error);
    }
}

module.exports = {
    getShowsList: getShowsList,
    getMoviesList: getMoviesList,
    addItem: addItem,
    removeItem: removeItem,
    updateItem: updateItem,
    titleValidation: titleValidation,
}