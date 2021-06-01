const express = require("express");
const router = express.Router();
const contentController = require("../controllers/content_controller");

router.get("/shows", contentController.getShowsList);
router.get("/movies", contentController.getMoviesList);
router.post("/add", contentController.addItem);
router.delete("/remove", contentController.removeItem);
router.put("/update", contentController.updateItem);
router.get("/validation", contentController.titleValidation);

module.exports = router;
