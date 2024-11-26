import shopModel from "../models/shopModel.js";
import User from "../models/userModel.js";
import cloudinary from "../utils/cloudinary.js";

// Shop Registration Controller
const ShopRegister = async (req, res) => {
    const {
        name,
        ownerName,
        email,
        password,
        phoneNumber,
        address,
        category,
        description,
    } = req.body;

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

    try {
        const urls = [];
        const files = req.files;  // Assuming Multer is handling file uploads

        // Upload files to Cloudinary and store URLs
        if (files && files.length > 0) {
            for (const file of files) {
                const { path } = file;
                const newpath = await uploader(path);
                if (newpath) {
                    urls.push(newpath);  // Add Cloudinary URL to array
                }
            }
        }

        // Check if the user exists
        const user = await User.findById(req.user._id);  // req.user._id populated via authentication middleware
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if user already owns a shop
        const existingShop = await shopModel.findOne({ userId: req.user._id });
        if (existingShop) {
            return res.status(400).json({ message: 'User already owns a shop' });
        }

        // Create new shop
        const shop = await shopModel.create({
            name,
            ownerName,
            email,
            password,
            phoneNumber,
            address,
            category,
            description,
            imageUrls: urls,  // Store Cloudinary image URLs
            userId: req.user._id,  // Associate shop with user ID
            role: "shopOwner",
        });

        // Update the user's role to "shopOwner"
        await User.updateOne(
            { _id: req.user._id },  // Find the user by ID
            { $set: { role: "shopOwner" } }  // Update the role to "shopOwner"
        );

        // Return updated user information
        const updatedUser = await User.findById(req.user._id);

        // Respond with the updated user and shop data
        res.status(200).json({
            message: 'Shop created successfully',
            shop,
            user: updatedUser
        });

    } catch (err) {
        console.error("Error creating shop", err);
        res.status(500).json({ message: 'Server error', error: err });
    }
};

// Get All Shops Controller
const getShops = async (req, res) => {
    try {
        // Fetch all shops
        const shops = await shopModel.find();
        if (shops && shops.length > 0) {
            res.status(200).json(shops);
        } else {
            res.status(404).json({ message: 'No shops found' });
        }
    } catch (err) {
        console.error("Error fetching shops", err);
        res.status(500).json({ message: 'Server error', error: err });
    }
};

// Get Shop by ID Controller
const getShopById = async (req, res) => {
    try {
        const { shopId } = req.params;

        // Find shop by ID
        const shop = await shopModel.findById(shopId);

        if (!shop) {
            return res.status(404).json({ message: 'Shop not found' });
        }

        res.status(200).json(shop);
    } catch (err) {
        console.error("Error fetching shop by ID", err);
        res.status(500).json({ message: 'Server error', error: err });
    }
};

// Get a shop by userId
const getShopByUserId = async (req, res) => {
    try {
        const { userId } = req.params; // Extract userId from request params
        console.log(userId);

        const shop = await shopModel.findOne({ userId });


        if (!shop) {
            return res.status(404).json({ message: 'Shop not found for this user' });
        }

        res.status(200).json(shop);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};



// Deactivate Shop Controller
// Deactivate a shop
// export const deactivateShop = async (req, res) => {
//     try {
//       const { id } = req.params;
//       const shop = await shopModel.findByIdAndUpdate(id, { role: "inactive" }, { new: true });
  
//       if (!shop) return res.status(404).json({ message: "Shop not found" });
  
//       res.status(200).json(shop);
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   };
  
  // Activate a shop
//   export const activateShop = async (req, res) => {
//     try {
//       const { id } = req.params;
//       const shop = await shopModel.findByIdAndUpdate(id, { role: "shopOwner" }, { new: true });
  
//       if (!shop) return res.status(404).json({ message: "Shop not found" });
  
//       res.status(200).json(shop);
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   };



export { ShopRegister, getShops, getShopById, getShopByUserId  };
