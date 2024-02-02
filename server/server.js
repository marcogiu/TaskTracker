const express = require("express");
const app = express();
const port = 3000;

// Definisci una route di base
app.get("/", (req, res) => {
  res.send("Benvenuto nel tuo backend con Node.js!");
});

// Avvia il server sulla porta specificata
app.listen(port, () => {
  console.log(`Il server è in ascolto sulla porta ${port}`);
});
