import React, {Component} from 'react';
import {FormattedMessage} from 'react-intl';
import {Actions, ActionsColumn, BootstrapDataTable, Breadcrumb, Column, IdColumn} from 'react-admin-base-adminkit';
import {Card, CardBody, Col} from "reactstrap";
import Moment from "react-moment";
import {JournalFilter, LanguageFilter} from "../../common/Filters";

export default class List extends Component {
    render() {

        return <Breadcrumb data={[
            {
                name: "Articles",
                href: '/article'
            }
        ]}>
            <Card>
                <CardBody>
                    <BootstrapDataTable
                        url="/api/article"
                        {...this.props}>
                        <thead>
                        <tr>
                            <IdColumn/>
                            <Column sort="created_at">Sended Date</Column>
                            <Column sort="tr_title">Journal</Column>
                            <Column sort="tr_title">Title of Abstract</Column>
                            <Column sort="volume">volume</Column>
                            <Column sort="issue">issue</Column>
                            <Column sort="order_num">order num</Column>
                            <ActionsColumn/>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            row => {
                                const primary_article = row.article_infos.find(el => el.lang_id == row.primary_language);

                                return <tr>
                                    <td>{row.id}</td>
                                    <td><Moment format="DD.MM.YYYY HH.mm" date={new Date(row.created_at)}/></td>
                                    <td>{row.volumes.journalto.slug}</td>
                                    <td>{primary_article ? primary_article.title : ""}</td>
                                    <td>{row.volume}</td>
                                    <td>{row.issue}</td>
                                    <td>{row.order_num}</td>
                                    <Actions
                                        del={`/api/article/${row.id}`}
                                    />
                                </tr>;
                            }
                        }
                        </tbody>
                        <>
                            <Col>
                                <JournalFilter/>
                            </Col>
                        </>
                    </BootstrapDataTable>
                </CardBody>
            </Card>
        </Breadcrumb>;
    }
}
