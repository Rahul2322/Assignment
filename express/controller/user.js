const { v4: uuidv4 } = require('uuid');
const Redis = require('ioredis'); 
const { ErrorHandler } = require('../utils/errorHandler');
const redisClient = new Redis({
    host: '127.0.0.1',
    port: 6379,
  });

const adduser = async (req,res)=>{
    const {username,age,hobbies} = req.body;
    const userBody = {
        id:uuidv4(),
        username,
        age,
        hobbies
    }
    let users = await redisClient.get('users');
    if(users){
        users = JSON.parse(users);
        users.push(userBody);
        redisClient.set('users',JSON.stringify(users));
    }else{
        const users = [];
        users.push(userBody)
        redisClient.set('users',JSON.stringify(users));
    }

     return res.status(201).json({
        message:`User ${username} successfully created`
     })
}



const getUsers = async (req,res)=>{
    const getUsers = await redisClient.get('users');
    if(!getUsers){
        throw new ErrorHandler("Data not found",404)
        // return res.status(404).json({
        //     message:"Data not found"
        // })
    }
    const users = JSON.parse(getUsers);
     return res.status(200).json({
        message:users
     })
}

const getUserById = async (req,res)=>{
    const userId = req.params.id;
    const getUsers = await redisClient.get('users');
    if(!getUsers){
        throw new ErrorHandler("Data not found",404)
        // return res.status(404).json({
        //     message:"Data not found"
        // })
    }
    const users = JSON.parse(getUsers);
    const getUser = users.find(user=>user.id === userId);
    if(!getUser){
        throw new ErrorHandler("User not found",404)
        // return res.status(404).json({
        //     message:"User not found"
        // }) 
    }
    return res.status(200).json({
       message:getUser
    })
}

const updateUser = async(req,res)=>{
    const {username,age,hobbies} = req.body;
    const userId  = req.params.id
    let users = await redisClient.get('users');
    if(!users){
        throw new ErrorHandler("Data not found",404)
        // return res.status(404).json({
        //     message:"Data not found"
        // })
    }else{
        users = JSON.parse(users);
        const getUser = users.find(user=>user.id === userId);
        if(!getUser){
            throw new ErrorHandler("User not found",404)
            // return res.status(404).json({
            //     message:"User not found"
            // }) 
        }
        const userBodyToUpdate = {
            id:getUser.id,
            username,
            age,
            hobbies
        }
        const updatedUsers = users.map(user=>{
            if(user.id === userId){
                return userBodyToUpdate
            }else{
                return user
            }
        })
        redisClient.set('users',JSON.stringify(updatedUsers));
    }
    
    return res.status(201).json({
        message:`User ${username} successfully updated`
     })
}

const deleteUser = async(req,res)=>{
    const userId  = req.params.id
    let users = await redisClient.get('users');
    if(!users){
        throw new ErrorHandler("Data not found",404)
        // return res.status(404).json({
        //     message:"Data not found"
        // })
    }
    users = JSON.parse(users);
    const getUser = users.find(user=>user.id === userId);
    if(!getUser){
        throw new ErrorHandler("User not found",404)
        // return res.status(404).json({
        //     message:"User not found"
        // }) 
    }
    const updatedUsers = users.filter(user=>user.id !== userId);
    redisClient.set('users',JSON.stringify(updatedUsers));
    return res.status(200).json({
        message:`User ${getUser.username} successfully deleted`
     })
}

module.exports = {
    adduser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
}