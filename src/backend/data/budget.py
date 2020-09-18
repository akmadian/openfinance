from datetime import date, timedelta, datetime
from .dbmanager import TransactionsDB

"""
category
    monthly amount

time period
    category
        transactions: [ids]
        total to date
        limit amount for month
"""

TIME_START = date.fromisoformat('2020-08-12')
WEEK_DELTA = timedelta(weeks=1)
MASTER_BUDGET = {}
time_periods_ends = []
time_periods_transactions = {
    
}
categories = {
  "Disc/ Fun Stuff": 35,
  "Disc/ Essentials": 10,
  "Non-Disc/ Groceries": 75
}

def get_budget_info(dbinstance):
    transactions = dbinstance.read_transactions()
    order_transactions(transactions)
    calc_totals()
    return MASTER_BUDGET


def get_last_dt(asStr=False):
    return date.fromisoformat(
        str(time_periods_ends[-1])
    )


def calc_totals():
    for period in time_periods_ends:
        transactions = time_periods_transactions[period]
        MASTER_BUDGET[period] = {}
        for category, limit in categories.items():
            time_period_total = 0
            added_transactions = []
            for transaction in transactions:
                if transaction[5]: # If flagged to not count in budget
                    continue
                if category in transaction[8]:
                    if len(transaction[10]) > 0: # Adjust for splits
                        split_total = split_mod_transaction_total(transaction)
                        if split_total < 0:
                            time_period_total -= split_total
                        else:
                            time_period_total += split_total
                        added_transactions.append(transaction[10])
                    else:
                        if transaction[9] < 0:
                            time_period_total -= transaction[9]
                        else:
                            time_period_total += transaction[9]
                        added_transactions.append(transaction[10])
            
            MASTER_BUDGET[period][category] = {
                'period_total': time_period_total,
                'period_limit': limit,
                'transactions': added_transactions
            }
                    

def split_mod_transaction_total(transaction):
    if len(transaction[10]) == 0:
        return transaction[9]
    else:
        amt = transaction[9]
        for split in transaction[10]:
            if 'SOURCE_PERSONAL_ACCOUNT' in split['categories'] or \
                'PARTIAL_REIMBURSEMENT' in split['categories']:
                amt -= split['amount']
            elif 'COMPLETE_REIMBURSEMENT' in split['categories']:
                amt = 0
        return amt


def order_transactions(transactions):
    if not bool(time_periods_transactions):
        time_periods_ends.append(str(TIME_START + WEEK_DELTA))
        time_periods_transactions[time_periods_ends[-1]] = []
    else:
        time_periods_ends.append(str(get_last_dt() + WEEK_DELTA))
        time_periods_transactions[time_periods_ends[-1]] = []

    transactions.reverse()
    for transaction in transactions:
        #print(str(transaction[2][:10]) + " " + str(transaction[1]))
        transaction_date = datetime.fromisoformat(transaction[2][:10])
        if transaction_date.date() > get_last_dt():
            time_periods_ends.append(str(get_last_dt() + WEEK_DELTA))
            time_periods_transactions[time_periods_ends[-1]] = [transaction]
        else:
            time_periods_transactions[str(get_last_dt())].append(transaction)

    #for key, value in time_periods_transactions.items():
    #   print(key, value)


if __name__ == '__main__':
    db = TransactionsDB()
    transactions = db.read_transactions()
    order_transactions(transactions)
    calc_totals()

    for time_period, categories in MASTER_BUDGET.items():
        print(time_period)
        for category, info in categories.items():
            print("    " + str(category))
            print("    " + str(info))
