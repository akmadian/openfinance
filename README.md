# openfinance
A free and open source personal finances program I'm making for my own personal use.

Flask backend with React frontend. Uses Ant Design React and Chart.js.

## Features
 - Importing Bank of America bank credit card and account statements.
 - Budgeting, transaction categorization and splitting, budget visualizations.
 - Importing TD Ameritrade and Coinbase account positions via their respective APIs.
 - Fetching stock news and sentiment with the Finnhub API.

## Usage
In its current state, you probably won't be able to use openfinance since it requires setting up lots of 
API keys and authentication, as well as downloading bank statements and going through the statement import process.

If, somehow, you manage to get all that set up, you then: 

**Build the frontend:**
```bash
$ cd src/frontend
$ npm i
$ npm run build
```

**Then start the Flask server with:**
```bash
$ cd src/backend
$ python main.py
```

and go to `http://127.0.0.1:5000` to see the app.

## Screenshots

