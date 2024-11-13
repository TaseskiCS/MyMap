require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
const { registerUser, loginUser } = require('./controllers/auth.js');
const { dashboardData, viewsData }= require('./controllers/dashboard.js');
const { getUserData, getUserSocials } = require('./controllers/getUserData.js');
const {saveSocials, saveProfile, saveLinks} = require('./controllers/saveItems.js');
const {loadSocials, loadLinks} = require('./controllers/loadItems.js');
app.use(cors());
app.use(express.json());

mongoose
    .connect(process.env.MONGO_URI)
    .then(()=>{console.log('db connected')})
    .catch(err=>{
        console.log(err)
    });


app.get('/', (req, res)=> {
    res.send("hello");
})

app.post('/api/register', registerUser);
app.post('/api/login', loginUser)

app.post('/data/dashboard', dashboardData);

app.post('/data/views', viewsData); 

app.get('/get/:username', getUserData);

// app.get('/get/socials/:username', getUserSocials);

app.post('/save/socials', saveSocials);
app.post('/save/profile', saveProfile);
app.post('/save/links', saveLinks);
app.post('/load/socials', loadSocials);
app.post('/load/links', loadLinks);
const port = process.env.PORT || 8080;

app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
    
})