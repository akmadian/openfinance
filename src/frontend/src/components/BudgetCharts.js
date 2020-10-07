import React, { Component } from 'react'
import { Bar } from 'react-chartjs-2'
import { Typography } from 'antd'
import Chart from 'chart.js'

const { Title } = Typography
var color = Chart.helpers.color

const chartColors = {
	red: 'rgb(255, 99, 132)',
	orange: 'rgb(255, 159, 64)',
	yellow: 'rgb(255, 205, 86)',
	green: 'rgb(75, 192, 192)',
	blue: 'rgb(54, 162, 235)',
	purple: 'rgb(153, 102, 255)',
	grey: 'rgb(201, 203, 207)'
};

/*
function generate_datasets() {
    const periods = Object.keys(window.store.getState().budget_info)
    const data = window.store.getState().budget_info
    var datasets = []
    for (period in periods) {
        const categories = Object.keys(data[periods[period]])
        var count = 0
        
    }
}*/


export default class BudgetCharts extends Component {
    render() {
        return (
            <div>
                <br/>
                <Title level={5}>Spending in Current Period</Title>
                <Bar 
                    data={{
                        labels: Object.keys(window.store.getState().budget_info).slice(-1),
                        datasets: [
                            {
                                label: 'Disc/ Ess Amt',
                                backgroundColor: color(chartColors.green).alpha(0.5).rgbString(),
                                borderColor: chartColors.green,
                                stack: '1',
                                data: Object.keys(window.store.getState().budget_info).map(period => {
                                    return window.store.getState().budget_info[period]['Disc/ Essentials'].period_total
                                })
                            },
                            {
                                label: 'Disc/ Ess Limit',
                                backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
                                borderColor: chartColors.red,
                                stack: '1',
                                data: Object.keys(window.store.getState().budget_info).map(period => {
                                    return window.store.getState().budget_info[period]['Disc/ Essentials'].period_limit
                                })
                            },
                            {
                                label: 'Disc/ Fun Amt',
                                backgroundColor: color(chartColors.green).alpha(0.5).rgbString(),
                                borderColor: chartColors.green,
                                stack: '2',
                                data: Object.keys(window.store.getState().budget_info).map(period => {
                                    return window.store.getState().budget_info[period]['Disc/ Fun Stuff'].period_total
                                })
                            },
                            {
                                label: 'Disc/ Fun Limit',
                                backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
                                borderColor: chartColors.red,
                                stack: '2',
                                data: Object.keys(window.store.getState().budget_info).map(period => {
                                    return window.store.getState().budget_info[period]['Disc/ Fun Stuff'].period_limit
                                })
                            },
                            {
                                label: 'NDisc/ Groc Amt',
                                backgroundColor: color(chartColors.green).alpha(0.5).rgbString(),
                                borderColor: chartColors.green,
                                stack: '3',
                                data: Object.keys(window.store.getState().budget_info).map(period => {
                                    return window.store.getState().budget_info[period]['Non-Disc/ Groceries'].period_total
                                })
                            },
                            {
                                label: 'NDisc/ Groc Limit',
                                backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
                                borderColor: chartColors.red,
                                stack: '3',
                                data: Object.keys(window.store.getState().budget_info).map(period => {
                                    return window.store.getState().budget_info[period]['Non-Disc/ Groceries'].period_limit
                                })
                            }
                        ]
                    }}
                    options={{
                        legend: {
                            display: false
                        },
                        scales: {
                            xAxes: [{
                                stacked: true
                            }],
                            yAxes: [{
                                stacked: true
                            }]
                        }
                    }}
                />
                <Title level={5}>Spending in Current Month</Title>
                <Bar 
                    data={{
                        labels: Object.keys(window.store.getState().budget_info).slice(-1),
                        datasets: [
                            {
                                label: 'Disc/ Ess Amt',
                                backgroundColor: color(chartColors.green).alpha(0.5).rgbString(),
                                borderColor: chartColors.green,
                                stack: '1',
                                data: Object.keys(window.store.getState().budget_info).map(period => {
                                    return window.store.getState().budget_info[period]['Disc/ Essentials'].period_total
                                })
                            },
                            {
                                label: 'Disc/ Ess Limit',
                                backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
                                borderColor: chartColors.red,
                                stack: '1',
                                data: Object.keys(window.store.getState().budget_info).map(period => {
                                    return window.store.getState().budget_info[period]['Disc/ Essentials'].period_limit
                                })
                            },
                            {
                                label: 'Disc/ Fun Amt',
                                backgroundColor: color(chartColors.green).alpha(0.5).rgbString(),
                                borderColor: chartColors.green,
                                stack: '2',
                                data: Object.keys(window.store.getState().budget_info).map(period => {
                                    return window.store.getState().budget_info[period]['Disc/ Fun Stuff'].period_total
                                })
                            },
                            {
                                label: 'Disc/ Fun Limit',
                                backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
                                borderColor: chartColors.red,
                                stack: '2',
                                data: Object.keys(window.store.getState().budget_info).map(period => {
                                    return window.store.getState().budget_info[period]['Disc/ Fun Stuff'].period_limit
                                })
                            },
                            {
                                label: 'NDisc/ Groc Amt',
                                backgroundColor: color(chartColors.green).alpha(0.5).rgbString(),
                                borderColor: chartColors.green,
                                stack: '3',
                                data: Object.keys(window.store.getState().budget_info).map(period => {
                                    return window.store.getState().budget_info[period]['Non-Disc/ Groceries'].period_total
                                })
                            },
                            {
                                label: 'NDisc/ Groc Limit',
                                backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
                                borderColor: chartColors.red,
                                stack: '3',
                                data: Object.keys(window.store.getState().budget_info).map(period => {
                                    return window.store.getState().budget_info[period]['Non-Disc/ Groceries'].period_limit
                                })
                            }
                        ]
                    }}
                    options={{
                        legend: {
                            display: false
                        },
                        scales: {
                            xAxes: [{
                                stacked: true
                            }],
                            yAxes: [{
                                stacked: true
                            }]
                        }
                    }}
                />
            </div>
        )
    }
}