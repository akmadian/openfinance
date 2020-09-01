from flask import Flask, render_template
from td.client import TDClient
from data.importTD import get_positions
import csv

app = Flask(__name__)
TDSession = TDClient(
  client_id='',
  redirect_uri='http://localhost',
  credentials_path='<PATH_TO_CREDENTIALS_FILE>'
)
TDSession.login()

def load_transactions():
  transactions = []
  with open('userdata/stmt.csv') as stmt:
    reader = csv.reader(stmt, delimiter=",")
    line = 0
    for row in reader:
      if line >= 8:
        transactions.append(row)
      line += 1

  return transactions

@app.route("/")
def home():
  return render_template(
    "index.html", 
    Transactions=load_transactions(),
    Positions=get_positions(TDSession)
  )

if __name__ == "__main__":
  app.run()