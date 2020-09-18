import sqlite3
import csv
import json
import pickle
from ofxtools.Parser import OFXTree

from .bofa import fetch_all_transactions, fetch_acct_info

class TransactionsDB:
    def __init__(self, refreshTransactions=False):
        self.dbsession = self.get_session()
        self.cursor = self.dbsession.cursor()
        
        if refreshTransactions:
            self.refresh_transactions()

    def get_session(self):
        return sqlite3.connect('transactions.db', timeout=1000)

    def refresh_transactions(self, transactions=None):
        if transactions is not None: transactions = fetch_all_transactions()
        self.write_transactions(transactions)

    def read_transactions(self):
        self.cursor.execute("SELECT * FROM TRANSACTIONS")
        rows = self.cursor.fetchall()
        imported = []
        for row in rows:
            row = list(row)
            row[7] = pickle.loads(row[7])
            row[8] = pickle.loads(row[8])
            row[10] = pickle.loads(row[10])
            imported.append(row)

        return imported

    def read_accounts(self):
        self.cursor.execute("SELECT * FROM ACCOUNTS")
        rows = self.cursor.fetchall()
        imported = [list(row) for row in rows]
        return imported

    def write_transactions(self, transactions, overwrite=False):
        if overwrite:
            print("Overwrite Flag Set, Deleting Entries...")
            self.cursor.execute("DELETE FROM TRANSACTIONS")
            self.dbsession.commit()
            print("Deleted.")

        for trans in transactions:
            ref_no = trans[0] if isinstance(transactions[0], list) else trans["ref_no"]
            if self.transaction_exists(ref_no) and overwrite is False:
                print("Found Duplicate, skipping...")
                continue
            elif overwrite:
                pass
            else:
                print("not duplicate")

            sql = f"""INSERT INTO TRANSACTIONS(id, ref_no, date_posted, account, payee, notes, categories, totalamount, splits)
                      VALUES(?,?,?,?,?,?,?,?,?)"""
            if isinstance(trans, dict):
                trans['notes'] = pickle.dumps(trans['notes'])
                trans['categories'] = pickle.dumps(trans['categories'])
                trans['splits'] = pickle.dumps(trans['splits'])
                self.cursor.execute(sql, [item[1] for item in trans.items()])
                self.dbsession.commit()
            elif isinstance(trans, list):
                if trans[8]: print(trans)
                trans[7] = pickle.dumps(trans[7])
                trans[8] = pickle.dumps(trans[8])
                trans[10] = pickle.dumps(trans[10])
                self.cursor.execute(sql, trans[0:4] + trans[6:])
                self.dbsession.commit()

    def transaction_exists(self, ref_no):
        self.cursor.execute(f"select rowid from TRANSACTIONS where ref_no = {ref_no}")
        data = self.cursor.fetchone()
        if data == 0 or data is None:
            return False
        else:
            return True

    def write_accounts(self):
        accounts = fetch_acct_info()
        delete_entries_sql = "DELETE FROM ACCOUNTS"
        self.cursor.execute(delete_entries_sql)
        for account in accounts:
            insert_sql = f"""INSERT INTO ACCOUNTS(NAME, ID, BAL, LAST_UPDATED)
                            VALUES(?,?,?,?)"""
            self.cursor.execute(insert_sql, [item[1] for item in account.items()])
        
        self.dbsession.commit()

    def fetch_transaction_by_id(self, id):
        if self.cursor is None:
            self.open_connection()

        self.cursor.execute(f"SELECT * FROM TRANSACTIONS where ref_no = {id}")
        transaction = self.cursor.fetchone()
        return transaction

    def close_connection(self):
        self.dbsession.close()
        self.cursor = None

    def open_connection(self):
        self.dbsession = self.get_session()
        self.cursor = self.dbsession.cursor()

"""
if __name__ == "__main__":
    db = TransactionsDB()
    db.write_accounts()
    
    transactions = db.read_transactions()
    for trans in transactions:
        print(trans)
    
    transactions = fetch_all_transactions()
    print(len(transactions))
    transactions.append(transactions[0])
    transactions.append(transactions[3])
    print(len(transactions))
    db.write_transactions(transactions)
    """
