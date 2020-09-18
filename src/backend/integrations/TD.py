from td.client import TDClient
import json

def auth():
  client_id = None
  with open("secrets/secrets.json") as secrets:
    data = json.load(secrets)
    client_id = data["TD_CLIENT"]

  TDSession = TDClient(
    client_id=client_id,
    redirect_uri='http://localhost',
    credentials_path='secrets/TD_CREDENTIALS'
  )
  TDSession.login()

  return TDSession


def get_accounts(session):
  accounts = session.get_accounts(fields=["positions"])
  accounts_out = {
    "trading": {
      "positions": []
    },
    "investing": {
      "positions": []
    }
  }

  for account in accounts:
    with open("secrets/secrets.json") as secrets:
      data = json.load(secrets)
      TD_TRADING_ACCT_NO = data["TD_TRADING_ACCT_NO"]

    for position in account["securitiesAccount"]["positions"]:
      pos = {
          "quantity": position["longQuantity"],
          "value": position["marketValue"],
          "instrument": position["instrument"]["symbol"],
          "pldayusd": position["currentDayProfitLoss"],
          "pldaypercent": position["currentDayProfitLossPercentage"],
      }
      if account["securitiesAccount"]["accountId"] == TD_TRADING_ACCT_NO:
        accounts_out["trading"]["positions"].append(pos)
      else:
        accounts_out["investing"]["positions"].append(pos)

  return accounts_out

