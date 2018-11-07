const fs = require('fs');
const Koa = require('koa');
const TxnLib = require('./transaction');
const KoaBody = require('koa-body');
const Cottage = require('cottage');
const BigchainDB = require('bigchaindb-driver');

function postTransactions(conn) {
    return async (ctx) => {
        const { transaction, signatures } = ctx.req.body;
        const signedTx = TxnLib.postSign(transaction, signatures);
        const txReceipt = await conn.postTransactionCommit(signedTx);
        return txReceipt;
    };
}

async function main() {
    const config = JSON.parse(fs.readFileSync('config.json'));

    // connect to BigchainDB
    const conn = new BigchainDB.Connection(config.endpoint);
    try {
        await conn.getBlock(0);
    } catch (err) {
        console.error(`Failed to connect to BigchainDB at ${config.endpoint}`);
        return console.error(err.stack);
    }
    console.log('Connected to BigchainDB');

    const router = new Cottage();
    router.post('/transactions', postTransactions(conn));

    const app = new Koa();
    app.use(KoaBody());
    app.use(router.handler());

    app.listen(config.port, () => 
        console.log(`Server listening at http://localhost:${config.port}`));
}

module.exports = { main };