const express = require('express');
const loginRoutes = require('./routes/loginRoutes');

const app = express();
app.use(express.json());

// Use the loginRoutes for routes starting with /api
app.use('/api', loginRoutes);

// Your other routes and middleware can go here

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
