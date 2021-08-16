import React, { Component } from 'react';
import { homepageDueWorkFailTextLabel, homepageDueWorkTitle } from '../lang';
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
            <SectionComponent
                title={homepageDueWorkTitle}
                navigatorName="Due Work"
            >
                <LoaderComponent
                    state={
                        "failed"
                    }
                    failText={homepageDueWorkFailTextLabel}
                >

                </LoaderComponent>
            </SectionComponent>
        );
    }

}

export default DueWorkRow;