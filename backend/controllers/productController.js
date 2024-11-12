// // controllers/userRoles.js
// import itemModels from "../models/itemModels.js";
// import cloudinary from "../utils/cloudinary.js";
// // Function to get all items
// export const getItems = async (req, res) => {
//     try {
//       const items = await itemModels.find();
//       res.status(200).json(items);
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server error');
//     }
//   };
  
//   // Function to get an item by ID
//   export const getItemById = async (req, res) => {
//     try {
//       const item = await itemModels.findById(req.params.id);
//       if (!item) {
//         return res.status(404).json({ msg: 'Item not found' });
//       }
//       res.status(200).json(item);
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server error');
//     }
//   };
  
//   // Function to create a new item
//   // export const createItem = async (req, res) => {
//   //   const { name, category, price, description,
//   //     quantity,
//   //     stock } = req.body;
//   //     const file=req.files;
//   //     console.log(file);

//   //     const uploader = async(path) => { 
//   //       const res=await cloudinary.uploader.upload(path);
//   //       console.log(res);
//   //       return res.secure_url
//   //     };
//   //     const urls = [];
//   //     const files = req.files;
//   //     for (const file of files) {
//   //       const { path } = file;
//   //       const newpath = await uploader(path);
//   //       console.log(newpath);
//   //       urls.push(newpath);
//   //       // fs.unlinkSync(path);
//   //     }
//   //   console.log(urls);

//   //   try {
//   //     const item = new itemModels({ name,category, price, description,
//   //       quantity,
//   //       stock,
//   //       imageUrls:urls });

//   //     await item.save();
//   //     res.status(200).json(item);
//   //   } catch (err) {
//   //     console.error(err.message);
//   //     res.status(500).send('server error');
//   //   }
//   // };

//   // Function to create a new item
// export const createItem = async (req, res) => {
//   const { name, category, price, description, quantity, stock } = req.body;
//   const files = req.files;

//   try {
//       // Log the uploaded files for debugging
//       console.log(files);

//       // Function to upload images to Cloudinary
//       const uploader = async (path) => {
//           const res = await cloudinary.uploader.upload(path);
//           console.log(res);
//           return res.secure_url;
//       };

//       // Upload each image and collect the URLs
//       const urls = [];
//       for (const file of files) {
//           const { path } = file;
//           const newpath = await uploader(path);
//           console.log(newpath);
//           urls.push(newpath);
//       }

//       // Get the authenticated user
//       const user = req.user;

//       // Determine if the creator is an admin or shop owner
//       let creatorRole = 'admin';
//       let shopId = null;

//       if (user.role === 'shopOwner') {
//           creatorRole = 'shopOwner';
//           shopId = user.shopId; // Assuming the shop ID is stored in the user object
//       }

//       // Create the new product with the creator's role and shop ID if applicable
//       const item = new itemModels({
//           name,
//           category,
//           price,
//           description,
//           quantity,
//           stock,
//           imageUrls: urls,
//           createdBy: user._id,   // Save the user who created the product
//           creatorRole,           // Save the role (admin or shopOwner)
//           shop: shopId           // Associate with the shop if created by shopOwner
//       });

//       // Save the product in the database
//       await item.save();
//       res.status(200).json(item);
//   } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server error');
//   }
// };

  
//   // Function to update an item
  
//   export const updateItem = async (req, res) => {
//     try {
//       let item = await itemModels.findById(req.params.id);
//       if (!item) {
//         return res.status(404).json({ msg: 'Item not found' });
//       }
  
//       // Update item details
//       item = await itemModels.findByIdAndUpdate(req.params.id, req.body, { new: true });
  
//       res.status(200).json(item);
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server error');
//     }
//   };


//   export const deleteItem = async (req, res) => {
//     try {
//       let item = await itemModels.findById(req.params.id);
//       if (!item) {
//         return res.status(404).json({ msg: 'Item not found' });
//       }
  
//       // delete item details
//       item = await itemModels.findByIdAndDelete(req.params.id, { new: true });
  
//       res.status(200).json({message:"product deleted",item:item});
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server error');
//     }
//   };


import itemModels from "../models/itemModels.js";
import shopModel from "../models/shopModel.js";
import cloudinary from "../utils/cloudinary.js";

// Function to get all items
export const getItems = async (req, res) => {
    try {
        const items = await itemModels.find();
        res.status(200).json(items);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

export const getShopsItems = async (req, res) => {
    const shopId = req.params.id; // Extract shop ID from URL params
 
    try {
      const items = await itemModels.find({shop :shopId }); 
      res.status(200).json(items);
     
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };

// Function to get an item by ID
export const getItemById = async (req, res) => {
    try {
        const item = await itemModels.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ msg: 'Item not found' });
        }
        res.status(200).json(item);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Function to create a new item
export const createItem = async (req, res) => {
    const { name, category, price, description, quantity, stock,shop } = req.body;
    const files = req.files;

    try {
        // Log the uploaded files for debugging
        console.log(files);

        // Function to upload images to Cloudinary
        const uploader = async (path) => {
            const res = await cloudinary.uploader.upload(path);
            console.log(res);
            return res.secure_url;
        };

        // Upload each image and collect the URLs
        const urls = [];
        for (const file of files) {
            const { path } = file;
            const newpath = await uploader(path);
            console.log(newpath);
            urls.push(newpath);
        }

        // Get the authenticated user
        const user = req.user;

        // Determine if the creator is an admin or shop owner
        let creatorRole = 'admin';
        let shopId = null;

        if (user.role === 'shopOwner') {
            creatorRole = 'shopOwner';
           const shop = await shopModel.find({userId : user._id }); // Assuming the shop ID is stored in the user object
           console.log(shop);
           
           shopId= shop[0]._id
           console.log(shopId);
           
        }


        // Create the new product with the creator's role and shop ID if applicable
        const item = new itemModels({
            name,
            category,
            price,
            description,
            quantity,
            stock,
            imageUrls: urls,
            createdBy: user._id,   // Save the user who created the product
            creatorRole,           // Save the role (admin or shopOwner)
            shop: shopId ,          // Associate with the shop if created by shopOwner
            shopId:shop
        });

        // Save the product in the database
        await item.save();
        res.status(200).json(item);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Function to update an item
export const updateItem = async (req, res) => {
    try {
        let item = await itemModels.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ msg: 'Item not found' });
        }

        // Update item details
        item = await itemModels.findByIdAndUpdate(req.params.id, req.body, { new: true });

        res.status(200).json(item);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Function to delete an item
export const deleteItem = async (req, res) => {
    try {
        let item = await itemModels.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ msg: 'Item not found' });
        }

        // Delete the item
        item = await itemModels.findByIdAndDelete(req.params.id, { new: true });

        res.status(200).json({ message: "Product deleted", item: item });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
