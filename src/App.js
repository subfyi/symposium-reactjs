import "react-admin-base-adminkit/assets/app.css";
import './App.scss';

import {App, Authorized, ForgotPasswordRoute, LoginRoute, NotAuthorized, AuthProvider, RegisterRoute } from 'react-admin-base';
import {MainLayout, Reset, LanguageProvider, Login} from 'react-admin-base-adminkit';
import MenuSidebar from "./MenuSidebar";
import Router from "./Router";
import MenuHeader from "./MenuHeader";
import Footer from "./Footer";
import {UserProvider} from "./Components/UserProvider";
import UploadConfig from "./UploadConfig";
import languageEn from './i18n/en.json';
import Register from "./start/Register";

const languages = {
    en: {
        icon: 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/us.svg',
        name: 'English',
        messages: languageEn
    }
};

function BaseApp() {
    return (
        <App
            id="iseser"
            name="ISESER PORTAL"
            logo="/logo.png"
            endpoint={process.env.REACT_APP_ENDPOINT}
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
                                <Register />
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
    );
}

export default BaseApp;
