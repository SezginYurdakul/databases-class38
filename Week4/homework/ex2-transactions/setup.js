const database= "DatabaseWeek4";
const dbCollection= "Account";
const importData = async (client) => {
  try {
    client.connect();
    await client.db(database).collection(dbCollection).deleteMany();
    await client.db(database).collection(dbCollection).insertMany(accountsdata);
    console.log("Accounts` data imported successfully !!!")
  } catch (error) {
    console.error(error);
  } finally {
    client.close();
  }
};


module.exports = { importData };

const accountsdata = [
   
    { "account_number": 101,
      "balance": 20000,
      "account_changes": [
        {"change_number": 1,"amount": -4000, "date": "2020-01-02", "remark": "Payment for buying an electiric bike"}
      ]
    },
    {
      "account_number": 102,
      "balance": 30000,
      "account_changes": [
        {"change_number": 1,"amount": -15000, "date": "2020-01-03", "remark": "Payment for buying a  car"}
      ]
    }
  ]