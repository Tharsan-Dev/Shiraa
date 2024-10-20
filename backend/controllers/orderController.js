import Order from '../models/orderModel.js';
import Shop from '../models/shopModel.js';
import itemModels from '../models/itemModels.js';

// Function to create a new order
// Create a new order
export const createOrder = async (req, res) => {
  const { cartItems, shippingAddress, totalAmount, shippingCost,} = req.body;
  // console.log('Received shopId:', shopId);
  console.log("test cart",cartItems);
  

  try {
    

    // Validate if the products exist and calculate total price
    let calculatedTotal = 0;
    const orderItems = await Promise.all(
      cartItems.map(async (item) => {
        const product = await itemModels.findById(item._id);
        console.log("product sample",product);
        
        if (!product) {
          throw new Error(`Product not found: ${item.name}`);
        }

        calculatedTotal += product.price * item.quantity;
        return {
          product: product._id,
          name: product.name,
          quantity: item.quantity,
          price: product.price,
          shop:product.shop
        };
      })
    );

    // Compare calculated total with provided totalAmount
    const orderTotal = calculatedTotal + shippingCost;
    console.log(orderTotal);
    
    if (orderTotal !== totalAmount) {
      return res.status(400).json({ message: 'Total amount mismatch' });
    }

    // Create new order
    const order = new Order({
      user: req.user._id, // Assuming req.user is set from authentication middleware
      orderItems,
      shippingAddress,
      totalAmount: orderTotal,
      shippingCost,
      paymentStatus: 'pending',
      orderStatus: 'pending',
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating order', error: err.message });
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
