import { Component } from 'react/cjs/react.production.min';
import SchoolboxComponent from './SchoolboxComponent';
import { UserList } from '../UserListComponent';
import React from 'react';

export default class SchoolboxUserList extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        return <SchoolboxComponent
            title={this.props.title}
            collapsed={this.props.collapsed}
            contentStyle={{
                padding: 0
            }}
        >
            <UserList
                users={this.props.users}
            />
        </SchoolboxComponent>
    }
}