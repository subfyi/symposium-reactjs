import React from 'react';
import {Card, CardBody} from 'reactstrap';
import {EntityEditor} from 'react-admin-base-bootstrap';
import {Breadcrumb} from "react-admin-base-front";
import {useEntity} from "react-admin-base";
import {FormattedMessage} from 'react-intl';
import {Redirect} from "react-router-dom";

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
        { redirect && data && data.id && +id !== +data.id && <Redirect to={redirect.apply ? redirect(data) : redirect + "/" + data.id + "/edit"}/> }
        <EntityEditor entity={entity}>
            <Card>
                <CardBody>
                    { children({ state: data, setState: setData }) }
                </CardBody>
            </Card>
        </EntityEditor>
    </Breadcrumb>;
}
