import React from "react";
import p from "../package.json";
import {GoToTop} from 'react-admin-base-bootstrap';
import {FooterLayout} from 'react-admin-base-nazox';

export default function Footer() {
    return <FooterLayout>
        <div className="container-fluid">
            <div className="row text-muted">
                <div className="col-6 text-start">
                    <p className="mb-0">
                <span>
                  {p.contributors[1].name} © {new Date().getFullYear()}
                </span>
                        <span>.</span>
                        <span> All rights reserved.</span>
                    </p>
                </div>
                <div className="col-6 text-end">
                    <ul className="list-inline">
                        <li className="list-inline-item">
                            <a
                                href={
                                    "http://www.google.com.tr/search?q=" + p.contributors[1].name
                                }
                                className="text-muted"
                                target="_blank"
                            >
                                <i className="fab fa-google fa-sm"></i>
                            </a>{" "}
                            -
                        </li>
                        <li className="list-inline-item">
                            <a
                                className="text-muted"
                                target="_blank"
                                href={p.contributors[0].web}
                                rel="noopener noreferrer"
                            >
                                {p.contributors[0].name}
                            </a>
                        </li>
                        <li className="list-inline-item">
                            <small>
                                <b>V-</b>
                                <span>{p.version}</span>
                            </small>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <GoToTop/>
    </FooterLayout>;
}


