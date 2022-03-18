import {version, contributors} from "../package.json";
import React from "react";
import {GoToTop} from 'react-admin-base-bootstrap';
import {FooterLayout} from "react-admin-base-adminkit";

export default function Footer() {
    return <FooterLayout>
        <div className="container-fluid">
            <div className="row text-muted">
                <div className="col-6 text-left">
                    <p className="mb-0">
                        <span>{contributors[1].name} © {new Date().getFullYear()}</span>
                        <span>.</span>
                        <span> All rights reserved.</span>
                    </p>
                </div>
                <div className="col-6 text-right">
                    <ul className="list-inline">
                        <li className="list-inline-item"><a href={"http://www.google.com.tr/search?q=" + contributors[1].name} className="text-muted"
                                                            target="_blank" rel="noreferrer"><i className="fab fa-google fa-sm"/></a> -
                        </li>
                        <li className="list-inline-item">
                            <a className="text-muted"
                               target="_blank"
                               href={contributors[0].web}
                               rel="noopener noreferrer">{contributors[0].name}
                            </a>
                        </li>
                        <li className="list-inline-item">
                            <small><b>V-</b>
                                <span>{version}</span></small>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <GoToTop/>
    </FooterLayout>;
}


