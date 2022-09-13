const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();
const client = new MongoClient(process.env.URI);
const database = "DatabaseWeek4";
const dbCollection = "Account";


const moneyTransaction = async (senderAccountNumber, receiverAccountNumber, amount, message) => {
    await client.connect();
    const accountCollection = client.db(database).collection(dbCollection);
    const session = client.startSession();
    try {
        await session.withTransaction(async () => {
            const senderAccount = await accountCollection.findOne({
                account_number: senderAccountNumber,
            });

            if (senderAccount.balance < amount) {
                console.error(`Account: ${senderAccountNumber}'s balance is not sufficent for transfer of ${amount} `);
                return;
            }


            await accountCollection.updateOne(
                { account_number: senderAccountNumber },
                {
                    $inc: { balance: -amount },
                    $push: {
                        account_changes: {
                            change_number: await createChange_Number(accountCollection, senderAccountNumber),
                            amount: -amount,
                            date: new Date(),
                            remark: message,
                        },
                    },
                },
                { session }
            );
            await accountCollection.updateOne(
                { account_number: receiverAccountNumber },
                {
                    $inc: { balance: -amount },
                    $push: {
                        account_changes: {
                            change_number: await createChange_Number(accountCollection, receiverAccountNumber),
                            amount: amount,
                            date: new Date(),
                            remark: message,
                        },
                    },
                },
                { session }
            );
            console.log(`Transaction SUCCESSFUL :)`)
        });
    } catch (error) {
        await session.abortTransaction();
        console.log("Money transfer NOT SUCCESSFUL :(")
        console.log(error);
    } finally {
        await session.endSession();
        client.close();
    }
};


async function createChange_Number(accountCollection, account_no) {
    try {
        const result = await accountCollection.findOne({ account_number: account_no });
        if (result.account_changes.length > 0) {
            return result.account_changes.length + 1;
        }
        return 1;
    } catch (error) {
        console.error(error);
    }
};

module.exports = { moneyTransaction };