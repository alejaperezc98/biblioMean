import mongoose from "mongoose";

// Se crea el esquema, la estructura del libro
const proveedorSchema = new mongoose.Schema({
  name: String,
  direccion: String,
  registerDate: { type: Date, default: Date.now }
});

// crear una colección en la DB que se llame rol y todos los datos creados anteriormente
const proveedor = mongoose.model("proveedores", proveedorSchema);

export default proveedor