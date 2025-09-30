import express from "express";
import cors from "cors";
import { prismaClient } from "database/client";
import { authMiddleware } from "./middleware";
import jwt from "jsonwebtoken";
import {SignupSchema} from "common/inputs";

const app = express();
app.use(cors());

app.post("/signin", async(req, res)=>{
    const {success, data} = SignupSchema.safeParse(req.body);
    if(!success) {
        res.status(403).json({
            message:"Incorrect credentials 1"
        })
        return;
    }
    const email = data.email;
    const password = data.password;

    const user = await prismaClient.user.findFirst({
        where: {
            email
        }

    });

    if (!user){
        res.status(403).json({
            message: "user not found"
        })
        return;
    }

    if(user.password !== password ){
        res.status(403).json({
            msg: "Incorrect password"
        })
        return;
    }

    const token = jwt.sign({
        userId: user.id
    }, process.env.JWT_SECRET!)
})

app.get("/calender:courseId", authMiddleware, async(req, res) =>{
    const courseId  = req.params.courseId;
    const course = await prismaClient.course.findFirst({
        where: {
            id: courseId
        }
    })

    const purchase = await prismaClient.purchases.findFirst({
        where: {
            userId: req.userId,
            courseId: courseId
        }
    })

    if(!purchase) {
        res.status(411).json({
            message: "you dont have access to this code."
        })
        return;
    }

    if (!course){
        res.status(403).json({
            message: "course with id not found"
        })
        return;
    }

    res.json({
        id: course.id,
        calender: course.calenderNotionId
    })


})


app.listen(3000);
console.log("running on port 3000");