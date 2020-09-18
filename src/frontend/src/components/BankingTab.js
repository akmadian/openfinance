import React, { Component } from 'react'
import EditableTagGroup from './EditableTagGroup'
import BudgetCharts from './BudgetCharts'
import { Table, Input, Checkbox, Button, Typography, Divider, Descriptions } from 'antd'
import { Row, Col } from 'antd'

import addSplit from '../utils/transactionutils'

const { Column, ColumnGroup } = Table
const { Title } = Typography

const expandedRowRender = (transaction) => {
    console.log(transaction)
    return <div>
        <Descriptions title="Transaction Details" size="small" bordered>
            <Descriptions.Item label="Bank Note">
                <Input 
                    placeholder={transaction[7].bank === "" ? "None Provided" : transaction[7].bank}
                    bordered={false}
                />
            </Descriptions.Item>
            <Descriptions.Item label="Personal Note">
                <Input 
                    placeholder={transaction[7].personal === "" ? "None Provided" : transaction[7].personal}
                    bordered={false}
                />
            </Descriptions.Item>
            <Descriptions.Item label="Reference No.">{transaction[1]}</Descriptions.Item>
            <Descriptions.Item label="Include in Budget?">
                <Checkbox></Checkbox>
            </Descriptions.Item>
        </Descriptions>
        <Button
            type="primary"
            style={{
                marginBottom: 16,
            }}
            onClick={ event => addSplit(transaction[1]) }
        >
            Add Split
        </Button>
        {transaction[10].length > 0 ? (
            <Table dataSource={transaction[10]} pagination={false}>
                <Column title="Amount" dataIndex="amount" key="amount" editable={true}
                />
                <Column title="Count In Budget?" dataIndex="countinbudget" key="amount"
                    render={value => (
                        <Checkbox checked={value}></Checkbox>
                    )}
                />
                <Column title="Categories" dataIndex="categories" key="amount"
                    render={categories => (
                        <EditableTagGroup categories={categories}/>
                    )}
                />
                <Column title="Linked Transaction" dataIndex="linked_transaction" key="amount"
                    render={linked => (
                        <a>{ linked !== null ? linked : "Link Transaction" }</a>
                    )}
                />
            </Table>
        ) : (
            <span></span>
        )}
    </div>
};

export default class BankingTab extends Component {
  render() {
    return (
      <div>
        <Title level={3}>Banking and Budgeting</Title>
        <Row>
            <Col span={17}>
                <Title level={4}>Transactions</Title>
                <Table 
                    dataSource={window.store.getState().bofa}
                    rowKey={ transaction => transaction[1] }
                    size="small"
                    pagination={{ pageSize: 50 }}
                    scroll={{ y: 1000 }}
                    expandable={{ expandedRowRender: transaction => expandedRowRender(transaction) }}
                    bordered
                >
                    <Column title="Date" dataIndex={2} key={1}
                        render={date => {
                            const d = new Date(date)
                            return d.toDateString()
                        }}
                    />
                    <Column title="Amount" dataIndex={9} key={1}
                        render={amount => (
                            <b style={{ color: amount > 0 ? 'green': 'red' }}>{amount}</b>
                        )}
                    />
                    <Column title="Account" dataIndex={3} key={1}/>
                    <Column title="Payee" dataIndex={6} key={1}/>
                    {/*
                    <ColumnGroup title="Notes">
                        <Column title="From Bank" dataIndex="bank" key="bank"/>
                        <Column title="Custom" dataIndex="personal" key="personal"/>
                    </ColumnGroup>*/}
                    <Column title="Categories" dataIndex={8} key={1}
                        render={(categories, transaction) => (
                            <EditableTagGroup categories={categories} transactionid={transaction[1]}/>
                        )}
                    />
                </Table>
            </Col>
            <Divider type="vertical"/>
            <Col span={6}>
                <Title level={4}>Accounts</Title>
                <Table dataSource={window.store.getState().accounts} size="small" bordered pagination={false}>
                    <Column title="Name" dataIndex={0} key={0}/>
                    <Column title="Balance" dataIndex={2} key={2}
                        render={balance => (
                            <b style={{ color: balance > 0 ? 'green': 'red' }}>{balance}</b>
                        )}
                    />
                    <Column title="Last Updated" dataIndex={3} key={3}
                        render={date => {
                            const d = new Date(date)
                            return d.toDateString()
                        }}
                    />
                </Table>
                <BudgetCharts/>
            </Col>
            <Col span={1}></Col>
        </Row>
      </div>
    )
  }
}