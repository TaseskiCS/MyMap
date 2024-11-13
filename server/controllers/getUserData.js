const User = require('../models/user');

const getUserData = async (req, res) => {
    const username = req.params.username;
    try {
        console.log('hello');
        const user = await User.findOne({username: username});
        console.log(user);
        if (!user) {
            console.log('user not found');
        }
        const userData = {
            name: user.name,
            userPhoto: user.userPhoto,
            bio: user.bio,
            links: user.links
        }
        const socials = user.socialMedia;
        return res.json({message: 'found', userData, socials, status: 'success'});
        
    } catch (err) {
        return res.json({status: 'error', error: err.message});
    }
}

const getUserSocials = async(req, res) => {
    const username = req.params.username;
    try {
        console.log(username);
        const user = await User.findOne({username: username});
        const socials = user.socialMedia;
        return res.json({message: 'socials found', socials, status: 'success'})
    } catch (err) {
        res.json({status: 'error', error: err.message})
    }
}
module.exports = { getUserData, getUserSocials };

