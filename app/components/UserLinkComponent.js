import React, { useContext } from "react";
import { TouchableOpacity } from "react-native";
import { ThemeContext } from "../../ThemeProvider";
import { openURL } from "../RootNavigation";
import { ContentText } from "./ContentTextComponent";
import { Meta } from "./MetaTextComponent";

function UserLinkComponent(props) {
    const { colors } = useContext(ThemeContext);

    return (
        props.userName
            ? <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                    (props.nonPressable || !props.id)
                        || openURL(`/search/user/${props.id}`)
                }}
                style={[{
                    flexDirection: 'row'
                }, props.style]}
            >
                {
                    props.textBefore
                        ? <Meta>{props.textBefore} </Meta>
                        : null
                }
                {
                    props.isMeta
                        ? <Meta
                            style={{
                                color: colors.link
                            }}
                        >
                            {props.userName}
                        </Meta>
                        : <ContentText
                            style={{
                                color: colors.link
                            }}
                        >
                            {props.userName}
                        </ContentText>
                }
                {
                    props.textAfter
                        ? <Meta>{props.textAfter} </Meta>
                        : null
                }
            </TouchableOpacity>
            : null
    );
}


export default UserLinkComponent;