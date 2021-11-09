// importamos el modelo a donde vamos a enviar los datos 
import cliente from "../models/cliente.js";

const registerCliente = async (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password) 
        return res.status(400).send("incomplete data");

     const existingCliente = await cliente.findOne({name: req.body.name}); //Busque en toda la coleccion la primera coincidencia
     if (existingCliente)
        return res.status(400).send("El cliente ya existe");

    const clienteSchema = new cliente({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        dbStatus: true,
    })    

    const result = await clienteSchema.save();
    if (!result) return res.status(400).send("Fallo al regitrar el cliente");

    return res.status(200).send({result});
};

const listCliente = async (req, res) => {
    const clienteSchema = await cliente.find(); //Trae todo
    if(!clienteSchema || clienteSchema.length == 0) 
        return res.send(400).send("Empty list");
    return res.status(200).send({clienteSchema});
};

const findCliente = async (req, res) => {
    const clienteId = await cliente.findById({_id: req.params["_id"]})
    return !clienteId
    ? res.status(400).send("No search results")
    : res.status(200).send({clienteId});
};

const updateCliente = async (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password)
        return res.status(400).send("incomplete data");

    const existingCliente = await cliente.findOne({name: req.body.name}); 
    if (existingCliente) return res.status(400).send("El cliente ya existe");

    const clienteUpdate = await cliente.findByIdAndUpdate(req.body._id,{
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    return !clienteUpdate
    ? res.status(400).send("Error editing cliente")
    : res.status(200).send({clienteUpdate});

}

const deleteCliente = async (req, res) =>{
    const clienteDelete = await cliente.findByIdAndDelete({_id:req.params["_id"]})
    !clienteDelete
    ? res.status(400).send("Cliente not found")
    : res.status(200).send("Cliente delete");
}

export default {registerCliente, listCliente, findCliente, updateCliente, deleteCliente};