const express = require('express');         
const bodyParser = require('body-parser');        
const route = require('./routes/route.js');        
const { default: mongoose } = require('mongoose');       
const app = express();

app.use(bodyParser.json());                        
app.use(bodyParser.urlencoded({ extended: true }));        


mongoose.connect("mongodb+srv://lddu818:27o3D6VwW2z1zHMj@cluster0.6gomf.mongodb.net/project2?retryWrites=true&w=majority", {                  
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )



app.use('/functionup', route);


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
