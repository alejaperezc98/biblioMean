import express from "express";
import cliente from "../controllers/cliente.js";

const router= express.Router()

router.post("/registerCliente", cliente.registerCliente);
router.get("/listCliente", cliente.listCliente);
router.get("/findCliente/:_id", cliente.findCliente);
router.put("/updateCliente", cliente.updateCliente);
router.delete("/deleteCliente/:_id", cliente.deleteCliente);

export default router