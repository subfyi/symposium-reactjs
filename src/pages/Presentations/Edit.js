import React, {Component} from 'react';
import GenelForm from '../../common/GenelForm';
import SiparisDetay from './SiparisDetay';
import AspectRatio from 'react-aspect-ratio';
import 'react-aspect-ratio/aspect-ratio.css';
import {Card, CardBody, CardHeader, CardHeaderToolbar} from '../../../_metronic/_partials/controls';


class CustomPanel extends Component {
    state = {on: false};

    componentWillMount() {
        this.setState({on: !!this.props.open});
    }

    render() {
        return <Card>
            <CardHeader
                title={this.props.title}
                toolbar={<CardHeaderToolbar>
                    <button
                        type="button"
                        onClick={() => this.setState({
                            on: !this.state.on
                        })}
                        className="btn btn-clean btn-sm btn-icon btn-icon-md ng-star-inserted"
                    ><i className="fas fa-expand-arrows-alt"/>
                    </button>
                </CardHeaderToolbar>}/>
            {this.state.on && <CardBody>
                {this.props.children}
            </CardBody>}
        </Card>;
    }
}

export default class EditPresentation extends Component {
    render() {
        return <>
            <GenelForm
                noCard
                noSave
                key={this.props.match.params.id || 0}
                url="/api/submission"
                id={this.props.match.params.id}
                {...this.props}
            >
                {
                    controller => controller.state && controller.state.video && <>
                        <CustomPanel open title={"Topic: " + (controller.state.topic && controller.state.topic.value)}>
                            <AspectRatio ratio="16/9" style={{width: '100%'}}>
                                <iframe style={{width: '100%'}} frameBorder="0" src={`https://drive.google.com/file/d/${controller.state.video.g_dosyaismi}/preview`} allowFullScreen/>
                            </AspectRatio>
                        </CustomPanel>

                        <Card><CardHeader
                            title={"Title: " + controller.state.pap_title}/>
                            <CardBody>
                                <p>
                                    {controller.state.authors.map((author, index) =>
                                        <>{author.name} {author.surname}{" "}
                                            {!!author.correspond && <>(Correspond)</>}
                                            {!!author.presenter && <span>{'('}Presenter{')'}</span>},
                                        </>
                                    )}

                                </p>
                                <hr/>
                                <p>
                                    <b>Abstract</b>: {controller.state.pap_abstract}
                                </p>
                                <hr/>
                                <p>
                                    <b>Keyword</b>: {(controller.state.pap_keyword || " ").split('|').toString()}
                                </p>
                            </CardBody>
                        </Card>

                        <SiparisDetay
                            value={controller.state.icerikler}
                            onChange={val => controller.setState({icerikler: val})}
                            onSave={() => controller.save()}
                        />
                    </>
                }
            </GenelForm>
        </>;
    }
}
