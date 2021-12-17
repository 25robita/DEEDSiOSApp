import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../../ThemeProvider';
import { NewsList } from '../NewsRow';
import SchoolboxComponent from './SchoolboxComponent';
export function SchoolboxNewsList(props) {
    let [url, setUrl] = useState("");

    useEffect(() => {
        setUrl(`/news/lists/folder/${props.homepage}?c=0&l=10&hp=1&cid=${props.cid}`)
    }, [])

    const { colors: customColours } = useContext(ThemeContext)

    return <SchoolboxComponent
        collapsed={props.collapsed}
        title={props.title}
        contentStyle={{ backgroundColor: customColours.contentBackground }}
    >
        {
            url
                ? <NewsList
                    url={url}
                />
                : null
        }
    </SchoolboxComponent>
}