const ApiError = require('../errors/ApiError')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {Profile} = require('../models/models')

const SECRET_KEY='secret_key123'
// const SECRET_KEY=process.env.SECRET_KEY

const generateJwt = (id, email) => {
    return jwt.sign({id, email},
        SECRET_KEY,
        {expiresIn: '1h'})
}

class UserController {
    async registration(req, res) {
        try {
            const {name, email, password} = req.body

            const candidate = await Profile.findOne({where: {email}})
            if(candidate) {
                return res.status(400).json({message: `User with email ${email} already exists`})
            }

            const hashPassword = await bcrypt.hash(password, 5)
            const user = await Profile.create({name, email, password: hashPassword})
            const token = generateJwt(user.id, email)
            
            return res.json({token,
                            user: {
                                id: user.id,
                                email: user.email,
                                name: user.name,
                                role: user.role,
                            }
            })            
        } catch (e) {
            return res.status(400).json({message: `Server error: ${e.message}`})
        }
    }

    async login(req, res) {
        try {
            const {email, password} = req.body
            const user = await Profile.findOne({where: {email}})
            if(!user) {
                return res.status(400).json({message: `User with email ${email} not found`})
            }
            let comparePassword = bcrypt.compareSync(password, user.password)
            if(!comparePassword) {
                return res.status(400).json({message: `Invalid password specified`})
            }
            
            // await User.update({signIn: Date.now()}, {where: {email}})
    
            const token = generateJwt(user.id, user.email)
            return res.json({token,
                            user: {
                                id: user.id,
                                email: user.email,
                                name: user.name,
                                role: user.role,
                            }
            })            
        } catch (e) {
            return res.status(500).json({message: 'Server error'})
            
        }
    }


    async getUserById(req, res) {
        try {
            const _id = req.params.id;
            const profile = await Profile.findOne({where: {id: _id}})
            if(!profile) {
                return res.status(500).json({message: 'Profile with this id not found'})
            }
            return res.json({profile})
        } catch (e) {
            return res.status(500).json({message: 'Server error', error: e.message })
        }
    }

    // async check(req, res) {
    //     const {token} = req.body
    //     const user = await User.findOne({where: {email}})
    //     return res.json({token})
    // }
}

module.exports = new UserController()