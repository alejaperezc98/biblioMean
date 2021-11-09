import mongoose from "mongoose";

// Se crea el esquema, la estructura del libro
const libroSchema = new mongoose.Schema({
  name: String,
  autor: String,
  añoPublicacion: String,
  paginas: String,
  genero: String,
  precio: String,
  registerDate: { type: Date, default: Date.now },
});

// crear una colección en la DB que se llame rol y todos los datos creados anteriormente
const libro = mongoose.model("libros", libroSchema);

export default libro