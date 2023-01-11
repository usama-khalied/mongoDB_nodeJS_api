const Order = {
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  oid: { type: Number, required: true },
  price: { type: Number, required: true },
  qty: { type: Number, required: true },
  currentDate: { type: String, required: true },
  status: { type: String, required: true },
};

module.exports = Order;
