import "react-admin-base-adminkit/assets/app.css";
import './App.scss';

import {App, Authorized, ForgotPasswordRoute, LoginRoute, NotAuthorized, AuthProvider} from 'react-admin-base';
import {MainLayout, Login, Reset, LanguageProvider} from 'react-admin-base-adminkit';
import MenuSidebar from "./MenuSidebar";
import Router from "./Router";
import MenuHeader from "./MenuHeader";
import Footer from "./Footer";
import {UserProvider} from "./Components/UserProvider";
import UploadConfig from "./UploadConfig";
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import languageEn from './i18n/en.json';
import ThemeProvider from "./themes/ThemeConfig";

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
            endpoint={process.env.REACT_APP_ENDPOINT}
            logo="/logo.svg"
        >
            <LanguageProvider defaultLanguage="en" languages={languages}>
                <ThemeProvider tid="iseser">
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
                </ThemeProvider>
            </LanguageProvider>
        </App>
    );
}

export default BaseApp;
