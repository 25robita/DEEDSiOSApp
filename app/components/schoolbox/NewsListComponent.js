import React from 'react';
import { Component } from 'react/cjs/react.production.min';
import { customColours } from '../../colours';
import { NewsList } from '../NewsRow';
import SchoolboxComponent from './SchoolboxComponent';

export class SchoolboxNewsList extends Component {
    constructor(props) {
        super(props)
        this.state = { url: "" }
    }
    componentDidMount = () => {
        this.setState({
            url: `/news/lists/folder/${this.props.homepage}?c=0&l=10&hp=1&cid=${this.props.cid}`
        })
    }
    render() {
        return <SchoolboxComponent
            collapsed={this.props.collapsed}
            title={this.props.title}
            contentStyle={{ backgroundColor: customColours.contentBackground }}
        >
            {
                this.state.url
                    ? <NewsList
                        url={this.state.url}
                    />
                    : null
            }
        </SchoolboxComponent>

    }
}