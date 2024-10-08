import Order from '../models/orderModel.js';
import Shop from '../models/shopModel.js';
import itemModels from '../models/itemModels.js';

// Function to create a new order
export const createOrder = async (req, res) => {
  const { shopId, products, deliveryAddress } = req.body;
  console.log("order data",req.body);
  

  try {
    // Fetch user from the request (assuming authentication middleware)
    const user = req.user;

    // Validate if the shop exists
    // const shop = await Shop.findById(shopId);
    // if (!shop) {
    //   return res.status(404).json({ message: 'Shop not found' });
    // }

    // Validate products and calculate total price
    let totalAmount = 0;
    const validatedProducts = [];

    for (const item of products) {
      const product = await itemModels.findById(item.productId);
      if (!product) {
        return res.status(404).json({ message: `Product with ID ${item.productId} not found` });
      }
      totalAmount += product.price * item.quantity;

      validatedProducts.push({
        productId: product._id,
        name: product.name,
        quantity: item.quantity,
        price: product.price
      });
    }

    // Create the order
    const order = new Order({
      user: user._id,
      shop: shop._id,
      products: validatedProducts,
      totalAmount,
      deliveryAddress,
    });

    await order.save();
    res.status(201).json({ message: 'Order created successfully', order });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Function to fetch orders for a user
export const getUserOrders = async (req, res) => {
  try {
    const userOrders = await Order.find({ user: req.user._id })
      .populate('shop')
      .populate('products.productId');
    res.status(200).json(userOrders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Function to fetch all orders for a shop owner
export const getShopOrders = async (req, res) => {
  try {
    const shopId = req.params.shopId;
    const shopOrders = await Order.find({ shop: shopId })
      .populate('user')
      .populate('products.productId');
    res.status(200).json(shopOrders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Function to update an order's status
export const updateOrderStatus = async (req, res) => {
  try {
    let order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Update order status or other fields
    order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Function to delete an order
export const deleteOrder = async (req, res) => {
  try {
    let order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Delete the order
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
