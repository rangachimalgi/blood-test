import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    pincode: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    cartItems: [{
        id: String,
        productName: String,
        imgUrl: String,
        category: String,
        price: Number,
        shortDesc: String,
        description: String,
        qty: Number
    }],
    reportLink: {
        type: String,
        default: ''  
    },
    reportLink: {
        type: String,
        default: null
    },
      status: {
        type: String,
        default: "Pending"  
    }
});

const Order = mongoose.model('Order', orderSchema);

export default Order;