
//     ?
// /
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const apiRoutes = require("./routes/routes");
const JwtAuthentication = require("./middlewares/jwt");

const app = express();

/**
 * =========================
 * CORS CONFIG (MUST BE FIRST)
 * =========================
 */
const allowedOrigins = [
  "https://prep-center.vercel.app",
  "https://school-7f18.vercel.app",
  "http://localhost:3000",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow REST tools (Postman, curl) with no origin
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ REQUIRED FOR VERCEL (preflight)
app.options("*", cors());

/**
 * =========================
 * BODY & COOKIE PARSERS
 * =========================
 */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

/**
 * =========================
 * SKIP AUTH FOR PREFLIGHT
 * =========================
 */
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

/**
 * =========================
 * JWT AUTH MIDDLEWARE
 * =========================
 * Attaches req.user if token exists
 * DOES NOT block unauthenticated users
 */
const jwtAuth = new JwtAuthentication();
app.use(jwtAuth.normalAuthWithCookie);

/**
 * =========================
 * ROUTES
 * =========================
 */
app.use("/api", apiRoutes);

/**
 * =========================
 * SERVER START
 * =========================
 */
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
  console.log("Happy coding 👨‍💻👩‍💻");
});
