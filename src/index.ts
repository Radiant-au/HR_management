
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { AppDataSource } from "@config/data-source";
import AuthRoute from "@routes/AuthRoute";
import EmployeeRoute from "@routes/EmployeeRoute"
import AttendanceRoute from "@routes/AttendanceRoute";
import path from "path";
import LeaveRoute from "@routes/LeaveRoute";
import UserRoute from "@routes/UserRoute"


dotenv.config();
AppDataSource.initialize();

const app = express();
app.use(cors({
    origin: 'http://localhost:3000', // Allow only your React app in development
    credentials: true,               // Allow cookies if you're using authentication
  }));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use('/', express.static(path.join(__dirname, '../uploads')));

app.get('/', (req , res) => {
    res.send('Welcome to the hr management API');
});

app.use("/auth", AuthRoute);
app.use("/employee" , EmployeeRoute);
app.use("/attendance" , AttendanceRoute);
app.use("/user" , UserRoute);
app.use("/leave" , LeaveRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
