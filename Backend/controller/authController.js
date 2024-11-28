const UserModel = require('../model/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const registerController = async(req,res) =>{
    try{
        const { username, password } = req.body
        if(!username || !password){
            return res.status(200).json({message: "Enter Username and Password"})
        }
        const exist = await UserModel.findOne({username})
        if(exist){
            return res.status(200).json({message: "User already exist"})
        }
        else{
            const hashedPassword = await bcrypt.hash(password, 10)
            const newUser = await UserModel({
                username: username,
                password: hashedPassword
            })
            await newUser.save()
            return res.status(200).json({message: "User Registered Successfully"})
        }
    }
    catch(err){
        console.log(`Error in Register Controller - ${err}`)
        res.status(500).json({error: "Internal Server Error"})
    }
}

const loginController = async(req,res) =>{
    try{
        const { username, password } = req.body
        const exist = await UserModel.findOne({username})
        if(exist){
            const verifyPassword = await bcrypt.compare(password, exist.password)
            if(verifyPassword){
                const token = jwt.sign({id: exist._id}, process.env.SECRET_KEY)
                res.cookie('token', token)
                return res.status(200).json({message: "User Logged in", id: exist._id})
            }
            else{
                return res.status(200).json({message: "Passwrong is wrong"})
            }
        }
        else{
            return res.status(200).json({message: "User Doesn't exist"})
        }
    }  
    catch(err){
        console.log(`Error in Login Controller - ${err}`)
        res.status(500).json({error: "Internal Server Error"})
    }
}

const logoutController = async(req,res) =>{
    try{
        await res.clearCookie('token')
        window.localStorage.removeItem('id')
        return res.status(200).json({message: "Logout Success"})
    }
    catch(err){
        console.log(`Error in Logout Controller - ${err}`)
        res.status(500).json({error: "Internal Server Error"})
    }
}

module.exports = { registerController, loginController, logoutController }