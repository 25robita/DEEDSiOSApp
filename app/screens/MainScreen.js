import React, { Component } from 'react';
import { View } from 'react-native';
import { Appearance } from 'react-native-appearance';
import { ThemeContext } from '../../ThemeProvider';
import { coloursDark, coloursLight } from '../colours';
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
    }
    onRefresh = () => {
        this.setState({})
    }
    componentDidMount = () => {
        setTimeout(_ => {
            // this.props.navigation.navigate("Homepage", { code: "8-0860-F" })
        }, 1000)
    }
    renderItem({ name, RowComponent, props }) {
        return <RowComponent
            headerName={name}
            {...props}
        />
    }
    keyExtractor(a, b) {
        return a + b
    }
    render() {

        let customColours = Appearance.getColorScheme() == 'dark' ? coloursDark : coloursLight
        return (
            <View style={[
                styles.container,
                {
                    backgroundColor: customColours.background
                }
            ]}>
                <ScrollingScreenTemplate
                    onRefresh={this.onRefresh}
                >
                    <View style={{ padding: '5%', marginBottom: "20%" }}>
                        {
                            mainScreenData.map(this.renderItem)
                        }
                    </View>
                </ScrollingScreenTemplate>
            </View>
        );
    }

}

export default MainScreen;