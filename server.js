const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000; // Use the provided port or 3000 as a default
const User = require('./models/userschema.js');

// Connect to MongoDB 
mongoose.connect('mongodb+srv://zaxia12:HtfXqSCT6fqNdch6@quiz.lpdioep.mongodb.net/User', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
    });


app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

// homepage 
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './view/index.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, './view/signup.html'));
});

app.get('/homepage', (req, res) => {
    res.sendFile(path.join(__dirname, './view/homepage.html'));
});

app.get('/quizpage', (req, res) => {
    res.sendFile(path.join(__dirname, './view/quizpage.html'));
});

app.get('/resultspage', (req, res) => {
    res.sendFile(path.join(__dirname, './view/resultspage.html'));
});



// Handle form submissions
app.post('/registerUser', async (req, res) => {
    try {
        const { name, surname, email, password, education } = req.body;

        const user = new User({
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            password: req.body.password,
            education: req.body.education
        });

        await user.save();

        res.status(200).json({ message: 'User data saved successfully!' });
    } catch (error) {
        console.error('Error saving user data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
