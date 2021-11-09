import mongoose from "mongoose";

// Se crea el esquema, la estructura de cliente
const clienteSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  registerDate: { type: Date, default: Date.now },
  dbStatus: Boolean,
});

// crear una colección en la DB que se llame cliente y todos los datos creados anteriormente
const cliente = mongoose.model("clientes", clienteSchema);

export default cliente