import React, { Component } from 'react'
import { Select, Tag } from 'antd';

//const options = [{ value: 'gold' }, { value: 'lime' }, { value: 'green' }, { value: 'cyan' }];

function tagRender(props) {
  const { label, value, closable, onClose } = props;

  return (
    <Tag color={'gold'} closable={closable} onClose={onClose} style={{ marginRight: 3 }}>
      {label}
    </Tag>
  );
}

export default class EditableTagGroup extends Component {
    render() {
        return (
            <span>
                <Select
                    mode="multiple"
                    showArrow
                    tagRender={tagRender}
                    defaultValue={this.props.categories}
                    style={{ width: '100%' }}
                    options={
                        window.store.getState().categories.map(category => (
                            {'value': category}
                        ))
                    }
                    onChange={(value, option) => {
                        window.store.updateState((newState) => {
                            newState.bofa.filter(transaction => transaction[1] === this.props.transactionid)[0][8] = value
                        }, "update-transaction-categories"
                        )
                    }}
                />
            </span>
        )
    }
}
