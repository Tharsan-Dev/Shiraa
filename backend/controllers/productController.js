// controllers/userRoles.js
import itemModels from "../models/itemModels.js"
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
    const { name, type, items } = req.body;
    try {
      const item = new itemModels({ name, type, items });
      await item.save();
      res.status(200).json(item);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('server error');
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


  export const deleteItem = async (req, res) => {
    try {
      let item = await itemModels.findById(req.params.id);
      if (!item) {
        return res.status(404).json({ msg: 'Item not found' });
      }
  
      // delete item details
      item = await itemModels.findByIdAndDelete(req.params.id, { new: true });
  
      res.status(200).json({message:"product deleted",item:item});
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };