import csv
import json
from ofxtools.Parser import OFXTree

"""
statement schema: 
{
  "id":int,
  "ref_no": int,
  "date": string,
  "account": int, account code,
  "isincome": bool,
  "countinbudget": bool,
  "payee": string,
  "notes": {
    "bank": string,
    "personal": string
  },
  "categories": [strings],
  "totalamount": float,
  "splits":[
    {
      "amount": float,
      "categories": [],
      "linked_transaction": int,
      "countinbudget": bool
    }
  ]
}
"""

def fetch_all_transactions():
  cc = import_cc_statement()
  acct = import_acct_statement()
  return cc + acct

def convert_acct_fitid(id):
  if "-" in id:
    return id.split("-")[0]
  else:
    return id.split(".")[0]

def convert_date_to_ISO(datestring):
  return "{}-{}-{}T{}:{}:{}Z".format(
    datestring[:4],
    datestring[4:6],
    datestring[6:8],
    datestring[8:10],
    datestring[10:12],
    datestring[12:14],
  )

def import_acct_statement():
  print("Importing BOFA Account Statement")
  parser = OFXTree()
  parser.parse("./data/stmt.qfx")
  transactions_root = parser.find(".//BANKTRANLIST")[:]
  transactions = []
  for trans in transactions_root[2:]:
    transactions.append({
      "id": 0,
      "ref_no": int(convert_acct_fitid(trans[3].text)),
      "date": convert_date_to_ISO(trans[1].text),
      "account": "BOFA_CHECKING",
      "payee": trans[4].text,
      "notes": {
        "bank": "",
        "personal": ""
      },
      "categories": [],
      "totalamount": float(trans[2].text),
      "splits": []
    })

  return transactions

def import_cc_statement():
  print("Importing BOFA CC Statement")
  parser = OFXTree()
  parser.parse("./data/currentTransaction_1626.qfx")
  transactions_root = parser.find(".//BANKTRANLIST")[:]
  id = 0
  transactions = []
  for trans in transactions_root[2:]:
    transactions.append({
      "id": id,
      "ref_no": int(trans[3].text),
      "date": convert_date_to_ISO(trans[1].text),
      "account": "BOFA_CASHREWARDS_CC",
      "payee": trans[6].text,
      "notes": {
        "bank": "",
        "personal": ""
      },
      "categories": [],
      "totalamount": float(trans[2].text),
      "splits": []
    })

  return transactions

def fetch_acct_info():
  print("Updating Account Information")
  accounts = []

  parser = OFXTree()
  parser.parse('./data/currentTransaction_1626.qfx')
  accounts.append({
    "name": "BOFA_CASHREWARDS_CC",
    "id": 2,
    "balance": parser.find(".//BALAMT").text,
    "last_updated": convert_date_to_ISO(parser.find(".//DTASOF").text)
  })

  parser.parse('./data/stmt.qfx')
  accounts.append({
    "name": "BOFA_CHECKING",
    "id": 0,
    "balance": parser.find(".//BALAMT").text,
    "last_updated": convert_date_to_ISO(parser.find(".//DTASOF").text)
  })

  return accounts


if __name__ == '__main__':
  accts = fetch_acct_info()
  for acct in accts:
    print(acct)
