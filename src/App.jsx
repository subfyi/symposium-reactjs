import './App.scss';


import {App, Authorized, AuthProvider, ForgotPasswordRoute, LoginRoute, NotAuthorized, RegisterRoute} from 'react-admin-base';
import {LanguageProvider} from 'react-admin-base-bootstrap';
import {Login, MainLayout, Reset} from 'react-admin-base-falcon';
import MenuSidebar from "./MenuSidebar";
import Router from "./Router";
import MenuHeader from "./MenuHeader";
import Footer from "./Footer";
import {UserProvider} from "./components/UserProvider";
import UploadConfig from './providers/UploadConfig';
import Register from "./start/Register";
import {BrowserRouter} from 'react-router-dom';


const languages = {
    en: {
        icon: 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/us.svg',
        name: 'English',
        messages: {}
    }
};

function BaseApp() {
    return (
        <BrowserRouter basename={import.meta.env.BASE_URL || undefined}>
            <App
                id={import.meta.env.VITE_ID}
                name={import.meta.env.VITE_NAME}
                endpoint={import.meta.env.VITE_ENDPOINT}
                logo="/logo-light.png"
                onlylogo="/logo.png"
            >
                <AuthProvider
                    tokenEndpoint="/oauth/token"
                    client_id="2"
                    client_secret="JjPIsb7TNCf7ysEfs0JDhl5XXBgIVh6dMRLMCrb9"
                >
                    <LanguageProvider defaultLanguage="en" languages={languages}>
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
                                    <MainLayout>
                                        <MenuHeader/>
                                        <MenuSidebar/>
                                        <Router/>
                                        <Footer/>
                                    </MainLayout>
                                </UploadConfig>
                            </UserProvider>
                        </Authorized>
                    </LanguageProvider>
                </AuthProvider>
            </App>
        </BrowserRouter>
    );
}

export default BaseApp;

