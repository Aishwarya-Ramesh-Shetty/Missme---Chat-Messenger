const User = require("../models/User.js")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.signupUser = async(req,res) =>{
    const {name,email,mobile,password} = req.body
    try{
        const existingUser = await User.findOne({$or:[{email},{mobile}]})
        if (existingUser){
            return res.status(400).json({message:"Email or mobile already in use"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new User({
            name,
            email,
            mobile,
            password:hashedPassword
        })

        await newUser.save()

        const token = jwt.sign(
            {id:newUser._id},
            process.env.SECRET,
            {expiresIn:'7d'}
        )

        res.status(201).json({message:"User created successfully",
            user:{
                id:newUser._id,
                name:newUser.name,
                email : newUser.email,
                mobile:newUser.mobile
            },
            token
        })
    }
    catch(error){
        console.error(error)
        res.status(500).json({message:"Server error "})
    }
}

exports.loginUser = async(req,res)=>{
    const {emailOrMobile,password} = req.body;
    try{
        const user =await User.findOne({
            $or:[{email:emailOrMobile},{mobile:emailOrMobile}]
        })

        if(!user){
            return res.status(404).json({message:"User not found"})
        }

        const isMatch = await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.status(400).json({message:"Invalid credentials"})
        }

        const token = jwt.sign(
            {id:user._id},
            process.env.SECRET,
            {expiresIn:'7d'}
        )

        res.status(200).json({message:"Login successful",
            user:{
                id:user._id,
                name: user.name,
                email: user.email,
                mobile: user.mobile
            },
            token
        })
    }
    catch(error){
        console.error(error)
        res.status(500).json({message:"Login server error"})
    }
}