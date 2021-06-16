import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {useUser} from "./Components/UserProvider";

import Profile from "./pages/Profile/Edit";

import UserEC from "./pages/User/EditCreate";
import User from "./pages/User/List";

import RoleAdd from "./pages/Roles/Edit";
import RoleList from "./pages/Roles/List";

import PresentationOral from "./pages/Presentations/Orals";
import PresentationPoster from "./pages/Presentations/Posters";
import WatchPresentation from "./pages/Presentations/Watch";

import Submission from "./pages/Submission/List";
import SubmissionEdit from "./pages/Submission/Edit";
import SubmissionDeleted from "./pages/Submission/Deleted";

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
        <Redirect exact from="/" to="/presentation/oral"/>
        <Redirect exact from="/login" to="/presentation/oral"/>
        <Redirect exact from="/register" to="/presentation/oral"/>
        <Redirect exact from="/logout" to="/presentation/oral"/>

        {user.role >= 1 && <Route path="/submission/deleted" component={SubmissionDeleted}/>}
        {user.role >= 1 && <Route path="/submission/:id/edit" component={SubmissionEdit}/>}
        {user.role >= 8 && <Route path="/submission/create" component={SubmissionEdit}/>}
        {user.role >= 1 && <Route path="/submissions" component={Submission}/>}

        <Route path="/presentation/:id/watch" component={WatchPresentation}/>
        <Route path="/presentation/oral" component={PresentationOral}/>
        <Route path="/presentation/poster" component={PresentationPoster}/>

        {user.role >= 8 && <Route path="/author/:id/edit" component={AuthorEdit}/>}
        {user.role >= 8 && <Route path="/author/create" component={AuthorEdit}/>}
        {user.role >= 8 && <Route path="/author" component={Author}/>}

        {user.role >= 8 && <Route path="/citation/:id/edit" component={CitationsEdit}/>}
        {user.role >= 8 && <Route path="/citation/create" component={CitationsEdit}/>}
        {user.role >= 8 && <Route path="/citation" component={Citations}/>}

        {user.role >= 8 && <Route path="/keyword/:id/edit" component={KeywordsEdit}/>}
        {user.role >= 8 && <Route path="/keyword/create" component={KeywordsEdit}/>}
        {user.role >= 8 && <Route path="/keyword" component={Keywords}/>}

        {user.role >= 8 && <Route path="/language/:id/edit" component={LanguagesEdit}/>}
        {user.role >= 8 && <Route path="/language/create" component={LanguagesEdit}/>}
        {user.role >= 8 && <Route path="/language" component={Languages}/>}

        {user.role >= 8 && <Route path="/publisher/:id/edit" component={PublishersEdit}/>}
        {user.role >= 8 && <Route path="/publisher/create" component={PublishersEdit}/>}
        {user.role >= 8 && <Route path="/publisher" component={Publishers}/>}

        {user.role >= 8 && <Route path="/subject/:id/edit" component={SubjectsEdit}/>}
        {user.role >= 8 && <Route path="/subject/create" component={SubjectsEdit}/>}
        {user.role >= 8 && <Route path="/subject" component={Subjects}/>}

        {user.role >= 8 && <Route path="/roles/:id/edit" component={RoleAdd}/>}
        {user.role >= 8 && <Route path="/roles/create" component={RoleAdd}/>}
        {user.role >= 8 && <Route path="/roles" component={RoleList}/>}

        {user.role >= 8 && <Route path="/user/create" component={UserEC}/>}
        {user.role >= 8 && <Route path="/user/:id/edit" component={UserEC}/>}
        {user.role >= 8 && <Route path="/user" component={User}/>}

        {user.role >= 1 && <Route path="/profile" component={Profile}/>}

        <Redirect to="/submissions"/>
    </Switch>;
}
