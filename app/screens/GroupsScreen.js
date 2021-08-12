import React from "react";
import { View } from "react-native";
import { Component } from "react/cjs/react.production.min";
import LinksList from "../components/LinksList";
import LoaderComponent from "../components/LoaderComponent";
import { fetchHTMLResource } from "../getters/get";
import ScrollingScreenTemplate from "./ScrollingScreenTemplate";


class GroupsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { items: [], loaded: false, failed: false };
    }
    componentDidMount = () => {
        this.setState({ items: [], loaded: false })
        fetchHTMLResource("/")
            .then(d => {
                let items = d
                    .querySelectorAll("#side-menu-mygroups li a")
                    .map(item => {
                        return {
                            text: item.text,
                            href: item.attributes.href,

                        }
                    });
                this.setState({ items, loaded: true })
            }, _ => {
                this.setState({ failed: true })
            })
    }
    render() {
        return (
            <ScrollingScreenTemplate
                onRefresh={this.componentDidMount}
            >
                <LoaderComponent
                    state={this.state.loaded ? "loaded" : (this.state.failed ? "failed" : "loading")}
                    failText="Unable to load your classes"
                >
                    {
                        this.state.loaded
                            ? <LinksList
                                icon='group'
                                data={this.state.items}
                            />
                            : null
                    }
                </LoaderComponent>
            </ScrollingScreenTemplate>
        );
    }
}

export default GroupsScreen;