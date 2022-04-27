import React, {useCallback, useReducer, useState} from 'react';
import {Alert, Card, CardBody, Col, Form, FormGroup, Input, Label, Row} from 'reactstrap';
import { useAuth, ValidatorProvider } from 'react-admin-base';
import {Validator, LoadingButton} from "react-admin-base-bootstrap";
import {FormattedMessage} from "react-intl";
import Layout from "react-admin-base-nazox/lib/esm/Auth/Layout";

export default function Register() {
    const [ api ] = useAuth();

    const [ data, setData ] = useReducer((a, b) => ({ ...a, ...b }), {});

    const [ password2, setPassword2] = useState('');

    const [ loading, setLoading] = useState(false);
    const [ error, setError ] = useState(null);

    const handleSubmit = useCallback(async function(e) {
        e.preventDefault();

        if (loading)
            return false;

        setError(null);
        setLoading(true);
        try {
            await api.free.post('/api/register', data);
            await api.log_in(data.email, data.password);
        } catch(e) {
            setError(e);
        } finally {
            setLoading(false);
        }
    }, [api, data, setError, loading]);

    return <Layout>
        <p className="text-center mb-4">Register</p>

        <Card>
            <CardBody>
                <ValidatorProvider>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label>Name</Label>
                                    <Validator type="required">
                                        <Input
                                            type="text"
                                            value={data.name || ''}
                                            onChange={a => setData({ name: a.currentTarget.value })}
                                            disabled={loading}
                                        />
                                    </Validator>
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label>Surname</Label>
                                    <Validator type="required">
                                        <Input
                                            type="text"
                                            value={data.surname || ''}
                                            onChange={a => setData({ surname: a.currentTarget.value })}
                                            disabled={loading}
                                        />
                                    </Validator>
                                </FormGroup>
                            </Col>
                        </Row>

                        <FormGroup>
                            <Label><FormattedMessage id="EMAIL" /></Label>
                            <Validator type="required|email">
                                <Input
                                    type="text"
                                    value={data.email || ''}
                                    label="Email"
                                    onChange={a => setData({ email: a.currentTarget.value })}
                                    disabled={loading}
                                    autoComplete="username"
                                />
                            </Validator>
                        </FormGroup>
                        <FormGroup>
                            <Label><FormattedMessage id="PASSWORD" /></Label>
                            <Validator type="required">
                                <Input
                                    type="password"
                                    value={data.password || ''}
                                    onChange={a => setData({ password: a.currentTarget.value })}
                                    disabled={loading}
                                    autoComplete="new-password"
                                />
                            </Validator>
                        </FormGroup>
                        <FormGroup>
                            <Label><FormattedMessage id="PASSWORD_REPEAT" /></Label>
                            <Validator type={["required", { in: data.password || '' }]}>
                                <Input
                                    type="password"
                                    value={password2 || ''}
                                    onChange={a => setPassword2(a.currentTarget.value) || setError(null)}
                                    disabled={loading}
                                    autoComplete="new-password"
                                />
                            </Validator>
                        </FormGroup>
                        { error && <Alert color="danger" toggle={a => setError(null)}>{ error.message }</Alert> }
                        <div className="text-center mt-4">
                            <LoadingButton block type="submit"  size="lg" color="primary" loading={loading}><FormattedMessage id="Submit" /></LoadingButton>
                        </div>
                    </Form>
                </ValidatorProvider>
            </CardBody>
        </Card>
    </Layout>;
}
