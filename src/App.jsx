import './App.scss';

import {useEffect} from "react";
import {Route, Switch} from "react-router-dom";

import {App, Authorized, ForgotPasswordRoute, LoginRoute, NotAuthorized, AuthProvider, RegisterRoute, useAuth} from 'react-admin-base';
import { LanguageProvider } from 'react-admin-base-bootstrap';
import {  Login, MainLayout, Reset } from 'react-admin-base-nazox';
import MenuSidebar from "./MenuSidebar";
import Router from "./Router";
import MenuHeader from "./MenuHeader";
import Footer from "./Footer";
import {UserProvider} from "./Components/UserProvider";
import UploadConfig from "./UploadConfig";
import languageEn from './i18n/en.json';
import Register from "./start/Register";
import { BrowserRouter } from 'react-router-dom';
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

Sentry.init({
    dsn: "https://d8e2deb07d8e44cda506ed953b8bb171@o861592.ingest.sentry.io/6264536",
    integrations: [new Integrations.BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
});

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
            logo="/logo-light.png"
            onlylogo="/logo.png"
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

