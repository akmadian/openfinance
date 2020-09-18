import React, { Component } from 'react'
import { Table, Typography, Col, Button } from 'antd'
import StockNews from './StockNews'

import BTCIcon from 'cryptocurrency-icons/svg/color/btc.svg'
import ETHIcon from 'cryptocurrency-icons/svg/color/eth.svg'
import LTCIcon from 'cryptocurrency-icons/svg/color/ltc.svg'
import XRPIcon from 'cryptocurrency-icons/svg/color/xrp.svg'


const cryptoicons = {
  'BTC': BTCIcon,
  'ETH': ETHIcon,
  'LTC': LTCIcon,
  'XRP': XRPIcon
}

const { Column, ColumnGroup } = Table
const { Title } = Typography

export default class InvestingTab extends Component {
  state = { newsVisible: false, newsTicker: ""}
  showNews = (ticker) => {
    this.setState({
      newsVisible:true,
      newsTicker: ticker
    })
  }

  render() {
    return (
      <div>
        <Title level={3}>TD Ameritrade</Title>
        <Table
          dataSource={window.store.getState().TD.investing.positions} 
          size="small"
          pagination={false}
        >
          <Column title="Ticker" dataIndex="instrument" key="instrument"/>
          <Column title="Quantity" dataIndex="quantity" key="instrument"/>
          <Column title="Value" dataIndex="value" key="instrument"/>
          <ColumnGroup title="P/L Day">
            <Column title="$" dataIndex="pldayusd" key="instrument"
              render={amount => (
                <b style={
                  { color: (amount) => {
                    if (amount === 0) {
                      return 'black'
                    } else { return amount > 0 ? 'green': 'red' }
                  }}
                }>${amount}</b>
              )}
            />
            <Column title="%" dataIndex="pldaypercent" key="instrument"
              render={amount => (
                <b style={
                  { color: (amount) => {
                    if (amount === 0) {
                      return 'black'
                    }
                    else { return amount > 0 ? 'green': 'red' }
                  }}
                }>{amount}%</b>
              )}
            />
          </ColumnGroup>
          <Column title="News"
            render={(__, position) => (
              <Button onClick={event => this.showNews(position.instrument)}>
                Fetch News
              </Button>
            )}
          />
        </Table>
        <Table
          dataSource={window.store.getState().TD.trading.positions} 
          size="small"
          pagination={false}
        >
          <Column title="Ticker" dataIndex="instrument" key="instrument"/>
          <Column title="Quantity" dataIndex="quantity" key="instrument"/>
          <Column title="Value" dataIndex="value" key="instrument"/>
          <ColumnGroup title="P/L Day">
            <Column title="$" dataIndex="pldayusd" key="instrument"
              render={amount => (
                <b style={
                  { color: (amount) => {
                    if (amount === 0) {
                      return 'black'
                    } else { return amount > 0 ? 'green': 'red' }
                  }}
                }>${amount}</b>
              )}
            />
            <Column title="%" dataIndex="pldaypercent" key="instrument"
              render={amount => (
                <b style={
                  { color: (amount) => {
                    if (amount === 0) {
                      return 'black'
                    }
                    else { return amount > 0 ? 'green': 'red' }
                  }}
                }>{amount}%</b>
              )}
            />
          </ColumnGroup>
        </Table>
        <Title level={3}>Coinbase</Title>
        <Table 
          dataSource={window.store.getState().coinbase} 
          size="small" 
          pagination={false}
        >
          <Column title="Currency" dataIndex="coin"
            render={coin => (
              <span>
              <img src={cryptoicons[coin]}/> {coin}
              </span>
            )}
          />
          <Column title="Quantity" dataIndex="coin_balance"/>
          <Column title="Value" dataIndex="value"/>
        </Table>
        <StockNews ticker={this.state.newsTicker} visible={this.state.newsVisible}/>
      </div>
    )
  }
}