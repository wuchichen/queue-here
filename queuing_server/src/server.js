require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./db/mongodb");
const { authenticateToken } = require("./middleware/authenticate");
const loginRouter = require("./route/login-router");
const registerRouter = require("./route/register-router");
const restaurantRouter = require("./route/restaurant-route");
const bookingRouter = require("./route/booking-route");

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cors
app.use(cors());

// Routes
app.use("/api/v1/login", loginRouter);
app.use("/api/v1/register", registerRouter);

// Protected routes
app.use(authenticateToken);
app.use("/api/v1/restaurants", restaurantRouter);
app.use("/api/v1/bookings", bookingRouter);

// Run server
const PORT = process.env.PORT || 8080;
app.listen(PORT, async () => {
  console.log(`Server is listening on port ${PORT}`);
  console.log(`Connecting to database`);
  await db.connect();
  console.log(`Database connected`);
});
