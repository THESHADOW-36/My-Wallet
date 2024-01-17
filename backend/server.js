import { config } from "dotenv";
import express from "express"
import cors from "cors";
import morgan from "morgan";
import router from "./routes";

const app = express();
app.use(express.json());
app.use(morgan('tiny'))
app.use(cors());
config({ path: './config/config.env' });

app.use('/api/v1', router)

const port = 8000;
app.listen(port, () => { console.log(`Server is started in ${port}`) })

console.log("Hello World!");