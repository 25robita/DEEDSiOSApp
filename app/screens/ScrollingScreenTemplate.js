import React, { useContext } from "react";
import { RefreshControl } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { ThemeContext } from "../../ThemeProvider";

export default function ScrollingScreenTemplate(props) {
    const { colors } = useContext(ThemeContext)
    return (
        <ScrollView
            style={[{
                backgroundColor: colors.background,
                minHeight: '100%',
            }, props.style]}
        >
            <RefreshControl
                onRefresh={props.onRefresh}
                tintColor={colors.neutralHighContrast}
            />
            {props.children}
        </ScrollView>
    );
}

// export default class ScrollingScreenTemplate extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {};
//     }
//     render() {
//         let customColours = Appearance.getColorScheme() == 'dark' ? coloursDark : coloursLight
//         return (
//             <ScrollView
//                 style={[{
//                     backgroundColor: customColours.background,
//                     minHeight: '100%',
//                 }, this.props.style]}
//             >
//                 <RefreshControl
//                     onRefresh={this.props.onRefresh}
//                     tintColor={customColours.neutralHighContrast}
//                 />
//                 {this.props.children}
//             </ScrollView>
//         );
//     }
// }