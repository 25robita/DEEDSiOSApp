import { Component } from "react";
import { ThemeContext } from "../../ThemeProvider";

class GenericScreen extends Component {
    static contextType = ThemeContext;
    constructor(props: any) {
        super(props);
    }
    render() {
        let _ = this.context.isDark;
        return this.props.children
    }
}

export default GenericScreen;