import React from 'react';
import './App.css';
import InvestingTab from './components/InvestingTab'
import BankingTab from './components/BankingTab'
import { Tabs, Layout, Button, Space, PageHeader, notification } from 'antd';

const { Header, Footer, Content } = Layout;
const { TabPane } = Tabs;

const openNotification = type => {
  notification[type]({
    message: type === 'success' ? 'Successfully Saved Changes!' : 'An Error Occurred When Saving...',
    description: type === 'success' ? '' : 'Oops!',
    placement: 'bottomRight'
  })
}

const headerSubtitle = key => {
  if (key === 1) return '/ Banking'
  else if (key === 2) return '/ Investing'
  else if (key === 3) return '/ Charts'
  else return ''
}

function post(event){
  console.log(window.store.getState())
  fetch("http://127.0.0.1:5000/updatedb", {
    method:"POST",
    cache: "no-cache",
    headers: {
      "content_type":"application/json"
    },
    body:JSON.stringify(window.store.getState())
  }
  ).then(response => {
    console.log(response)
    if (response.status === 200) {
      openNotification('success')
    } else if (response.status !== 200) {
      openNotification('error')
    }
  })
}

function App() {
  return (
    <div className="App">
      <Layout className="layout">
        <PageHeader
          className="site-page-header"
          title="OpenFinance"
          subTitle={headerSubtitle}
          extra={[
            <Button 
              type="primary"
              onClick={ event => post(event) }
            >
              Save Changes
            </Button>,
            <Button 
              type="primary"
              onClick={ event => console.log(window.store.getState()) }
            >
              Log Store
            </Button>
          ]}
        >
        </PageHeader>
        <Content className="content">
          <Tabs 
            defaultActiveKey="1" 
            onChange={headerSubtitle()}
            tabPosition="left"
          >
            <TabPane tab="Banking" key="1">
              <BankingTab/>
            </TabPane>
            <TabPane tab="Investing" key="2">
              <InvestingTab/>
            </TabPane>
            <TabPane tab="Charts" key="3">
              Charts
            </TabPane>
          </Tabs>
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </div>
  );
}

export default App;
