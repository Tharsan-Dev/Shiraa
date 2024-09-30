import shopModel from "../models/shopModel.js";
import User from "../models/userModel.js";
import cloudinary from "../utils/cloudinary.js";


// const ShopRegister = async(req,res) => {

//     const {name ,imageUrls} = req.body;
//     console.log(req.body)

//     const uploader = async(path) => { 
//         const res=await cloudinary.uploader.upload(path);
//         console.log(res);
//         return res.secure_url
//       };
//       const urls = [];
//       const files = req.files;
//       for (const file of files) {
//         const { path } = file;
//         const newpath = await uploader(path);
//         console.log(newpath);
//         urls.push(newpath);
//         // fs.unlinkSync(path);
//       }
//     console.log(urls);

    

    
//     const userExiists = await User.findOne (req.user._id);

//     if(userExiists){
//         res.status(400)
//         .json({message:'User already exists'});
//         return;
//     }

//     const shop = await shopModel.create({name ,imageUrls:urls ,userId:req.user._id });
//     if(shop){

//         res.status(200).json(shop)
//     }else{
//         res.status(400)
//         .json({message:'shop create failed'});
//         return;
//     }
// }







const ShopRegister = async (req, res) => {
    const { name } = req.body;

    // Cloudinary uploader function
    const uploader = async (path) => {
        try {
            const result = await cloudinary.uploader.upload(path);
            return result.secure_url;  // Return secure Cloudinary URL
        } catch (err) {
            console.error("Error uploading to Cloudinary", err);
            return null;
        }
    };

    // Array to store image URLs from Cloudinary
    const urls = [];
    const files = req.files;  // Assuming Multer is handling file uploads

    if (files && files.length > 0) {
        for (const file of files) {
            const { path } = file;
            const newpath = await uploader(path);
            if (newpath) {
                urls.push(newpath);  // Add Cloudinary URL to array
            }
            // Optionally: fs.unlinkSync(path);  // Remove file from server after upload
        }
    }
    try {
        // Check if the user exists in the UserModel
        const user = await User.findById(req.user._id);  // Assuming req.user._id is populated by authentication middleware
        //   console.log(user);
          
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Create new shop (after user verification)
        const shop = await shopModel.create({
            name,
            imageUrls: urls,  // Store Cloudinary image URLs
            userId: req.user._id  // Associate shop with user ID
        });

        if (shop) {
            res.status(200).json(shop);
        } else {
            res.status(400).json({ message: 'Shop creation failed' });
        }
    } catch (err) {
        console.error("Error creating shop", err);
        res.status(500).json({ message: 'Server error', error: err });
    }

    // try {
    //     // Check if the user already has a shop
    //     const existingShop = await shopModel.findOne({ userId: req.user._id });
    //     if (existingShop) {
    //         return res.status(400).json({ message: 'User already owns a shop' });
    //     }

    //     // Create new shop
    //     const shop = await shopModel.create({
    //         name,
    //         imageUrls: urls,  // Store Cloudinary image URLs
    //         userId: req.user._id  // Associate shop with user ID
    //     });

    //     if (shop) {
    //         res.status(200).json(shop);
    //     } else {
    //         res.status(400).json({ message: 'Shop creation failed' });
    //     }
    // } catch (err) {
    //     console.error("Error creating shop", err);
    //     res.status(500).json({ message: 'Server error', error: err });
    // }
};



const getShops = async(req,res) => {


    const shop = await shopModel.find();
    if(shop){

        res.status(200).json(shop)
    }else{
        res.status(400)
        .json({message:'shops not found'});
        return;
    }
}

export {ShopRegister,getShops}