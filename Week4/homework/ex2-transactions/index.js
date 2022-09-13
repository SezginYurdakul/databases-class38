const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();
const client = new MongoClient(process.env.URI);
const { importData } = require("./setup.js");
const { moneyTransaction } = require("./transfer.js");

async function main() {
    try {
        await client.connect();
        console.log("Connection is successfull!!")
        await importData(client);
        await moneyTransaction(101, 102, 150000, "Service invoice");
    } catch (error) {
        console.error(error);
    } finally {
        client.close();
    }
};

main();