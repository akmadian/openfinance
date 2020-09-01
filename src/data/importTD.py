from td.client import TDClient

def get_positions(TDSession):
  accounts = TDSession.get_accounts(fields=["positions"])
  investing_account = accounts[1]
  positions = []
  for position in investing_account["securitiesAccount"]["positions"]:
      pos = {
          "quantity": position["longQuantity"],
          "value": position["marketValue"],
          "instrument": position["instrument"]["symbol"],
          "pldayusd": position["currentDayProfitLoss"],
          "pldaypercent": position["currentDayProfitLossPercentage"],
      }
      positions.append(pos)

  return positions
