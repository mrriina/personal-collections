const ApiError = require('../errors/ApiError')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {User} = require('../models/models')

const SECRET_KEY=process.env.SECRET_KEY

const generateJwt = (id, email) => {
    return jwt.sign({id, email},
        SECRET_KEY,
        {expiresIn: '1h'})
}

class UserController {
    async registration(req, res) {
        try {
            const {name, email, password} = req.body

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
                                role: user.role,
                            }
            })            
        } catch (e) {
            return res.status(400).json({message: `Server error: ${e.message}`})
        }
    }

    // async login(req, res) {
    //     try {
    //         const {email, password} = req.body
    //         const user = await User.findOne({where: {email}})
    //         if(!user) {
    //             return res.status(400).json({message: `User with email ${email} not found`})
    //         }
    //         let comparePassword = bcrypt.compareSync(password, user.password)
    //         if(!comparePassword) {
    //             return res.status(400).json({message: `Invalid password specified`})
    //         }
            
    //         await User.update({signIn: Date.now()}, {where: {email}})
    
    //         const token = generateJwt(user.id, user.email)
    //         return res.json({token,
    //                         user: {
    //                             id: user.id,
    //                             email: user.email,
    //                             name: user.name,
    //                             signUp: user.signUp,
    //                             signIn: user.signIn,
    //                             status: user.status,
    //                         }
    //         })            
    //     } catch (e) {
    //         return res.status(500).json({message: 'Server error'})
            
    //     }
    // }

    // async check(req, res) {
    //     const {token} = req.body
    //     const user = await User.findOne({where: {email}})
    //     return res.json({token})
    // }
}

module.exports = new UserController()