import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3001;

// Allow all origins
app.use(cors({
  origin: '*',
  methods: ["POST", "GET", "PUT", "DELETE"],
  credentials: true
}));

// MongoDB connection
const uri = "mongodb+srv://fiverr:GAYRNj2BVGB6w5NF@cluster0.rxtzhta.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to the database'))
  .catch((error) => {
    console.error('Error connecting to the database:', error);
    process.exit(1);
  });

// User model
const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  announcementEmail: String,
  degrees: String,
  password: String,
});

const User = mongoose.model('User', UserSchema);

// Parse JSON in the request body
app.use(express.json());

// Register route
app.post('/register', async (req, res) => {
  const { firstName, lastName, email, announcementEmail, degrees, password } = req.body;

  try {
    const newUser = new User({
      firstName,
      lastName,
      email,
      announcementEmail,
      degrees,
      password,
    });

    await newUser.save();

    res.json({ message: 'User registered successfully.' });
  } catch (error) {
    console.error('Error in registration:', error);
    res.status(500).json({ message: 'Internal Server Error in registration' });
  }
});

// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Incorrect email or password.' });
    }

    res.json({ message: 'Login successful.' });
  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).json({ message: 'Internal Server Error in login' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
