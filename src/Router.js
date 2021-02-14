import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';

import Profile from "./pages/Profile/Edit";

import Articles from "./pages/Articles/List";

import Journals from "./pages/Journals/List";

import Volumes from "./pages/Volumes/List";

import ArticleType from "./pages/ArticleTypes/List";
import ArticleTypeEdit from "./pages/ArticleTypes/Edit";

import Author from "./pages/Authors/List";
import AuthorEdit from "./pages/Authors/Edit";

import Citations from "./pages/Citations/List";
import CitationsEdit from "./pages/Citations/Edit";

import Countries from "./pages/Countries/List";
import CountriesEdit from "./pages/Countries/Edit";

import Keywords from "./pages/Keywords/List";
import KeywordsEdit from "./pages/Keywords/Edit";

import Languages from "./pages/Languages/List";
import LanguagesEdit from "./pages/Languages/Edit";

import Publishers from "./pages/Publishers/List";
import PublishersEdit from "./pages/Publishers/Edit";

import Subjects from "./pages/Subjects/List";
import SubjectsEdit from "./pages/Subjects/Edit";


export default function Router() {
    return <Switch>
        <Redirect exact from="/" to="/journal"/>
        <Redirect exact from="/login" to="/journal"/>
        <Redirect exact from="/register" to="/journal"/>
        <Redirect exact from="/logout" to="/journal"/>

        <Route path="/article" component={Articles}/>

        <Route path="/journal" component={Journals}/>

        <Route path="/volume" component={Volumes}/>

        <Route path="/articletype/:id/edit" component={ArticleTypeEdit}/>
        <Route path="/articletype/create" component={ArticleTypeEdit}/>
        <Route path="/articletype" component={ArticleType}/>

        <Route path="/author/:id/edit" component={AuthorEdit}/>
        <Route path="/author/create" component={AuthorEdit}/>
        <Route path="/author" component={Author}/>

        <Route path="/citation/:id/edit" component={CitationsEdit}/>
        <Route path="/citation/create" component={CitationsEdit}/>
        <Route path="/citation" component={Citations}/>

        <Route path="/countrie/:id/edit" component={CountriesEdit}/>
        <Route path="/countrie/create" component={CountriesEdit}/>
        <Route path="/countrie" component={Countries}/>

        <Route path="/keyword/:id/edit" component={KeywordsEdit}/>
        <Route path="/keyword/create" component={KeywordsEdit}/>
        <Route path="/keyword" component={Keywords}/>

        <Route path="/language/:id/edit" component={LanguagesEdit}/>
        <Route path="/language/create" component={LanguagesEdit}/>
        <Route path="/language" component={Languages}/>

        <Route path="/publisher/:id/edit" component={PublishersEdit}/>
        <Route path="/publisher/create" component={PublishersEdit}/>
        <Route path="/publisher" component={Publishers}/>

        <Route path="/subject/:id/edit" component={SubjectsEdit}/>
        <Route path="/subject/create" component={SubjectsEdit}/>
        <Route path="/subject" component={Subjects}/>

        <Route path="/profile" component={Profile}/>

        <Redirect to="/journal"/>
    </Switch>;
}
