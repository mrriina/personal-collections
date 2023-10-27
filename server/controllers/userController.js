require('dotenv').config()
const ApiError = require('../errors/ApiError')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {User} = require('../models/models')

SECRET_KEY=process.env.SECRET_KEY

const generateJwt = (id, email) => {
    return jwt.sign({id, email},
        SECRET_KEY,
        {expiresIn: '1h'})
}

function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

class UserController {
    async registration(req, res) {
        try {
            const {name, email, password} = req.body

            if(!isValidEmail(email)) {
                return res.status(400).json({message: 'Email is invalid'})
            }

            if(password.length < 1 || password.length > 20) {
                return res.status(400).json({message: 'Password must be between 1 and 20 characters'})
            }

            const candidate = await User.findOne({where: {email}})
            if(candidate) {
                return res.status(400).json({message: `User with email ${email} already exists`})
            }

            const hashPassword = await bcrypt.hash(password, 5)
            const user = await User.create({name, email, password: hashPassword})
            const token = generateJwt(user.id, email)
            
            return res.json({token,
                            user: {
                                id: user.id,
                                email: user.email,
                                name: user.name,
                                signUp: user.signUp,
                                signIn: user.signIn,
                                status: user.status,
                            }
            })            
        } catch (e) {
            return res.status(400).json({message: `Server error: ${e.message}`})
        }
    }

    async login(req, res) {
        try {
            const {email, password} = req.body
            const user = await User.findOne({where: {email}})
            if(!user) {
                return res.status(400).json({message: `User with email ${email} not found`})
            }
            let comparePassword = bcrypt.compareSync(password, user.password)
            if(!comparePassword) {
                return res.status(400).json({message: `Invalid password specified`})
            }
            
            await User.update({signIn: Date.now()}, {where: {email}})
    
            const token = generateJwt(user.id, user.email)
            return res.json({token,
                            user: {
                                id: user.id,
                                email: user.email,
                                name: user.name,
                                signUp: user.signUp,
                                signIn: user.signIn,
                                status: user.status,
                            }
            })            
        } catch (e) {
            return res.status(500).json({message: 'Server error'})
            
        }
    }

    async check(req, res) {
        const {token} = req.body
        const user = await User.findOne({where: {email}})
        return res.json({token})
    }

    async getUsers(req, res) {
        try {
            const users = await User.findAll()
            if(!users) {
                return res.status(500).json({message: 'Users not found'})
            }
            return res.json({users})
        } catch (e) {
            return res.status(500).json({message: 'Server error'})
        }
    }

    async getUserById(req, res) {
        try {
            const _id = req.params.id;
            const user = await User.findOne({where: {id: _id}})
            if(!user) {
                return res.status(500).json({message: 'User with this id not found'})
            }
            return res.json({user})
        } catch (e) {
            return res.status(500).json({message: 'Server error'})
        }
    }

    async deleteUsers(req, res) {
        try {
            await User.truncate()
            
            return res.json({message: 'All users have been successfully deleted'})
        } catch (e) {
            return res.status(500).json({message: 'Server error'})
        }
    }

    async deleteUserById(req, res) {
        try {
            const _id = req.params.id
            const user = await User.findOne({where: {id: _id}})
            if(!user) {
                return res.status(500).json({message: 'User with this id not found'})
            }
            await User.destroy({where: {id: _id}})
            return res.json({message: 'The user has been successfully deleted'})
        } catch (e) {
            return res.status(500).json({message: 'Server error'})
        }
    }

    async updateUsers(req, res) {
        try {
            const {status} = req.body
            await User.update({status: status}, {where: {}})
            
            return res.json({message: 'All users have been successfully updated'})
        } catch (e) {
            return res.status(500).json({message: 'Server error'})
        }
    }

    async updateUserById(req, res) {
        try {
            const {status} = req.body
            const _id = req.params.id
            const user = User.findOne({where: {id: _id}})

            if(!user) {
                return res.status(500).json({message: 'User with this id not found'})
            }
            await User.update({status: status}, {where: {id: _id}})
            
            return res.json({message: 'User has been successfully updated'})
        } catch (e) {
            return res.status(500).json({message: 'Server error'})
        }
    }
}

module.exports = new UserController()