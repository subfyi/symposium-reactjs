import React from 'react';
import 'react-aspect-ratio/aspect-ratio.css';
import {Card, CardBody, CardHeader} from "reactstrap";
import {useUser} from "../../Components/UserProvider";
import {useEntity} from "react-admin-base";
import {Redirect} from "react-router-dom";
import {Breadcrumb, EntityEditor} from "react-admin-base-adminkit";
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
        data={
            [
                {
                    href: '/presentation/oral',
                    name: 'Oral Presentation'
                },
                {
                    href: '/presentation/poster',
                    name: 'Poster Presentation'
                },
            ]
        }
    >
        {data && data.id && +id !== +data.id && <Redirect to={"/submission/" + data.id + "/edit"}/>}
        <EntityEditor entity={entity}>
            {data.video &&  <Card>
                <CardHeader>
                    Presentations
                </CardHeader>

                <AspectRatio ratio="16/9" style={{width: '100%'}}>
                    <iframe style={{width: '100%'}} frameBorder="0" src={`https://drive.google.com/file/d/${data.video.g_dosyaismi}/preview`} allowFullScreen/>
                </AspectRatio>

            </Card>}
            <Card>
                <CardHeader>
                    Title:{data.en_title}
                </CardHeader>
                <CardBody>

                    <p>
                        {data.authors && data.authors.map((author, index) =>
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
                        <b>Keyword</b>: {(data.pap_keyword || " ").split('|').toString()}
                    </p>
                </CardBody>
            </Card>
                <Detay
                    value={data.icerikler}
                    onChange={val => setData({icerikler: val})}
                    onSave={save}
                />


        </EntityEditor>
    </Breadcrumb>;
}
