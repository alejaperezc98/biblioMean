// importamos el modelo a donde vamos a enviar los datos 
import libro from "../models/libro.js";

const registerLibro = async (req, res) => {
    if (!req.body.name || !req.body.autor || !req.body.añoPublicacion || !req.body.paginas || !req.body.genero || !req.body.precio) 
        return res.status(400).send("incomplete data");

     const existingLibro = await libro.findOne({name: req.body.name}); //Busque en toda la coleccion la primera coincidencia
     if (existingLibro)
        return res.status(400).send("El Libro ya existe");

    const libroSchema = new libro({
        name: req.body.name,
        autor: req.body.autor,
        añoPublicacion: req.body.añoPublicacion,
        paginas: req.body.paginas,
        genero: req.body.genero,
        precio: req.body.precio,
    })    

    const result = await libroSchema.save();
    if (!result) return res.status(400).send("Fallo al regitrar el libro");

    return res.status(200).send({result});
};

const listLibro = async (req, res) => {
    const libroSchema = await libro.find(); //Trae todo
    if(!libroSchema || libroSchema.length == 0) 
        return res.send(400).send("Empty list");
    return res.status(200).send({libroSchema});
};

const findLibro = async (req, res) => {
    const libroId = await libro.findById({_id:req.params["_id"]})
    return !libroId
    ? res.status(400).send("No search results")
    : res.status(200).send({libroId});
};

const updateLibro = async (req, res) => {
    if(!req.body.name || !req.body.autor || !req.body.añoPublicacion || !req.body.paginas || !req.body.genero || !req.body.precio)
        return res.status(400).send("Incomplete data");
    
    const existingLibro = await libro.findOne({name: req.body.name});
    if (existingLibro) return res.status(400).send("El Libro ya existe");

    const libroUpdate = await libro.findByIdAndUpdate(req.body._id, {
        name: req.body.name,
        autor: req.body.autor,
        añoPublicacion: req.body.añoPublicacion,
        paginas: req.body.paginas,
        genero: req.body.genero,
        precio: req.body.precio
    });

    return !libroUpdate
    ? res. status(400).send("Error editing libro")
    : res.status(200).send({libroUpdate});
}

const deleteLibro = async (req, res) => {
    const libroDelete = await libro.findByIdAndDelete({_id:req.params["_id"]})
    !libroDelete
    ? res.status(400).send("Libro not found")
    : res.status(200).send("Libro delete");
}

export default {registerLibro, listLibro, findLibro, updateLibro, deleteLibro};