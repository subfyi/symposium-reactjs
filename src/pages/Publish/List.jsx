import React, {Component} from 'react';
import GenelList from '../../components/GenelList';

export default class List extends Component {
    render() {
        return <GenelList
            url="/api/typepublish"
            add="/typepublish/create"
            edit={id => `/typepublish/${id}/edit`}
            {...this.props}>
            <>
                <th>active</th>
                <th>type</th>
                <th>name</th>
            </>
            {
                row => <>
                    <td>{row.active ? 'Yes' : 'No'}</td>
                    <td>{row.lang.name}</td>
                    <td>{row.name}</td>
                </>
            }
        </GenelList>;
    }
}

