import React, {Component} from 'react';
import GenelList from '../../common/GenelList';

export default class List extends Component {
    render() {
        return <GenelList url="/api/kullanicilar" edit={id => `/kullanicilar/${id}/edit`} add="/kullanicilar/create">
                        <>
                            <th sort="users.name">İsim</th>
                            <th sort="users.email">Mail</th>
                            <th sort="users.role">yetki</th>
                            <th sort="users.takipcisi">takipcisi</th>
                        </>
                        {
                            row => <>
                                <td>{row.name}</td>
                                <td>{row.email}</td>
                                <td>{row.role}</td>
                                <td>{row.takipcisi}</td>
                            </>
                        }
                    </GenelList>;
    }
}