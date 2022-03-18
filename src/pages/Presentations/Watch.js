import React from 'react';
import 'react-aspect-ratio/aspect-ratio.css';
import {Card, CardBody, CardHeader} from "reactstrap";
import {useUser} from "../../Components/UserProvider";
import {useEntity} from "react-admin-base";
import {Redirect} from "react-router-dom";
import {EntityEditor} from "react-admin-base-bootstrap";
import {Breadcrumb} from "react-admin-base-adminkit";
import AspectRatio from "react-aspect-ratio";
import Detay from "./Detay";

export default function Watch(props) {
    const id = props.match.params.id;
    return <WatchSlug
        key={id}
        {...props}
    />
}

function WatchSlug({match}) {

    const id = match.params.id;

    const user = useUser();
    const entity = useEntity('/api/submission', id);
    const [data, setData, save] = entity;

    return <Breadcrumb
        title={data.en_title}

    >
        {data && data.id && +id !== +data.id && <Redirect to={"/submission/" + data.id + "/edit"}/>}
        <EntityEditor entity={entity}>

            <Card>
                <CardHeader>
                    <b>Title</b>: {data.en_title}
                </CardHeader>
                <CardBody>
                    <p>
                        <b>Author(s)</b>: {data.authors && data.authors.map((author, index) =>
                        <>{author.first_name} {author.last_name}
                            {!!author.correspond && <>(Correspond)</>}
                            {!!author.presenter && <span>{'('}Presenter{')'}</span>}{", "}
                        </>
                    )}
                    </p>
                    <hr/>
                    <p>
                        <b>Abstract</b>: {data.en_abstract}
                    </p>
                    <hr/>
                    <p>
                        <b>Keyword(s)</b>: {(data.pap_keyword || " ").split('|').toString()}
                    </p>
                </CardBody>
            </Card>

            {data.video && <Card>

                <AspectRatio ratio="16/9" style={{width: '100%'}}>
                    <iframe style={{width: '100%'}} frameBorder="0" src={`https://drive.google.com/file/d/${data.video.g_dosyaismi}/preview`} allowFullScreen/>
                </AspectRatio>

            </Card>}

            {/*data.poster_presentation_dosya && <Card>
                <CardHeader>
                    Poster Presentation
                </CardHeader>

                <AspectRatio ratio="16/9" style={{width: '100%'}}>
                    <iframe style={{width: '100%'}} frameBorder="0" src={`https://api.iseser.com/uploads/dosya/${data.poster_presentation_dosya.f_klasorismi +"/"+ data.poster_presentation_dosya.f_dosyaisimi}`} allowFullScreen/>
                </AspectRatio>

            </Card>*/}

            <Detay
                value={data.icerikler}
                onChange={val => setData({icerikler: val})}
                onSave={save}
            />


        </EntityEditor>
    </Breadcrumb>;
}
