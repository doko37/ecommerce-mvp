const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors')

dotenv.config();

const app = express();

app.use(cors({
    origin: '*'
}))
app.use(express.json());
app.use('/menu', require('./routes/menu'));
app.use('/orders', require('./routes/order'));

app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT} 🚀`);
});