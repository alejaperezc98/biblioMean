import express from "express"; // Se encarga de crear los servidores
import cors from "cors"; // Se encarga de las reglas de conecciones con el backend con los frameworks
import db from "./db/db.js"; //conección con el archivo de la bd
import dotenv from "dotenv"; //extensión para reconocer las variables de entorno
import proveedor from "./routes/proveedor.js"
import libro from "./routes/libro.js"
import cliente from "./routes/cliente.js"
dotenv.config(); //Cuando ejecuta el servidor detecte el .env y las variables estan listas para usar

const app = express();

app.use(express.json()); // OPCIONAL -> El servidor de express solo usa con json
app.use(cors()); // permite la coneccion estre el front y el back

app.use("/api/proveedor", proveedor)
app.use("/api/libro", libro)
app.use("/api/cliente", cliente)

app.listen(process.env.PORT, () => console.log("Backend server runing on port "+process.env.PORT)); // para conectarnos con un puerto

db.dbConnection();