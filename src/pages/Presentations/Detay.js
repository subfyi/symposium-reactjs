import React, {Component, useState} from 'react';
import {Button, ButtonGroup, Card, CardBody, CardHeader, Table} from 'reactstrap';
import Moment from 'react-moment';
import {CKEditor} from "react-admin-base-ckeditor";
import {SingleFilePicker} from "react-admin-base-adminkit";
import {useUser} from "../../Components/UserProvider";

export default function Detay({value, onSave, onChange}) {
    const [editingRow, setEditingRow] = useState();
    const user = useUser();

    return <Card>
        <CardHeader>
            <b> Questions & Answers</b>
        </CardHeader>
        <CardBody>
            <Table striped bordered>
                <thead>
                <tr>
                    <th style={{width: '30%'}}>Creator</th>
                    <th style={{width: '20%'}}>Created At</th>
                    <th style={{width: '20%'}}>Updated At</th>
                    <th style={{width: '20%'}}>Past Time</th>
                    <th style={{width: '10%'}}>Operation</th>
                </tr>
                </thead>
                <tbody>
                {
                    (value || []).map(row => <>
                        <tr>
                            <td>{(row.user && row.user.name + " " + row.user.surname) || 'You'}</td>
                            <td>{row.created_at || "Now"}</td>
                            <td>{row.updated_at || "Now"}</td>
                            <td><Moment fromNow ago>{row.created_at}</Moment></td>
                            <td className="d-flex flex-column">
                                {editingRow === row ? <ButtonGroup>
                                    <Button color="primary" onClick={a => {
                                        row.updated_at = null;
                                        setEditingRow(null);
                                        onSave();
                                    }}>Edit</Button>
                                </ButtonGroup> : <ButtonGroup>
                                    {((row.user && row.user.id == user.id) || user.role >= 8) && <Button color="warning" size="sm" onClick={a => setEditingRow(row)}>Edit</Button>}
                                </ButtonGroup>}
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="5">
                                {(row.dosyalar || []).map(dosya => <div className="mt-1 mb-1"><SingleFilePicker value={dosya.dosya} disabled noThumb/></div>)}

                                {editingRow === row ? <>
                                    <CKEditor
                                        value={(row.initialData || (row.initialData = row.isicerik)) || ""}
                                        onChange={a => {
                                            row.isicerik = a;
                                        }}
                                    />
                                </> : <div className="icerik-alani" dangerouslySetInnerHTML={{__html: row.isicerik}}/>}
                            </td>
                        </tr>
                    </>)
                }
                </tbody>
            </Table>
            <Button className="col-md-12" color="primary" onClick={a => {
                if (editingRow) {
                    editingRow.updated_at = null;
                    setEditingRow(null);
                    onSave();
                    return;
                }

                var obj = {};

                onChange((value || []).concat([obj]));
                setEditingRow(obj);
            }}>{editingRow ? 'Save' : 'Add New'}</Button>
        </CardBody>
    </Card>
}
