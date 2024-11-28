const express = require('express')
const router = express.Router()
const { createController, getRecipeController, getSingleRecipeController, getSavedRecipeController, savedController } = require('../controller/recipeController.js')

router.post('/create-recipe', createController)
router.get('/get-recipe', getRecipeController)
router.get('/single-recipe/:id', getSingleRecipeController)
router.get('/saved-recipe/:id', getSavedRecipeController)
router.put('/saved', savedController)

module.exports = router