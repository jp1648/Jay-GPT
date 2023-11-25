import {Request, Response, NextFunction } from "express";
import User from "../models/User.js";
import chatRoutes from "../routes/chat-routes.js";
import { configureOpenAI } from "../config/openai-config.js";
import OpenAIApi  from 'openai';
import {OpenAI} from 'openai';
import { ChatCompletionCreateParams, ChatCompletionMessageParam, CreateChatCompletionRequestMessage } from "openai/resources/index.mjs";



export const generateChatCompletion = async (
    req:Request,
    res:Response,
    next:NextFunction
    ) => {
        const {message} = req.body;
        try {
            const user = await User.findById(res.locals.jwtData.id);
            if(!user) return res.status(401).json("User not registered or Token malfunction");
            //grab user chats 
            const chats = user.chats.map(({role,content}) => ({role,content})) as ChatCompletionMessageParam[]
            chats.push({content: message, role: "user"});
            user.chats.push({content:message, role:"user"});
            //then send all prev chat with new chat to the openai api
            const openai = configureOpenAI();
            const chatResponse = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: chats,
            });
            user.chats.push(chatResponse.choices[0].message);
            await user.save(); 
            return res.status(200).json({chats: user.chats}) 
            
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: "Something went wrong"});
        }

}

export const sendChatsToUser= async (req:Request, res: Response, next: NextFunction) => {
    //get user details from signup
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not registered or token malfunction");
        }
        if(user._id.toString() !== res.locals.jwtData.id){
            return res.status(401).send("Permissions didn't match");
        }
        return res.status(200).json({message: "OK", chats:user.chats });
        } catch (error) {
        console.log(error);
        return res.status(200).json({message:"ERROR", cause: error.message});
    }

} 


export const deleteChats= async (req:Request, res: Response, next: NextFunction) => {
    //get user details from signup
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not registered or token malfunction");
        }
        if(user._id.toString() !== res.locals.jwtData.id){
            return res.status(401).send("Permissions didn't match");
        }
        //@ts-ignore
        user.chats = [];
        await user.save()

        return res.status(200).json({message: "OK" });
        } catch (error) {
        console.log(error);
        return res.status(200).json({message:"ERROR", cause: error.message});
    }

} 