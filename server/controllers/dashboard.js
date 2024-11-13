const User = require('../models/user')
const jwt = require('jsonwebtoken');
const dashboardData = async (req, res) =>{
    const { token } = req.body;
    console.log(token);
    try {
        const decodedToken = jwt.verify(token, process.env.SECRET_JWT);
        const email = decodedToken.email;
        console.log('email: ', email);
        const user = await User.findOne({email: email});
        const userData = {
            name: user.name,
            userPhoto: user.userPhoto,
            bio: user.bio,
            username: user.username,
            links: user.links.length
        }
        return res.json({message: "recieved from backend", userData, status: "success"})
        
    } catch (err) {
        return res.json({status: "error", error: err.message})
    }

}

const viewsData = async (req, res)=> {
    const { token } = req.body;
    console.log(token);
    try {
        const decodedToken = jwt.verify(token, process.env.SECRET_JWT);
        const email = decodedToken.email;
        console.log('email: ', email);
        const user = await User.findOneAndUpdate({email: email}, {$inc: {views:1}});
        console.log('user after views: ', user);
        return res.json({message: "view count updated", views:user.views, status: "success"})
        
    } catch (err) {
        return res.json({status: "error", error: err.message})
    }
}

module.exports = { dashboardData, viewsData };
