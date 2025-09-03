import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    id:{
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: [0, "Price must be a positive number"]
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, { timestamps: true });

export default mongoose.model('Product', ProductSchema);