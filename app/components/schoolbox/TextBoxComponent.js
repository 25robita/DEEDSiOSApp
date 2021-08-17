import { ContentText } from '../ContentTextComponent';
import SchoolboxComponent from './SchoolboxComponent';
import { renderHTMLText } from '../../renderHTML';
import React from 'react';

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