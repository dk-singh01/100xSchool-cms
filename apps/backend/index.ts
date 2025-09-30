import express from "express";
import cors from "cors";
import { prismaClient } from "database/client";
import { authMiddleware } from "./middleware";
const app = express();
app.use(cors());

app.post("/signin", (req, res)=>{
    res.send({
        "msg":"hello this is signin endpoint"
    });
})

app.get("/calender", authMiddleware, (req, res) =>{

})


app.listen(process.env || 3000);