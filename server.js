// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import bodyParser from 'body-parser';

// const app = express();
// const port = 3001;
// app.use(cors({
//     origin: "http://localhost:3000", // Update to your frontend URL
//     methods: ["POST", "GET","PUT","DELETE"],
//     credentials: true
//   }));
// // MongoDB connection
// app.use(bodyParser.json({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: true }));
// const uri = "mongodb+srv://fiverr:12345@cluster0.rxtzhta.mongodb.net/?retryWrites=true&w=majority";
// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('Connected to the database'))
//   .catch(() => console.log('Not connected'));

// // User model
// const UserSchema = new mongoose.Schema({
//   firstName: String,
//   lastName: String,
//   email: String,
//   announcementEmail: String,
//   degrees: String,
//   password: String,
// });

// const User = mongoose.model('User', UserSchema);

// app.use(express.json());

// // Register route
// app.post('/register', async (req, res) => {
//   const { firstName, lastName, email, announcementEmail, degrees, password } = req.body;

//   try {
//     // No hashing for simplicity
//     const newUser = new User({
//       firstName,
//       lastName,
//       email,
//       announcementEmail,
//       degrees,
//       password,
//     });

//     await newUser.save();

//     res.json({ message: 'User registered successfully.' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

// // Login route
// app.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });

//     if (!user || user.password !== password) {
//       return res.status(401).json({ message: 'Incorrect email or password.' });
//     }

//     res.json({ message: 'Login successful.' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server listening at http://localhost:${port}`);
// });
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(cors({
    origin: "http://localhost:3000", // Update to your frontend URL
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
}));

// MongoDB connection
const uri = "mongodb+srv://fiverr:12345@cluster0.rxtzhta.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 10000, // Set a value that works for your environment
})
.then(() => console.log('Connected to the database'))
.catch((error) => console.error('Error connecting to the database:', error.message));


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

app.use(express.json());

// Register route
app.post('/register', async (req, res) => {
    const { firstName, lastName, email, announcementEmail, degrees, password } = req.body;

    try {
        // No hashing for simplicity
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
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

app.get('/',(req,res)=>{
    res.send("this works well");
})
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
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
