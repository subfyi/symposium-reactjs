import React from 'react';
import {Input, CustomInput, Button} from 'reactstrap';
import {AuthorSelect} from "../../common/Selects";
import { Validator } from 'react-admin-base-adminkit';
import { MultiValue } from 'react-admin-base';
import { ValueValidator } from 'react-admin-base-adminkit/es/Common/Validator'

export default function AuthorSelector({ value, onChange }) {
    const onChangeOriginal = onChange;

    return <>
        <ValueValidator name="authors" type="required" value={(value || []).length ? 'a' : ''}>
            <table className="table table-striped tablo">
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
                                <td>{ index + 1 }</td>
                                <td>
                                    <Validator name="author.email" type="required">
                                        <AuthorSelect
                                            value={author.email}
                                            onChange={value => {
                                                const updateObj = {};
                                                if (value && value.first_name) {
                                                    updateObj.first_name = value.first_name;
                                                    updateObj.last_name = value.last_name;
                                                    updateObj.adress = value.adress;
                                                }

                                                updateObj.email = value && (value.email || value.label || value);
                                                onChange({ ...author, ...updateObj });
                                            }}
                                        />
                                    </Validator>
                                </td>
                                <td>
                                    <Validator name="author.first_name" type="required">
                                        <Input type="text" value={author.first_name} onChange={a => onChange({ ...author, first_name: a.currentTarget.value })}/>
                                    </Validator>
                                </td>
                                <td>
                                    <Validator name="author.last_name" type="required">
                                        <Input type="text" value={author.last_name} onChange={a => onChange({ ...author, last_name: a.currentTarget.value })}/>
                                    </Validator>
                                </td>
                                <td>
                                    <Validator name="correspond" type="required">
                                        <CustomInput
                                            id={'correspond' + index}
                                            type="radio"
                                            checked={!!author.correspond}
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
                                    </Validator>
                                </td>
                                <td>
                                    <Validator name="presenter" type="required">
                                        <CustomInput
                                            id={'presenter' + index}
                                            type="radio"
                                            checked={!!author.presenter}
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
                                    </Validator>
                                </td>
                                <td>
                                    <Button size="sm" outline color="danger"
                                            onClick={() => onChange(null)}>
                                        <i className="fa fa-trash"/>
                                    </Button>
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td colSpan="6">
                                    <Validator name="author.adress" type="required">
                                        <Input placeholder="Affiliation Adress" type="text" value={author.adress} onChange={a => onChange({ ...author, address: a.currentTarget.value })} />
                                    </Validator>
                                </td>
                            </tr>
                        </>
                    }
                </MultiValue>

                </tbody>
            </table>
        </ValueValidator>
        <Button color="primary" onClick={a => onChange((value || []).concat([{}]))}>Add Author</Button>
    </>
}