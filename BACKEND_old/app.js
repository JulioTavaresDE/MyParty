// const express = require("express");
// const cors = require("cors");
// const app = express();

// app.use(cors())
// app.use(express.json())


// //DB Conection
// const conn = require("./db/conn");

// conn();

// //routes
// const routes = require("./routes/router");
//  app.use("/api", routes)


// app.listen(3000,function(){
//     console.log("Servior on line!!");
// });

// //HNXnNinZITQPkw0C



const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.use(express.json());

// DB Connection
const conn = require("./db/conn");

conn();

// Routes
const routes = require("./routes/router");

app.use("/api", routes);

app.listen(3000, function () {
  console.log("Servidor Online!");
});
