
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { AppDataSource } from "@config/data-source";
import AuthRoute from "@routes/AuthRoute";
import EmployeeRoute from "@routes/EmployeeRoute"


dotenv.config();
AppDataSource.initialize();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req , res) => {
    res.send('Welcome to the hr management API');
});

app.use("/auth", AuthRoute);
app.use("/employee" , EmployeeRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
