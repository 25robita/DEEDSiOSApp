import React, { Component } from 'react';
import { View, Text } from 'react-native';
import LoaderComponent from './LoaderComponent';
import SectionComponent from './SectionComponent';

class DueWorkRow extends Component {
    state = {

    }
    constructor(props) {
        super(props)
    }
    componentDidMount() {
    }
    render() {
        return (
            <SectionComponent title="due work">
                <LoaderComponent
                    state={
                        "loading"
                    }
                >

                </LoaderComponent>
            </SectionComponent>
        );
    }

}

export default DueWorkRow;