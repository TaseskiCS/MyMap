const User = require('../models/user');
const jwt = require('jsonwebtoken');
const saveSocials = async(req, res)=> {
    const {token, socials} = req.body;
    console.log(req.body);
    try {
        const decodedToken = jwt.verify(token, process.env.SECRET_JWT);
        const email = decodedToken.email;
        console.log(email);
        const user = await User.findOne({email: email});
        console.log(user);
        
        user.socialMedia = socials;
        user.save();
        return res.json({message: 'saved', status:'success'});
        
    } catch (err) {
        return res.json({status:'error', error:err.message})
    }
    
}

const saveProfile = async(req, res)=> {
    const {token, name, bio, userPhoto} = req.body;
    console.log(req.body);
    try {
        const decodedToken = jwt.verify(token, process.env.SECRET_JWT);
        const email = decodedToken.email;
        console.log(email);
        const user = await User.findOne({email: email});
        console.log(user);
        user.name = name;
        user.bio = bio;
        user.userPhoto = userPhoto;
        user.save();
        return res.json({message: 'saved', status:'success'});
        
    } catch (err) {
        return res.json({status:'error', error:err.message})
    }
    
}

const saveLinks = async(req, res) => {
    const {token, links} = req.body;
    console.log(req.body);
    try {
        const decodedToken = jwt.verify(token, process.env.SECRET_JWT);
        const email = decodedToken.email;
        console.log(email);
        const user = await User.findOne({email: email});
        console.log(user);
        const newLinks = links.map((l)=> ({
            url: l.link.url,
            title: l.link.title,
            icon: l.link.icon || 'https://img.icons8.com/?size=100&id=38051&format=png&color=000000https://cdn.icon-icons.com/icons2/4053/PNG/512/link_square_icon_257542.png'
        }))
        user.links = newLinks;
        await user.save();
        return res.json({message: 'saved', status:'success'});
        
    } catch (err) {
        return res.json({status:'error', error:err.message})
    }
}

module.exports = {saveSocials, saveProfile, saveLinks};