const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // Use the provided port or 3000 as a default

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
