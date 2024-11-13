const User = require('../models/user');
const jwt = require('jsonwebtoken');

const loadSocials = async(req, res) => {
    const {token} = req.body;
    console.log(req.body);
    try {
        const decodedToken = jwt.verify(token, process.env.SECRET_JWT);
        const email = decodedToken.email;
        console.log(email);
        const user = await User.findOne({email: email});
        console.log(user);
        const socials = user.socialMedia;

        return res.json({message: 'found', socials, status:'success'});
        
    } catch (err) {
        return res.json({status:'error', error:err.message})
    }
}
const loadLinks = async(req, res) => {
    const {token} = req.body;
    console.log(req.body);
    try {
        const decodedToken = jwt.verify(token, process.env.SECRET_JWT);
        const email = decodedToken.email;
        console.log(email);
        const user = await User.findOne({email: email});
        console.log(user);
        const links = user.links;
        console.log("here are ", links);
        

        return res.json({message: 'found', links, status:'success'});
        
    } catch (err) {
        return res.json({status:'error', error:err.message})
    }
}

module.exports = {loadSocials, loadLinks};