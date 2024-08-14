import mongoose from 'mongoose';

const beneficiarySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
});

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
    phoneno: {
        type: String,
        required: true,
    },
    age: {
        type: String,
        required: true,
    },
    noOfPersons: {
        type: Number,
        required: true,
    },
    appointmentDate: {
        type: String,
        required: true,
    },
    beneficiaries: [beneficiarySchema],
    tests: {
        type: [String],  // Array of strings for tests selected for the entire order
        default: [],
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
    reports: [String],
    status: {
        type: String,
        default: "Pending"
    }
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
