const mongoose = require("mongoose");

async function main() {
  try {
    mongoose.set("strictQuery", true);

    await mongoose.connect(
      "mongodb+srv://juliotavarescomputer:HNXnNinZITQPkw0C@cluster0.txkrs0t.mongodb.net/"
    );

    console.log("Conectado ao Banco!");
  } catch (error) {
    console.log(`Erro: ${error}`);
  }
}

module.exports = main

