const express = require('express');
const router = express.Router();
const contentController = require('../controllers/content_controller')

router.get('/shows', contentController.getShowsList);
router.get('/movies', contentController.getMoviesList);
router.post('/add', contentController.addItem);

module.exports = router;
