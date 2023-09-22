const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000; // Use the provided port or 3000 as a default

// Connect to MongoDB 
mongoose.connect('mongodb+srv://zaxia12:HtfXqSCT6fqNdch6@quiz.lpdioep.mongodb.net/User', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
    });

// Define a Mongoose model for user data
const User = mongoose.model('accounts', {
    name: String,
    surname: String,
    email: String,
    password: String,
    education: String
});

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Handle form submissions
app.post('/registerUser', async (req, res) => {
    try {
        const { name, surname, email, password, education } = req.body;

        const user = new User({
            name,
            surname,
            email,
            password,
            education
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
