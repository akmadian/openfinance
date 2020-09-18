import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Store } from 'simple-react-store'

import 'antd/dist/antd.css'

window.news_sentiment = {
  "buzz": {
      "articlesInLastWeek": 0,
      "buzz": 0,
      "weeklyAverage": 0
  },
  "companyNewsScore": 0,
  "sectorAverageBullishPercent": 0,
  "sectorAverageNewsScore": 0,
  "sentiment": {
  "bearishPercent": 0,
  "bullishPercent": 0
  },
  "symbol": ""
}

const SAMPLE_PAYLOAD = {
  "TD": "No Internet Connection",
  "coinbase": "No Internet Connection",
  "bofa": [
    [
      0,
      202008121,
      "2020-08-12T16:00:00Z",
      "BOFA_CASHREWARDS_CC",
      null,
      null,
      "ASOS.COM ASOS.COM GA",
      {
        "bank": "",
        "personal": ""
      },
      [],
      52.4,
      [
        {
          "amount": 1,
          "categories": [],
          "linked_transaction": 123,
          "countinbudget": false
        }
      ]
    ],
    [
      0,
      202008142,
      "2020-08-14T16:00:00Z",
      "BOFA_CASHREWARDS_CC",
      null,
      null,
      "Online payment from CHK 5019",
      {
        "bank": "",
        "personal": ""
      },
      [],
      367.17,
      []
    ],
    [
      0,
      202008153,
      "2020-08-15T16:00:00Z",
      "BOFA_CASHREWARDS_CC",
      null,
      null,
      "SP * CRIMSON LOTUS TEA 206779453",
      {
        "bank": "",
        "personal": ""
      },
      [],
      -57.97,
      []
    ],
    [
      0,
      202008154,
      "2020-08-15T16:00:00Z",
      "BOFA_CASHREWARDS_CC",
      null,
      null,
      "ASOS.COM ASOS.COM GA",
      {
        "bank": "",
        "personal": ""
      },
      [],
      -139.51,
      []
    ],
    [
      0,
      202008155,
      "2020-08-15T16:00:00Z",
      "BOFA_CASHREWARDS_CC",
      null,
      null,
      "Spotify USA New York NY",
      {
        "bank": "",
        "personal": ""
      },
      [],
      -5.49,
      []
    ],
    [
      0,
      202008216,
      "2020-08-21T16:00:00Z",
      "BOFA_CASHREWARDS_CC",
      null,
      null,
      "SP * AGROTHRIVE 4086077767 CA",
      {
        "bank": "",
        "personal": ""
      },
      [],
      -4.95,
      []
    ],
    [
      0,
      202008227,
      "2020-08-22T16:00:00Z",
      "BOFA_CASHREWARDS_CC",
      null,
      null,
      "WEST SEATTLE NURSERY SESTTLE WA",
      {
        "bank": "",
        "personal": ""
      },
      [],
      -10.97,
      []
    ],
    [
      0,
      202008228,
      "2020-08-22T16:00:00Z",
      "BOFA_CASHREWARDS_CC",
      null,
      null,
      "METROPOLITAN MKT 153 SEATTLE WA",
      {
        "bank": "",
        "personal": ""
      },
      [],
      -132.95,
      []
    ],
    [
      0,
      202008269,
      "2020-08-26T16:00:00Z",
      "BOFA_CASHREWARDS_CC",
      null,
      null,
      "APPLE.COM/BILL 866-712-7753 CA",
      {
        "bank": "",
        "personal": ""
      },
      [],
      -2.99,
      []
    ],
    [
      0,
      2020082810,
      "2020-08-28T16:00:00Z",
      "BOFA_CASHREWARDS_CC",
      null,
      null,
      "WEST SEATTLE NURSERY SESTTLE WA",
      {
        "bank": "",
        "personal": ""
      },
      [],
      -9.88,
      []
    ],
    [
      0,
      2020082911,
      "2020-08-29T16:00:00Z",
      "BOFA_CASHREWARDS_CC",
      null,
      null,
      "METROPOLITAN MKT 153 SEATTLE WA",
      {
        "bank": "",
        "personal": ""
      },
      [],
      -14.29,
      []
    ],
    [
      0,
      2020082912,
      "2020-08-29T16:00:00Z",
      "BOFA_CASHREWARDS_CC",
      null,
      null,
      "G2A.COM INTERNET",
      {
        "bank": "",
        "personal": ""
      },
      [],
      -2.24,
      []
    ],
    [
      0,
      2020082913,
      "2020-08-29T16:00:00Z",
      "BOFA_CASHREWARDS_CC",
      null,
      null,
      "FOREIGN TRANSACTION FEE",
      {
        "bank": "",
        "personal": ""
      },
      [],
      -0.06,
      []
    ],
    [
      0,
      2020083114,
      "2020-08-31T16:00:00Z",
      "BOFA_CASHREWARDS_CC",
      null,
      null,
      "Online payment from CHK 5019",
      {
        "bank": "",
        "personal": ""
      },
      [],
      387.71,
      []
    ],
    [
      0,
      2020083115,
      "2020-08-31T16:00:00Z",
      "BOFA_CASHREWARDS_CC",
      null,
      null,
      "SAFEWAY #2932 SEATTLE WA",
      {
        "bank": "",
        "personal": ""
      },
      [],
      -6.41,
      []
    ],
    [
      0,
      2020083116,
      "2020-08-31T16:00:00Z",
      "BOFA_CASHREWARDS_CC",
      null,
      null,
      "LEES ASIAN RESTAURANT SEATTLE WA",
      {
        "bank": "",
        "personal": ""
      },
      [],
      -69.18,
      []
    ],
    [
      0,
      90620904500,
      "2020-09-04T12:00:00Z",
      "BOFA_CHECKING",
      null,
      null,
      "BKOFAMERICA MOBILE 09/04 3787692",
      {
        "bank": "",
        "personal": ""
      },
      [],
      500,
      []
    ],
    [
      0,
      9432090326,
      "2020-09-03T12:00:00Z",
      "BOFA_CHECKING",
      null,
      null,
      "Zelle Transfer Conf# 0d2eca0f6;",
      {
        "bank": "",
        "personal": ""
      },
      [],
      26.2,
      []
    ],
    [
      0,
      9432090371,
      "2020-09-03T12:00:00Z",
      "BOFA_CHECKING",
      null,
      null,
      "Zelle Transfer Conf# 15cb7931a;",
      {
        "bank": "",
        "personal": ""
      },
      [],
      71,
      []
    ],
    [
      0,
      90254600,
      "2020-09-02T12:00:00Z",
      "BOFA_CHECKING",
      null,
      null,
      "Redside Partners DES:WEB PMTS ID",
      {
        "bank": "",
        "personal": ""
      },
      [],
      -1226.3,
      []
    ],
    [
      0,
      96240901,
      "2020-09-02T12:00:00Z",
      "BOFA_CHECKING",
      null,
      null,
      "CKO*Patreon* Membership 09/01 PU",
      {
        "bank": "",
        "personal": ""
      },
      [],
      -3,
      []
    ],
    [
      0,
      943209027,
      "2020-09-02T12:00:00Z",
      "BOFA_CHECKING",
      null,
      null,
      "Zelle Transfer Conf# 6592e8235;",
      {
        "bank": "",
        "personal": ""
      },
      [],
      7,
      []
    ],
    [
      0,
      9025460225,
      "2020-09-02T12:00:00Z",
      "BOFA_CHECKING",
      null,
      null,
      "Bank of America DES:CASHREWARD I",
      {
        "bank": "",
        "personal": ""
      },
      [],
      25.48,
      []
    ],
    [
      0,
      94320901,
      "2020-09-01T12:00:00Z",
      "BOFA_CHECKING",
      null,
      null,
      "Online Banking transfer to CHK 3",
      {
        "bank": "",
        "personal": ""
      },
      [],
      -25,
      []
    ],
    [
      0,
      9432090118,
      "2020-09-01T12:00:00Z",
      "BOFA_CHECKING",
      null,
      null,
      "Zelle Transfer Conf# 7edda7065;",
      {
        "bank": "",
        "personal": ""
      },
      [],
      18.9,
      []
    ],
    [
      0,
      943209011181,
      "2020-09-01T12:00:00Z",
      "BOFA_CHECKING",
      null,
      null,
      "Zelle Transfer Conf# c8e17ba59;",
      {
        "bank": "",
        "personal": ""
      },
      [],
      1181.8,
      []
    ],
    [
      0,
      95720831,
      "2020-08-31T12:00:00Z",
      "BOFA_CHECKING",
      null,
      null,
      "Online Banking payment to CRD 16",
      {
        "bank": "",
        "personal": ""
      },
      [],
      -387.71,
      []
    ],
    [
      0,
      9432083169,
      "2020-08-31T12:00:00Z",
      "BOFA_CHECKING",
      null,
      null,
      "Zelle Transfer Conf# c0e65a502;",
      {
        "bank": "",
        "personal": ""
      },
      [],
      69.18,
      []
    ],
    [
      0,
      94320821132,
      "2020-08-21T12:00:00Z",
      "BOFA_CHECKING",
      null,
      null,
      "Zelle Transfer Conf# b694bbe5a;",
      {
        "bank": "",
        "personal": ""
      },
      [],
      132.96,
      []
    ],
    [
      0,
      94320820290,
      "2020-08-20T12:00:00Z",
      "BOFA_CHECKING",
      null,
      null,
      "Zelle Transfer Conf# e7938b5c2;",
      {
        "bank": "",
        "personal": ""
      },
      [],
      290.44,
      []
    ],
    [
      0,
      95720814,
      "2020-08-14T12:00:00Z",
      "BOFA_CHECKING",
      null,
      null,
      "Online Banking payment to CRD 16",
      {
        "bank": "",
        "personal": ""
      },
      [],
      -367.17,
      []
    ],
    [
      0,
      94320814,
      "2020-08-14T12:00:00Z",
      "BOFA_CHECKING",
      null,
      null,
      "Zelle Transfer Conf# 15bea4a9c;",
      {
        "bank": "",
        "personal": ""
      },
      [],
      -20,
      []
    ]
  ],
  "accounts": [
    [
      "BOFA_CASHREWARDS_CC",
      2,
      -69.18,
      "2020-09-01T07:40:52Z"
    ],
    [
      "BOFA_CHECKING",
      0,
      2460.57,
      "2020-09-07T20:47:46Z"
    ]
  ],
  "categories": [
    "Disc/ Fun Stuff",
    "Disc/ Essentials",
    "Non-Disc/ Groceries",
    "SOURCE_PERSONAL_ACCOUNT",
    "PARTIAL_REIMBURSEMENT",
    "COMPLETE_REIMBURSEMENT"
  ],
  "budget_config": {}
}

function decode(str) {
  return str.replace(/&#(\d+);/g, function(match, dec) {
    return String.fromCharCode(dec);
  });
}

function sort_payload(payload) {
  payload.bofa.sort(function(a, b){
    return new Date(b[2]) - new Date(a[2]);
  })
}

function process_payload() {
  sort_payload(JSON.parse(decode(window.token)))
  return JSON.parse(decode(window.token))
}

const store = new Store(
  process_payload()
  //SAMPLE_PAYLOAD
)
window.store = store

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
