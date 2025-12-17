require("dotenv").config();
const express = require("express");
const cors = require("cors");
const apiRoutes = require("./routes/routes");
const jwtAuthentification = require("./middlewares/jwt");
const cookieParser = require("cookie-parser");

const app = express();

// app.use(
//   cors({
//     credentials: true,
//     origin: ["https://prep-center.vercel.app"],
//   })
// );

// Define your list of allowed origins (e.g., from environment variables)
const allowedOrigins = [
  "http://localhost:3000", // Example for a local frontend
  "https://prep-center.vercel.app", // Your production domain
  "https://school-7f18.vercel.app",
  "http://school-7f18.vercel.app",
  "http://prep-center.vercel.app",
];

const corsOptions = {
  // Use a function to dynamically set the origin
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or same-origin requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true); // Origin is in the allowed list
    } else {
      callback(new Error('Not allowed by CORS'), false); // Origin is not allowed
    }
  },
  credentials: true, // This is essential for allowing cookies, etc.
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Specify allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
};

// Enable CORS with the dynamic options
app.use(cors(corsOptions));

// Handle preflight requests explicitly for all routes (necessary for complex requests)
app.options('*', cors(corsOptions));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(cookieParser());

const jwtAuth = new jwtAuthentification();

app.use(jwtAuth.normalAuthWithCookie); // a middleware to attend in any api call so it must store the user authenticated info to req.user if exist. but dont mistake it with isAuthenticated method.

app.use("/api", apiRoutes);

const port = process.env.PORT ? process.env.PORT : 4000;
app.listen(port, () => {
  console.log(`Oh hey developer, the server started running on port ${port}`);
  console.log("happy coding, good luck");
});

// ""
//     ?
// /
