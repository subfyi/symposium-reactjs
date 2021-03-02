
import React from 'react';
import {Card,Table,Input,CustomInput} from 'reactstrap';


export default function PropertySelector({ product_type, value, onChange }) {
    if (!product_type)
        return null;

    const selected_ids = (value || []).map(a => a.attribute.id);

    return <>
        <Validator name="authors" type="required" value={(controller.state.authors || []).length ? 'a' : ''} controller={controller}>
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
                {(controller.state.authors || []).map((author, index) => <>
                    <tr>
                        <td>{index + 1}</td>
                        <td>
                            <Validator name="author.p_mail" type="required" value={author.p_mail} controller={controller}>
                                <AuthorSelect
                                    selected={author.p_mail}
                                    onChange={value => {
                                        if (value && value.name) {
                                            author.name = value.name;
                                            author.surname = value.surname;
                                            author.adress = value.adress;
                                        }

                                        author.p_mail = value && (value.p_mail || value.label || value);
                                        this.forceUpdate();
                                    }}
                                />
                            </Validator>
                        </td>
                        <td>
                            <Validator name="author.name" type="required" value={author.name} controller={controller}>
                                <Input type="text" value={author.name} onChange={a => {
                                    author.name = a.currentTarget.value;
                                    this.forceUpdate();
                                }}/>
                            </Validator>
                        </td>
                        <td>
                            <Validator name="author.surname" type="required" value={author.surname} controller={controller}>
                                <Input type="text" value={author.surname} onChange={a => {
                                    author.surname = a.currentTarget.value;
                                    this.forceUpdate();
                                }}/>
                            </Validator>
                        </td>
                        <td>
                            <Validator name="correspond" type="required"
                                       value={(controller.state.authors || []).find(a => a.correspond) ? 'ok' : ''}
                                       controller={controller}>
                                <CustomInput
                                    id={'correspond' + index}
                                    type="radio"
                                    checked={!!author.correspond}
                                    onChange={_ => {
                                        author.correspond = !author.correspond;

                                        if (author.correspond) {
                                            for (let _author of controller.state.authors) {
                                                if (author !== _author) {
                                                    _author.correspond = false;
                                                }
                                            }
                                        }

                                        this.forceUpdate();
                                    }}
                                />
                            </Validator>
                        </td>
                        <td>
                            <Validator name="presenter" type="required"
                                       value={(controller.state.authors || []).find(a => a.presenter) ? 'ok' : ''}
                                       controller={controller}>
                                <CustomInput
                                    id={'presenter' + index}
                                    type="radio"
                                    checked={!!author.presenter}
                                    onChange={_ => {
                                        author.presenter = !author.presenter;

                                        if (author.presenter) {
                                            for (let _author of controller.state.authors) {
                                                if (author !== _author) {
                                                    _author.presenter = false;
                                                }
                                            }
                                        }

                                        this.forceUpdate();
                                    }}
                                />
                            </Validator>
                        </td>
                        <td>
                            <Button size="sm" outline color="danger"
                                    onClick={_ => controller.setState({authors: controller.state.authors.filter(a => a !== author)})}>
                                <i className="fa fa-trash"/>
                            </Button>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td colSpan="6">
                            <Validator name="author.adress" type="required" value={author.adress} controller={controller}>
                                <Input placeholder="Affiliation Adress" type="text" value={author.adress} onChange={a => {
                                    author.adress = a.currentTarget.value;
                                    this.forceUpdate();
                                }}/>
                            </Validator>
                        </td>
                    </tr>
                </>)}
                </tbody>
            </table>
        </Validator>
        <Button color="primary" onClick={a => controller.setState({authors: (controller.state.authors || []).concat([{}])})}>Add
            Author</Button>
    </>
}
