import React, { Component } from 'react';
import { View } from 'react-native';
import { ThemeContext } from '../../ThemeProvider';
import CalendarRow from '../components/CalendarRow';
import DueWorkRow from '../components/DueWorkRow';
import NewsRow from '../components/NewsRow';
import TimetableRow from '../components/TimetableRow';
import { styles } from "../styles";
import ScrollingScreenTemplate from './ScrollingScreenTemplate';

const mainScreenData = [
    {
        name: '',
        RowComponent: TimetableRow
    },
    {
        name: '',
        RowComponent: CalendarRow
    },
    {
        name: '',
        RowComponent: NewsRow,
        props: {
            number: 3
        }
    },
    {
        name: '',
        RowComponent: DueWorkRow
    }
]

class MainScreen extends Component {
    static contextType = ThemeContext;
    state = {}
    constructor(props) {
        super(props)
        this.state = {
            componentRows: []
        }
    }
    onRefresh = () => {
        this.setState({
            componentRows: mainScreenData.map(this.renderItem)
        })
    }
    renderItem({ name, RowComponent, props }) {
        return <RowComponent
            headerName={name}
            {...props}
        />
    }
    componentDidMount = () => {
        this.setState({
            componentRows: mainScreenData.map(this.renderItem)
        })
    }
    keyExtractor(a, b) {
        return a + b
    }
    render() {
        return (
            <View style={[
                styles.container,
                {
                    backgroundColor: this.context.colors.background
                }
            ]}>
                <ScrollingScreenTemplate
                    onRefresh={this.onRefresh}
                >
                    <View style={{ padding: '5%', marginBottom: "20%" }}>
                        {
                            this.state.componentRows
                        }
                    </View>
                </ScrollingScreenTemplate>
            </View>
        );
    }

}

export default MainScreen;