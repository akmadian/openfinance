import datetime
import ofxtools
from ofxtools.Client import OFXClient, StmtRq, PROFRQ, ACCTINFOTRNRQ

client = OFXClient(
  "https://eftx.bankofamerica.com/eftxweb/access.ofx",
  userid="arimadian",
  org="HAN",
  bankid="5959",
  version=102
)
print(client.uuid)
dtstart = datetime.datetime(2020, 8, 1, tzinfo=ofxtools.utils.UTC)
dtend = datetime.datetime(2020, 8, 31, tzinfo=ofxtools.utils.UTC)
s0 = StmtRq(acctid="", accttype="CHECKING", dtstart=dtstart, dtend=dtend)
print(s0)
response = client.request_statements("", s0)
print(str(response.read()))


"""
profile = OFXClient.request_profile()
statements = OFXClient.request_statements(
  "test",

)
accounts = OFXClient.request_accounts()

print(f"PROFILE: {profile}")
print(f"STATEMENTS: {statements}")
print(f"ACCOUNTS: {accounts}")"""