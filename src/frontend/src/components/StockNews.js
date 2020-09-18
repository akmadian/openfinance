import React, { Component } from 'react'
import { List, Drawer, Descriptions, Divider, Button } from 'antd'
import moment from 'moment'

async function fetchNews(ticker){
    let date = moment().format("YYYY-MM-DD")
    let weekago = moment().subtract(1, 'week').format("YYYY-MM-DD")
    let query = `https://finnhub.io/api/v1/company-news?symbol=${ticker}&from=${weekago}&to=${date}&token=MISSING`
    let response = await fetch(query)
    await response.json().then(result => {
        window.news = result
    }).then(_ => {
        fetchSentiment(ticker)
    })
}

async function fetchSentiment(ticker){
    let query = `https://finnhub.io/api/v1/news-sentiment?symbol=${ticker}&token=MISSING`
    let response = await fetch(query)
    return await response.json().then(result => {
        window.news_sentiment = result
    })
}

export default class StockNews extends Component {
    showDrawer = () => {
        this.props.visible = true
    };
    
    onClose = () => {
        this.props.visible = false
    };

    constructor(props) {
        super(props)
        fetchNews(props.ticker)
    }

    render() {
        return (
            <span>
            {window.news_sentiment !== undefined ? (
            <Drawer
                title={"News for " + this.props.ticker}
                visible={this.props.visible}
                closable={true}
                onClose={this.onClose}
                width={700}
            >
                <Descriptions title="Sentiment" size="small" bordered>
                    <Descriptions.Item label="Articles in Last Week">{window.news_sentiment.buzz.articlesInLastWeek}</Descriptions.Item>
                    <Descriptions.Item label="Average Articles in Week">{window.news_sentiment.buzz.weeklyAverage}</Descriptions.Item>
                    <Descriptions.Item label="Sector Average Bullish Percent">{window.news_sentiment.sectorAverageNewsPercent}</Descriptions.Item>
                    <Descriptions.Item label="Bearish">{window.news_sentiment.sentiment.bearishPercent}</Descriptions.Item>
                    <Descriptions.Item label="Bullish">{window.news_sentiment.sentiment.bullishPercent}</Descriptions.Item>
                </Descriptions>
                <Divider />
                <List
                    itemLayout="vertical"
                    size="large"
                    dataSource={window.news}
                    renderItem={article => (
                        <List.Item key={article.id}>
                            <List.Item.Meta
                                title={<p>[{article.source}] - <a href={article.url}>{article.headline}</a></p>}
                                description={article.summary}
                            />
                        </List.Item>
                    )}
                />
            </Drawer>
            ) : (
                <span></span>
            )
            }
            </span>
        )
    }
}