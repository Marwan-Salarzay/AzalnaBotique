import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import morgan from "morgan"
import productRoutes from "./routes/productRoute.js"
import orderRoutes from "./routes/orderRoute.js"
import userRoutes from "./routes/userRoute.js"
import categoryRoutes from "./routes/categoryRoute.js"
import checkoutRoutes from "./routes/checkoutRoute.js"
import specificRoutes from "./routes/specificRoute.js"
import cors from "cors"
import compression from "compression"
import dotenv from "dotenv"
import helmet from "helmet"
import mongoSanitize from "express-mongo-sanitize"

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

// Enable CORS for all routes
app.use(cors({
  origin: ['https://your-vercel-domain.vercel.app'], // Or '*' for all domains (less secure)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // if you're using cookies/auth headers
}));

// app.options("*", cors())

// Security headers
app.use((req, res, next) => {
  res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains")
  res.setHeader("X-Content-Type-Options", "nosniff")
  res.setHeader("X-Frame-Options", "DENY")
  res.setHeader("X-XSS-Protection", "1; mode=block")
  res.setHeader("Referrer-Policy", "no-referrer")
  res.setHeader("Permissions-Policy", "geolocation=(self), microphone=()")
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate")
  res.setHeader("Pragma", "no-cache")
  res.setHeader("Expires", "0")
  next()
})

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'", "*"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "*"],
        scriptSrcAttr: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "*"],
        styleSrc: ["'self'", "'unsafe-inline'", "*"],
        frameSrc: ["'self'", "*"],
        connectSrc: ["'self'", "*"],
      },
    },
  }),
)

app.use(compression())
app.use(express.json())
app.use(express.static("public"))
app.use(bodyParser.json())
app.use(morgan("tiny"))
app.use(mongoSanitize())

// API routes
app.use(`/api`, productRoutes)
app.use(`/api`, orderRoutes)
app.use(`/api`, userRoutes)
app.use(`/api`, categoryRoutes)
app.use(`/api`, checkoutRoutes)
app.use(`/api`, specificRoutes)

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.connection_string)
    console.log("Connected to MongoDB")
  } catch (err) {
    console.error(`MongoDB connection error: ${err}`)
    // Don't exit the process in serverless environment
  }
}

// Connect to database
connectDB()

// For Vercel serverless deployment
if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`)
  })
}

// Export the Express app for serverless environments
export default app
