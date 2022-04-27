import React from 'react';
import {Input, Button, Row, Col, CardFooter} from 'reactstrap';
import {AuthorSelect} from "../../common/Selects";
import {CheckBox, Validator} from 'react-admin-base-bootstrap';
import {MultiValue} from 'react-admin-base';
import {ValueValidator} from 'react-admin-base-bootstrap/lib/esm/Components/Validator'
import {useUser} from "../../Components/UserProvider";

export default function AuthorSelector({value, onChange}) {
    const onChangeOriginal = onChange;
    const user = useUser();

    return <>
        <ValueValidator name="authors" type="required" value={(value || []).length ? 'a' : ''}>
            <table className="table tablo">
                <thead>
                <tr>
                    <th style={{width: '5%'}}>#</th>
                    <th style={{width: '25%'}}>Mail</th>
                    <th style={{width: '25%'}}>Name</th>
                    <th style={{width: '25%'}}>Surname</th>
                    <th style={{width: '10%'}}>Correspond</th>
                    <th style={{width: '10%'}}>Presenter</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <MultiValue value={value} onChange={onChange} add={false}>
                    {
                        (author, onChange, index) => <>
                            <tr>
                                <td rowSpan="2">{index + 1}</td>
                                <td>
                                    <Validator name="author.email" type="required">
                                        <AuthorSelect
                                            value={(author.email && {
                                                first_name: author.first_name,
                                                last_name: author.last_name,
                                                email: author.email
                                            }) || null}
                                            disabled={!(user.role >= 1)}

                                            onChange={value => {
                                                const updateObj = {};
                                                if (value && value.first_name) {
                                                    updateObj.first_name = value.first_name;
                                                    updateObj.last_name = value.last_name;
                                                    updateObj.adress = value.adress;
                                                }

                                                updateObj.email = value && (value.email || value.label || value);
                                                onChange({...author, ...updateObj});
                                            }}
                                        />
                                    </Validator>
                                </td>
                                <td>
                                    <Validator name="author.first_name" type="required">
                                        <Input type="text"
                                               disabled={!(user.role >= 1)}
                                               value={author.first_name || ''} onChange={a => onChange({...author, first_name: a.currentTarget.value})}/>
                                    </Validator>
                                </td>
                                <td>
                                    <Validator name="author.last_name" type="required">
                                        <Input type="text"
                                               disabled={!(user.role >= 1)}
                                               value={author.last_name || ''} onChange={a => onChange({...author, last_name: a.currentTarget.value})}/>
                                    </Validator>
                                </td>
                                <td className="text-center">
                                    <ValueValidator name="correspond" value={value.find(a => a.correspond) || null} type="required">
                                        <CheckBox
                                            id={'correspond' + index}
                                            type="radio"
                                            checked={!!author.correspond}
                                            disabled={!(user.role >= 1)}
                                            onChange={_ => {
                                                onChangeOriginal(value.map(old => old === author ? {
                                                    ...old,
                                                    correspond: !old.correspond
                                                } : {
                                                    ...old,
                                                    correspond: false
                                                }))
                                            }}
                                        />
                                    </ValueValidator>
                                </td>
                                <td className="text-center">
                                    <ValueValidator name="presenter" value={value.find(a => a.presenter) || null} type="required">
                                        <CheckBox
                                            id={'presenter' + index}
                                            type="radio"
                                            checked={!!author.presenter}
                                            disabled={!(user.role >= 1)}
                                            onChange={_ => {
                                                onChangeOriginal(value.map(old => old === author ? {
                                                    ...old,
                                                    presenter: !old.presenter
                                                } : {
                                                    ...old,
                                                    presenter: false
                                                }))
                                            }}
                                        />
                                    </ValueValidator>
                                </td>
                                <td rowSpan="2">
                                    <Button size="sm" outline color="danger"
                                            onClick={() => onChange(null)}>
                                        <i className="fa fa-trash"/>
                                    </Button>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="5">
                                    <Validator name="author.adress" type="required">
                                        <Input placeholder="Affiliation Adress" type="text"
                                               disabled={!(user.role >= 1)}
                                               value={author.adress || ''} onChange={a => onChange({...author, adress: a.currentTarget.value})}/>
                                    </Validator>
                                </td>
                            </tr>
                        </>
                    }
                </MultiValue>

                </tbody>
            </table>
        </ValueValidator>
        <CardFooter>
            <Row>
                <Col md="3"/>
                <Col md="6">
                    <Button color="primary"
                            disabled={!(user.role >= 1)}
                            block onClick={a => onChange((value || []).concat([{}]))}>Add Author</Button>
                </Col>
            </Row>
        </CardFooter>
    </>
}
