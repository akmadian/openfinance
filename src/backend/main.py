import json
import socket

from flask import Flask, render_template, request
from integrations.TD import get_accounts, auth
from integrations.cb import get_wallets
from data.dbmanager import TransactionsDB
from data.budget import get_budget_info

app = Flask("__main__")
TransactionsDB = TransactionsDB()
categories = [
  "Disc/ Fun Stuff",
  "Disc/ Essentials",
  "Non-Disc/ Groceries",
  "SOURCE_PERSONAL_ACCOUNT",
  "PARTIAL_REIMBURSEMENT",
  "COMPLETE_REIMBURSEMENT"
]
"""
def internet_connection_exists():
  print("Checking Internet Connection...")
  try:
    socket.create_connection(("1.1.1.1", 53))
    return True
  except OSError:
    pass
  print("No Internet Connection.")
  return False

if internet_connection_exists():"""
TDSESSION = auth()
tdaccounts = get_accounts(TDSESSION)
cbwallets = get_wallets()

APP_PAYLOAD = {
  "TD": tdaccounts,
  "coinbase": cbwallets,
  "bofa": TransactionsDB.read_transactions(),
  "accounts": TransactionsDB.read_accounts(),
  "categories": categories,
  "budget_info": get_budget_info(TransactionsDB)
}
TransactionsDB.close_connection()

@app.route("/")
def my_index():
  return render_template("index.html", flask_token=str(json.dumps(APP_PAYLOAD)))

@app.route("/updatedb", methods=["POST"])
def updatedb():
  print("Recieved Post")
  TransactionsDB.open_connection()
  TransactionsDB.write_transactions(
    transactions=json.loads(request.data)["bofa"],
    overwrite=True
  )
  return "yay!"

@app.route("/gettransaction", methods=["GET"])
def gettransaction():
  TransactionsDB.open_connection()
  transaction = TransactionsDB.fetch_transaction_by_id(request.args['id'])
  return json.dumps(transaction)

@app.route("/posttransaction", methods=["POST"])
def posttransaction():
  TransactionsDB.open_connection()
  TransactionsDB.write_transactions(
    transaction=json.loads(request.data),
    overwrite=True
  )

if __name__ == "__main__":
  app.run(debug=True)