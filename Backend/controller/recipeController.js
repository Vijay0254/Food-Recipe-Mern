const RecipeModel = require('../model/recipeModel')
const UserModel = require('../model/userModel')

const createController = async(req,res) =>{
    try{
        const { name, description, ingredients, imageURL, userId } = req.body
        if(!name || !description || !ingredients || !imageURL){
            return res.status(200).json({message: "Contents are missing"})
        }
        else{
            const newRecipe = await RecipeModel({
                name: name,
                description: description,
                ingredients: ingredients,
                imageURL: imageURL,
                userId: userId
            })
            await newRecipe.save()
            return res.status(200).json({message: "Recipe Created"})
        }
    }
    catch(err){
        console.log(`Error in Create Recipe Controller - ${err}`)
        res.status(500).json({error: "Internal Server Error"})
    }
}

const getRecipeController = async(req,res) =>{
    try{
        const recipes = await RecipeModel.find()
        return res.status(200).json(recipes)
    }
    catch(err){
        console.log(`Error in Get Recipe Controller - ${err}`)
        res.status(500).json({error: "Internal Server Error"})
    }
}

const getSingleRecipeController = async(req,res) =>{
    try{
        const { id } = req.params
        const recipe = await RecipeModel.findById({_id:id})
        return res.status(200).json(recipe)
    }
    catch(err){
        console.log(`Error in Get Single Recipe Controller - ${err}`)
        res.status(500).json({error: "Internal Server Error"})
    }
}

const getSavedRecipeController = async(req,res) =>{
    try{
        const { id } = req.params
        const savedRecipe = UserModel.findById({_id:id})
        return res.status(200).json(savedRecipe.savedRecipes)
    }
    catch(err){
        console.log(`Error in Get Saved Recipe Controller - ${err}`)
        res.status(500).json({error: "Internal Server Error"})
    }
}

const savedController = async(req,res) =>{
    try{
        const { id, recipeId } = req.body
        const recipe = await RecipeModel.findById({_id:recipeId})
        const user = await UserModel.findById({_id:id})
        console.log(user)
        user.savedRecipes.push(recipe)
        await user.save()
        return res.status(200).json({savedRecipes: user.savedRecipes})
    }
    catch(err){
        console.log(`Error in Get Saved Controller - ${err}`)
        res.status(500).json({error: "Internal Server Error"})
    }
}

module.exports = { createController, getRecipeController, getSingleRecipeController, getSavedRecipeController, savedController }