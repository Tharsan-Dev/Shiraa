
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";



const protect =async(req,res,next)=>{

    let token;
    token=req.cookies.jwt;
    
    if(token){
        try{
            const decoded =jwt.verify(token,process.env.JWT_SECRET);
            //console.log(decoded);

            req.user=await User.findById(decoded.userId).select("-password");
            
           if(req.user){
            // console.log(req.user);
          next();
          }else {
            res.status(401).json({msg:"invalid user"});
          }
            

        }catch(error){
            res.status(401).json("error when finding user");
           
        }
    }else{
      res.status(401).json({message:"Not authorized, invalid token"});
    }
};



// const isAdmin = (req, res, next) => {
//     //console.log(req.user);
//     const userRole = req.user?.role; // Assuming user role is stored in req.user
//     if (userRole==="admin") {
//       next(); // Proceed to the next middleware or route handler
//     } else {
//       return res.status(403).json({ message: "Access denied: You do not have the correct role" });
//     }

// };

const checkRole = (roles) => {
  return (req, res, next) => {
    const userRole = req.user.role; // Assuming user role is stored in req.user
    if (roles.includes(userRole)) {
      next(); // Proceed to the next middleware or route handler
    } else {
      return res.status(403).json({ message: "Access denied: You do not have the correct role" });
    }
  };
};

export { protect,checkRole};
