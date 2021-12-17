import React from 'react';
import { renderHTMLText } from '../../renderHTML';
import { ContentText } from '../ContentTextComponent';
import SchoolboxComponent from './SchoolboxComponent';

export default function SchoolboxTextBox(props) {
    return <SchoolboxComponent
        collapsed={props.collapsed}
        title={props.title}
    >
        <ContentText>
            {renderHTMLText(props.content)}
        </ContentText>
    </SchoolboxComponent>
}