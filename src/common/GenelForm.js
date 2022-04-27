import React from 'react';
import {Card, CardBody} from 'reactstrap';
import {EntityEditor} from 'react-admin-base-bootstrap';
import {Breadcrumb} from "react-admin-base-nazox";
import {useEntity} from "react-admin-base";
import {FormattedMessage} from 'react-intl';

export default function GenelForm({ name, nameKey, nameSave, newModel, url, redirect, id, children }) {
    const entity = useEntity(url, id, newModel || {});
    const [ data, setData ] = entity;

    return <Breadcrumb
        data={
            [
                {
                    href: redirect && (redirect.apply ? redirect(data) : redirect),
                    name: <FormattedMessage id={name || ''} />
                },
                redirect && {
                    href: redirect.apply ? redirect(data) : (id ? redirect + '/' + id + '/edit' : redirect + '/create'),
                    name: id ? 'Edit' : 'New'
                },
            ]
        }
    >
        <EntityEditor entity={entity}>
            <Card>
                <CardBody>
                    { children({ state: data, setState: setData }) }
                </CardBody>
            </Card>
        </EntityEditor>
    </Breadcrumb>;
}
