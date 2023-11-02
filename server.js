const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000; // Use the provided port or 3000 as a default
const User = require('./models/user');
const Question = require('./models/question');
const session = require('express-session');
const userRoute = require('./routes/userRoute');
const resultRoute = require('./routes/resultRoute');
const getresultRoute = require('./routes/getResults');
// Connect to MongoDB 
mongoose.connect('mongodb+srv://zaxia12:HtfXqSCT6fqNdch6@quiz.lpdioep.mongodb.net/User', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
    });

app.use(session({
    secret: 'secretcode123456',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000, 
    }
}));

app.use(express.static(__dirname));
app.use(bodyParser.json());


function isAuthenticated(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/');
    }
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './view/login.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, './view/signup.html'));
});

app.get('/*', isAuthenticated, (req, res, next) => {
    next();
});

app.get('/homepage', (req, res) => {
    res.sendFile(path.join(__dirname, './view/homepage.html'));
});

app.get('/homepagev2', (req, res) => {
    res.sendFile(path.join(__dirname, './view/homepage.html'));
});

app.get('/quizpage', (req, res) => {
    res.sendFile(path.join(__dirname, './view/quizpage.html'));
});

app.get('/resultspage', (req, res) => {
    res.sendFile(path.join(__dirname, './view/resultspage.html'));
});

app.get('/feedbackpage', (req, res) => {
    res.sendFile(path.join(__dirname, './view/feedbackPage.html'));
});

app.get('/thankyoupage', (req, res) => {
    res.sendFile(path.join(__dirname, './view/thankYouPage.html'));
});

app.get('/viewAllResult', (req, res) => {
    res.sendFile(path.join(__dirname, './view/viewAllResult.html'));
});


app.use('/', userRoute);
app.use('/', resultRoute);
app.use('/', getresultRoute);

app.post('/login', async (req, res) => {
    const { email, password, rememberMe } = req.body;

    try {
        const user = await User.findOne({ email, password });

        if (!user) {
            res.json({ success: false, message: 'Invalid email or password' });
        } else {
            req.session.user = user.email;
            req.session.education = user.education;
            console.log('Session data:', req.session);
            if (rememberMe) {
                req.session.cookie.maxAge = 7 * 24 * 60 * 60 * 1000;
            }

            res.json({ success: true, message: 'Login successful' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

app.get('/api/questions', async (req, res) => {
    try {
      const questions = await Question.find();
      res.json(questions);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch questions' });
    }
  });

app.get('/session-data', (req, res) => {
    const sessionData = {
      user: req.session.user,
      education: req.session.education,
    };
    res.json(sessionData);
  });
  
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});



