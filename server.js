import express from 'express';
import mongoose from 'mongoose'
import bodyParser from 'body-parser';
import morgan from 'morgan';
import productRoutes from './routes/productRoute.js';
import orderRoutes from './routes/orderRoute.js'
import userRoutes from './routes/userRoute.js'
import categoryRoutes from './routes/categoryRoute.js'
import checkoutRoutes from './routes/checkoutRoute.js'
import specificRoutes from './routes/specificRoute.js'
import cors from 'cors'
import compression from 'compression';
import dotenv from 'dotenv'
import helmet from 'helmet';
// import mongoSanitize  from 'express-mongo-sanitize';

dotenv.config()


const app = express();
const port = process.env.PORT;
app.options(cors());


app.use((req, res, next) => {
    res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("X-XSS-Protection", "1; mode=block");
    res.setHeader("Referrer-Policy", "no-referrer");
    res.setHeader("Permissions-Policy", "geolocation=(self), microphone=()");
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    next();
});

app.use(helmet({
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
}));

app.use(compression());
app.use(express.json());
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(morgan('tiny'));
// app.use(mongoSanitize ())



app.use(`/api`,productRoutes)
app.use(`/api`,orderRoutes)
app.use(`/api`,userRoutes)
app.use(`/api`,categoryRoutes)
app.use(`/api`,checkoutRoutes)
app.use(`/api`,specificRoutes)


await mongoose.connect(process.env.connection_string,)
.then(()=>{
  console.log('done connecting');
}).catch((err)=>{
  console.log(`error ${err}`);
})

app.listen(port,() => {
  console.log(`Example app listening on port ${port}`);
});
