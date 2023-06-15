import './App.scss';


import {
    App,
    Authorized,
    AuthProvider,
    ForgotPasswordRoute,
    LoginRoute,
    NotAuthorized,
    RegisterRoute
} from 'react-admin-base';
import {LanguageProvider} from 'react-admin-base-bootstrap';
import {Login, MainLayout, Reset} from 'react-admin-base-nazox';
import MenuSidebar from "./MenuSidebar";
import Router from "./Router";
import MenuHeader from "./MenuHeader";
import Footer from "./Footer";
import {UserProvider} from "./Components/UserProvider";
import UploadConfig from "./UploadConfig";
import languageEn from './i18n/en.json';
import Register from "./start/Register";
import {BrowserRouter} from 'react-router-dom';


const languages = {
    en: {
        icon: 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/us.svg',
        name: 'English',
        messages: languageEn
    }
};

function BaseApp() {
    return (
        <BrowserRouter basename={process.env.REACT_APP_PATHBASE || undefined}>
            <App
                id="iseser"
                name="ISESER PORTAL"
                endpoint={process.env.REACT_APP_ENDPOINT}
                logo="/logo-light.png"
                onlylogo="/logo.png"
            >
                <LanguageProvider defaultLanguage="en" languages={languages}>
                    <AuthProvider
                        tokenEndpoint="/oauth/token"
                        client_id="2"
                        client_secret="JjPIsb7TNCf7ysEfs0JDhl5XXBgIVh6dMRLMCrb9"
                    >
                        <NotAuthorized>
                            <LoginRoute>
                                <Login/>
                            </LoginRoute>
                            <ForgotPasswordRoute>
                                <Reset/>
                            </ForgotPasswordRoute>
                            <RegisterRoute>
                                <Register/>
                            </RegisterRoute>
                        </NotAuthorized>
                        <Authorized>
                            <UserProvider>
                                <UploadConfig>
                                    <MainLayout bg='/bg.png' bgColor="#222">
                                        <MenuHeader/>
                                        <MenuSidebar/>
                                        <Router/>
                                        <Footer/>
                                    </MainLayout>
                                </UploadConfig>
                            </UserProvider>
                        </Authorized>
                    </AuthProvider>
                </LanguageProvider>
            </App>
        </BrowserRouter>
    );
}

export default BaseApp;

