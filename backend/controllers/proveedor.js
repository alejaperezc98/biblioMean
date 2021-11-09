// importamos el modelo a donde vamos a enviar los datos 
import proveedor from "../models/proveedor.js";

const registerProveedor = async (req, res) => {
    if (!req.body.name || !req.body.direccion) 
        return res.status(400).send("incomplete data");

     const existingProveedor = await proveedor.findOne({name: req.body.name}); //Busque en toda la coleccion la primera coincidencia
     if (existingProveedor)
        return res.status(400).send("El proovedor ya existe");

    const proveedorSchema = new proveedor({
        name: req.body.name,
        direccion: req.body.direccion
    })    

    const result = await proveedorSchema.save();
    if (!result) return res.status(400).send("Fallo al regitrar proveedor");

    return res.status(200).send({result});
};

const listProveedor = async (req, res) => {
    const proveedorSchema = await proveedor.find(); //Trae todo
    if(!proveedorSchema || proveedorSchema.length == 0) 
        return res.send(400).send("Empty list");
    return res.status(200).send({proveedorSchema});
}

const findProveedor = async (req, res) => {
    const proveedorId = await proveedor.findById({_id:req.params["_id"]})
    return !proveedorId
    ? res.status(400).send("No search results")
    : res.status(200).send({proveedorId});
}

//Metodo que actualiza un registro
const updateProveedor = async (req, res) => {
    if (!req.body.name || !req.body.direccion)
        return res.status(400).send("Incomplete data");

    const existingProveedor = await proveedor.findOne({name: req.body.name, direccion:req.body.direccion}); 
        if (existingProveedor) return res.status(400).send("El proovedor ya existe");

    const proveedorUpdate = await proveedor.findByIdAndUpdate(req.body._id, {
        name: req.body.name,
        direccion: req.body.direccion
    });

    return !proveedorUpdate
    ? res.status(400).send("Error editing proveedor")
    : res.status(200).send({proveedorUpdate});
}

//Metodo que elimina un registro por ID
const deleteProveedor = async (req, res) => {
    const proveedorDelete = await proveedor.findByIdAndDelete({_id: req.params["_id"]})
    !proveedorDelete
    ? res.status(400).send("Proveedor not found")
    : res.status(200).send("Proveedor delete");
}

export default {registerProveedor, listProveedor, findProveedor, updateProveedor, deleteProveedor};