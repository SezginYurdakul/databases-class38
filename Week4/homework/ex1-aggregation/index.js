const { MongoClient } = require("mongodb");
const csvtojson = require("csvtojson");
const dotenv = require("dotenv");
dotenv.config();
const database = "DatabaseWeek4";
const dbCollection = "Population";
const uri=process.env.URI;
//const uri = "mongodb+srv://sezgin:sezgin@cluster0.nhg546x.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);
async function main() {
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("Connected successfully to server");
        //await createCollection(client);
        //await importData(client);
        await calculateTotalPopulationOverYear(client, 'Turkey');
        const agegroup='70-74';
        await calculateTotalPopulationForContinenet(client, 1950, agegroup)

    } catch (error) {
        console.log(error.message);
    }
    finally {
        await client.close();
    }
}
main().catch(console.dir);

const importData = async (client) => {
    const convertedData = await csvtojson().fromFile(
        "C:/Users/Sezgin/Desktop/HackYourFuture/REPOS/DatabaseClass38/databases-class38/Week4/homework/ex1-aggregation/population_pyramid_1950-2022.csv"
    );
    await client.db(database).collection(dbCollection).deleteMany();
    const result = await client
        .db(database)
        .collection(dbCollection)
        .insertMany(convertedData);
    console.log(`${result.insertedCount} records were imported to collection`)
}


const createCollection = async (client) => {

    try {
        client.db(database).createCollection(dbCollection, function (err, res) {
            if (err) console.log(err.message)
            else {
                console.log("Collection created!");
            }
        });
    } catch (error) {
        console.log(error)
    }
}

const calculateTotalPopulationOverYear = async (client, country) => {
    const pipeline = [
        {
            '$match': { 'Country': country }
        },
        {
            '$group': {
                '_id': '$Year',
                'Total_Population': {
                    '$sum': {
                        '$add': [{ '$toInt': '$M' }, { '$toInt': '$F' }]
                    }
                }
            }
        },
        {
            '$sort': { '_id': 1 }
        }
    ]
    const cursor = await client.db(database).collection(dbCollection).aggregate(pipeline);
    const results = await cursor.toArray();
    console.log(`${country}'s Population over years ___________`)
    results.forEach((result) => console.log(result));
};

const calculateTotalPopulationForContinenet = async (client, year, age) => {
    const pipeline = [
        {
            '$match': {
                'Country': {
                    '$in': [
                        'AFRICA', 'ASIA', 'EUROPE', 'LATIN AMERICA AND THE CARIBBEAN', 'NORTHERN AMERICA', 'OCEANIA'
                    ]
                },
                'Year': year,
                'Age': age
            }
        }, {
            '$addFields': {
                'TotalPopulation': {
                    '$sum': [
                        {
                            '$toInt': '$M'
                        }, {
                            '$toInt': '$F'
                        }
                    ]
                }
            }
        }
    ]
    const cursor = await client.db(database).collection(dbCollection).aggregate(pipeline);
    const results = await cursor.toArray();
    console.log(`${year}'s Population for Age group ${age} over years ___________`)
    results.forEach((result) => console.log(result));
};