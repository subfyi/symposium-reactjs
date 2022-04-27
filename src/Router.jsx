import {Routes, Route, Navigate} from 'react-router-dom';

import {useUser} from './Components/UserProvider';

import Profile from "./pages/Profile/Edit";
import User from "./pages/User/Users";

import RoleList from "./pages/Role/List";

import Submission from "./pages/Submission/List";
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

    return <Routes>

        {user.role >= 8 && <Route path="/user/*" element={<User/>}/>}
        <Route path="/profile" element={<Profile/>}/>

        {user.role >= 1 && <Route path="/submission/deleted" element={<SubmissionDeleted/>}/>}
        {user.role >= 1 && <Route path="/submission/*" element={<Submission/>}/>}

        {user.role >= 8 && <Route path="/author/*" element={<Author/>}/>}
        {user.role >= 8 && <Route path="/citation/*" element={<Citations/>}/>}
        {user.role >= 8 && <Route path="/keyword/*" element={<Keywords/>}/>}
        {user.role >= 8 && <Route path="/language/*" element={<Languages/>}/>}
        {user.role >= 8 && <Route path="/publisher/*" element={<Publishers/>}/>}
        {user.role >= 8 && <Route path="/subject/*" element={<Subjects/>}/>}
        {user.role >= 8 && <Route path="/roles/*" element={<RoleList/>}/>}

        <Route path="*" element={<Navigate to="/profile"/>}/>
    </Routes>;
}



