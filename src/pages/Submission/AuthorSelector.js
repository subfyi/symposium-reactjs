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
                                    <AuthorSelect
                                        email={author.email}
                                        value={(author.email && {
                                            first_name: author.first_name,
                                            last_name: author.last_name,
                                            email: author.email
                                        }) || null}
                                        onChange={a => onChange({ value: a })}
                                    />
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
                                    <ValueValidator name="correspond" value={value.find(a => a.correspond) || null} type="required">
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
                                    </ValueValidator>
                                </td>
                                <td>
                                    <ValueValidator name="presenter" value={value.find(a => a.presenter) || null} type="required">
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
                                    </ValueValidator>
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
