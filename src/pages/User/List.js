import {BootstrapTable, Actions, ActionsColumn, Column, IdColumn} from 'react-admin-base-bootstrap';
import React from 'react';
import {Breadcrumb} from "react-admin-base-front";
import {Card, CardBody} from "reactstrap";
import {useUser} from "../../Components/UserProvider";

export default function ProductTypeList() {
    const user = useUser();


    return <Breadcrumb
        title="Kullanıcı Listesi"
        data={
            [
                {
                    href: '/user',
                    name: 'Kullanıcı Listesi'
                }
            ]
        }
    >
        <Card>
            <CardBody>
                <BootstrapTable url="/api/user" add="/user/create">
                    <thead>
                    <tr>
                        <IdColumn/>
                        <Column sort="first_name">Adı</Column>
                        <Column sort="last_name">Soyadı</Column>
                        <Column sort="email">Mail Adresi</Column>
                        <ActionsColumn/>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        row => <tr key={row.id}>
                            <td className="min text-center">{row.id}</td>
                            <td>{row.name}</td>
                            <td>{row.surname}</td>
                            <td>{row.email}</td>
                            <Actions
                                edit={"/user/" + row.id + "/edit"}
                                del={"/user/" + row.id}
                            />
                        </tr>
                    }
                    </tbody>
                </BootstrapTable>
            </CardBody>
        </Card>
    </Breadcrumb>;
}
