const express = require("express");
const cors = require("cors");
const router = require("./routes/router");
const bodyParser = require('body-parser');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//Body Parse
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
//cors
app.use(cors({origin:true,credentials:true}));
//rutas
app.use('/api', router);

///////////////////////////////////////////////////
const PORT = process.env.PORT||5000
app.listen(PORT, () => {
    console.log("Servidor en ejecucion:" + PORT);
});