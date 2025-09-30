import express from "express";
import cors from "cors"
const app = express();
app.use(cors());

app.post("/signin", (req, res)=>{
    res.send({
        "msg":"hello this is signin endpoint"
    });
})


app.listen(process.env || 3000);