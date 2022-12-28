const Product = {
    ProductName: {
        type: String,
        required: true
    },
    ProductPrice: {
        type: Number,
        required: true
    },
    ProductQuantity: {
        type: Number,
        required: true
    },
    ProductImage: {
        type: String,
        required: true
    },

    ProductDescription: {
        type: String,
        required: true
    },
    ProductCode: {
        type: String,
        required: true
    },
}

module.exports = Product;
