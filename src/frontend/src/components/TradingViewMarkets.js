import React, { Component, Fragment } from 'react'

const TVEmbed = `<div class="tradingview-widget-container">
<div class="tradingview-widget-container__widget"></div>
<div class="tradingview-widget-copyright"><a href="https://www.tradingview.com/markets/indices/" rel="noopener" target="_blank"><span class="blue-text">Indices</span></a>, <a href="https://www.tradingview.com/markets/futures/" rel="noopener" target="_blank"><span class="blue-text">Commodities</span></a> <span class="blue-text">and</span> <a href="https://www.tradingview.com/markets/currencies/" rel="noopener" target="_blank"><span class="blue-text">Forex</span></a> by TradingView</div>
<script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js" async>
{
"colorTheme": "dark",
"dateRange": "12M",
"showChart": true,
"locale": "en",
"width": "100%",
"height": "100%",
"largeChartUrl": "",
"isTransparent": true,
"plotLineColorGrowing": "rgba(25, 118, 210, 1)",
"plotLineColorFalling": "rgba(25, 118, 210, 1)",
"gridLineColor": "rgba(42, 46, 57, 1)",
"scaleFontColor": "rgba(120, 123, 134, 1)",
"belowLineFillColorGrowing": "rgba(33, 150, 243, 0.12)",
"belowLineFillColorFalling": "rgba(33, 150, 243, 0.12)",
"symbolActiveColor": "rgba(33, 150, 243, 0.12)",
"tabs": [
    {
    "title": "Indices",
    "symbols": [
        {
        "s": "AMEX:SPY",
        "d": "S&P 500"
        },
        {
        "s": "TVC:DJI"
        },
        {
        "s": "FOREXCOM:SPXUSD"
        },
        {
        "s": "FOREXCOM:NSXUSD"
        }
    ],
    "originalTitle": "Indices"
    },
    {
    "title": "Commodities",
    "symbols": [
        {
        "s": "CME_MINI:ES1!",
        "d": "S&P 500"
        },
        {
        "s": "CME:6E1!",
        "d": "Euro"
        },
        {
        "s": "COMEX:GC1!",
        "d": "Gold"
        },
        {
        "s": "NYMEX:CL1!",
        "d": "Crude Oil"
        },
        {
        "s": "NYMEX:NG1!",
        "d": "Natural Gas"
        },
        {
        "s": "CBOT:ZC1!",
        "d": "Corn"
        }
    ],
    "originalTitle": "Commodities"
    },
    {
    "title": "Forex",
    "symbols": [
        {
        "s": "FX:EURUSD"
        },
        {
        "s": "FX:GBPUSD"
        },
        {
        "s": "FX:USDJPY"
        },
        {
        "s": "FX:USDCHF"
        },
        {
        "s": "FX:AUDUSD"
        },
        {
        "s": "FX:USDCAD"
        }
    ],
    "originalTitle": "Forex"
    }
]
}
</script>
</div>`

export default class TradingViewMarkets extends Component {
    render() {
        return (
            <div dangerouslySetInnerHTML={{__html: TVEmbed}}></div>
        )
    }
}