const User = require('../models/user')
const jwt = require('jsonwebtoken');

const registerUser = async(req, res) => {
    const { username, email, password } = req.body;
    console.log(req.body);
    try {
        const defaultLink = { url: 'antoniotaseski.com', title: 'Default Link -> Portfolio', icon: 'https://img.icons8.com/?size=100&id=38051&format=png&color=000000https://cdn.icon-icons.com/icons2/4053/PNG/512/link_square_icon_257542.png'}
        const user = await User.create({username, email, password, links: [defaultLink]});
        const token= jwt.sign({email: email}, process.env.SECRET_JWT);
        console.log("user created: ", user);
        return res.json({message: 'User created', status: 'success', 'token': token, id: user._id});
    } catch(err){
        console.log(err);
       
        const field = Object.keys(err.keyValue)[0];  // 'email' or 'username'
        if (field == 'email' && field == 'password') {
            return res.json({
                message: `This account already exists. Sign in below!`,
                status: 'error'
            });
        } else {
            return res.json({
                message: `The ${field} already exists. Please use a different ${field}.`,
                status: 'error'
            });
        }
        
    }
    
}

const loginUser = (req, res) => {
    const { email, password } = req.body;
    try {
        const user = User.findOne({email: email, password: password});
        console.log(user);
        if (!user){
            return res.json({status: 'null', error: 'Invalid credentials'})
        }
        const token = jwt.sign({email: email}, process.env.SECRET_JWT)
        return res.json({message: 'User found', status: 'success', 'token': token, id: user._id});
    } catch (err) {
        return res.json({message: err.message, status: 'error'});
    }
}

module.exports = { registerUser, loginUser };