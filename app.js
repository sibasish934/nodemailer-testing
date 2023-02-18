
import  Express  from "express";
import dotenv from "dotenv"
const app = Express();
const Port = process.env.PORT || 5000;
import userRoutes from "./routes/router.js";

dotenv.config({
    path:"./config/config.env",
});

app.use(Express.json());

app.use('/api/', userRoutes)

app.listen(Port, ()=>{
    console.log(`the server is running at port ${Port}`);
})
