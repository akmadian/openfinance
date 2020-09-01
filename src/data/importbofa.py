import csv
import json
from ofxtools.Parser import OFXTree

"""
statement schema: 
{
  "posted_date": string
  "ref_no": integer,
  "payee": string,
  "address": string,
  "amount": float,
  "note": string,
  "category": string,
  "account": string
  "reiumbursement": {
    "amount": float,
    "ref": {
      "no": integer,
      "ref_or_conf": "ref/conf"
    }
  }
}
"""
def collate_cc_statements(file):
  with open(file) as stmt:
    reader = csv.readr(stmt, delimiter=",")
    line_count = 0
    for row in reader:
      if line_count != 0:

      line_count += 1
