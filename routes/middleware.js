const jwt=require("jsonwebtoken");


//verify auth token
const verifyToken=(req,res,next)=>{
    const authHeader=req.headers.token; 
    if(authHeader){ 
        const token=authHeader.split(" ")[1];//bearer-idon't know why
        jwt.verify(token,process.env.JWT_SEC,(err,user)=>{//third parameters takes parameter that output expects
            if(err){ 
                return res.status(403).json({message:"Token is not valid"}); 
            }
            req.user=user;//req.user is different from req.body
            //if the authtoken verify successfully then we append our user in request , so that other functions can use its content
            next(); 
        });
    }
    else{
        return res.status(401).json({message:"you are not authenticated!"});
    }
}


//verify authtoken and authorization
const verifyTokenAndAuthorization=(req,res,next)=>{
    console.log(req.body)
    //after token verification if user's id in database is equal to id in params(link) then only it proceeds to next() which is parent func
    verifyToken(req,res,()=>{ 
        if(req.user._id==req.body._id){
            next();
        }
        else{
            res.status(403).json({message:"You are not allowed to do that!"});
            return;
        }
    });
}

const verifyTokenAndAdmin=(req,res,next)=>{
    //after token verification if user's id in database is equal to id in params(link) then only it proceeds to next() which is parent func
    verifyToken(req,res,()=>{ 
        console.log(req.user)
        if(req.user.isAdmin){
            next();
        }
        else{
            res.status(403).json({message:"You are not an admin"});
            return;
        }
    });
}


module.exports ={verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin};