const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000; // Use the provided port or 3000 as a default
const User = require('./models/user');
const userRoute = require('./routes/userRoute');

// Connect to MongoDB 
mongoose.connect('mongodb+srv://zaxia12:HtfXqSCT6fqNdch6@quiz.lpdioep.mongodb.net/User', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
    });


app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

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

app.use('/', userRoute);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// Quiz Schema
const quizResultSchema = new mongoose.Schema({
    user : String,
    score: Number
});

const QuizResult = mongoose.model('QuizResult', quizResultSchema);

//saving Quiz results.
app.post('/api/quizresults', (req, res) => {
    const {user, score} = req.body;

    const quizResult = new QuizResult({
        user, 
        score
    });

    quizResult.save()
        .then (savedResult => {
            res.json(savedResult);
        })
        .catch(error => {
            res.status(500).json({ error : 'Failed to save quiz result.'});
        });
});

app.get('api/quizresults', (req, res) => {
    QuizResult.find()
        .then(results => {
            res.json(results);
        })
        .catch(error => {
            res.status(500).json({error: 'Failed to retrieve quiz results.'});
        });
});


