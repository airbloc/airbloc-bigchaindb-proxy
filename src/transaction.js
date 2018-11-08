const cc = require('crypto-conditions');
const sha3 = require('js-sha3');
const clone = require('clone');
const driver = require('bigchaindb-driver');

function sha256Hash(data) {
    return sha3.sha3_256.create().update(data).hex();
}

/**
 * Generates Ed25519-SHA256 Fulfillment using given signature and public key.
 */
function fulfill(input, signatures) {
    const fulfillment = new cc.Ed25519Sha256();
    fulfillment.parseJson(signatures);
    input.fulfillment = fulfillment.serializeUri();
}

/**
 * Create fulfillments for transaction inputs, 
 * and generates the ID of the transaction.
 * @see https://github.com/bigchaindb/BEPs/tree/master/13
 */
function postSign(intermediateTxn, signatures) {
    const signedTx = clone(intermediateTxn);
    fulfill(signedTx.inputs[0], signatures);

    const serializedSignedTransaction = 
        driver.Transaction.serializeTransactionIntoCanonicalString(signedTx);
    signedTx.id = sha256Hash(serializedSignedTransaction);
    return signedTx;
}

module.exports = { postSign };
