from coinbase.wallet.client import Client
import json

def get_wallets():
    with open("secrets/secrets.json") as secrets:
        data = json.load(secrets)
        client = Client(api_key=data["CB_KEY"], api_secret=data["CB_SECRET"])

    accounts = client.get_accounts()
    custom_wallet_format = []

    for coin in accounts.data:
        if float(coin['balance']['amount']) > 0:
            custom_wallet_format.append({
                "coin": coin["currency"],
                "coin_balance": coin["balance"]["amount"],
                "value": coin["native_balance"]["amount"],
                "updated_at": coin["updated_at"]
            })

    return custom_wallet_format
