export default function addSplit(transactionid) {
    window.store.updateState((newState) => {
        newState.bofa.filter(transaction => transaction[1] === transactionid)[0][10]
        .push({
            "amount": 1,
            "categories": [],
            "linked_transaction": null,
            "countinbudget": true
        })
    })
}