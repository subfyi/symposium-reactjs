import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {useUser} from "./Components/UserProvider";

import Profile from "./pages/Profile/Edit";

import UserEC from "./pages/User/EditCreate";
import User from "./pages/User/List";

import PresentationOral from "./pages/Presentations/Orals";
import PresentationPoster from "./pages/Presentations/Posters";
import WatchPresentation from "./pages/Presentations/Watch";

import Submission from "./pages/Submission/List";
import SubmissionEdit from "./pages/Submission/Edit";

import Author from "./pages/Authors/List";
import AuthorEdit from "./pages/Authors/Edit";

import Citations from "./pages/Citations/List";
import CitationsEdit from "./pages/Citations/Edit";

import Keywords from "./pages/Keywords/List";
import KeywordsEdit from "./pages/Keywords/Edit";

import Languages from "./pages/Languages/List";
import LanguagesEdit from "./pages/Languages/Edit";

import Publishers from "./pages/Publishers/List";
import PublishersEdit from "./pages/Publishers/Edit";

import Subjects from "./pages/Subjects/List";
import SubjectsEdit from "./pages/Subjects/Edit";

export default function Router() {
    const user = useUser();

    return <Switch>
        <Redirect exact from="/" to="/submissions"/>
        <Redirect exact from="/login" to="/submissions"/>
        <Redirect exact from="/register" to="/submissions"/>
        <Redirect exact from="/logout" to="/submissions"/>

        <Route path="/submission/:id/edit" component={SubmissionEdit}/>
        <Route path="/submission/create" component={SubmissionEdit}/>
        <Route path="/submissions" component={Submission}/>

        <Route path="/presentation/:id/watch" component={WatchPresentation}/>
        <Route path="/presentation/oral" component={PresentationOral}/>
        <Route path="/presentation/poster" component={PresentationPoster}/>

        <Route path="/author/:id/edit" component={AuthorEdit}/>
        <Route path="/author/create" component={AuthorEdit}/>
        <Route path="/author" component={Author}/>

        <Route path="/citation/:id/edit" component={CitationsEdit}/>
        <Route path="/citation/create" component={CitationsEdit}/>
        <Route path="/citation" component={Citations}/>

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

        { user.yetki >= 8 && <Route path="/user/create" component={UserEC}/>}
        { user.yetki >= 8 && <Route path="/user/:id" component={UserEC}/>}
        { user.yetki >= 8 && <Route path="/user" component={User}/>}

        <Route path="/profile" component={Profile}/>

        <Redirect to="/submissions"/>
    </Switch>;
}
