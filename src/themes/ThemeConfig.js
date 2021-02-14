import React, {useReducer} from 'react';
import {Button} from "reactstrap";

const ThemeContext = React.createContext();

const LightTheme = React.lazy(() => import('./light'));
const DarkTheme = React.lazy(() => import('./dark'));
const CeruleanTheme = React.lazy(() => import('./cerulean'));
const CosmoTheme = React.lazy(() => import('./cosmo'));
const CyborgTheme = React.lazy(() => import('./cyborg'));
const DarklyTheme = React.lazy(() => import('./darkly'));
const FlatlyTheme = React.lazy(() => import('./flatly'));
const JournalTheme = React.lazy(() => import('./journal'));
const LiteraTheme = React.lazy(() => import('./litera'));
const LumenTheme = React.lazy(() => import('./lumen'));
const LuxTheme = React.lazy(() => import('./lux'));
const MateriaTheme = React.lazy(() => import('./materia'));
const MintyTheme = React.lazy(() => import('./minty'));
const PulseTheme = React.lazy(() => import('./pulse'));
const SandstoneTheme = React.lazy(() => import('./sandstone'));
const SimplexTheme = React.lazy(() => import('./simplex'));
const SketchyTheme = React.lazy(() => import('./sketchy'));
const SlateTheme = React.lazy(() => import('./slate'));
const SolarTheme = React.lazy(() => import('./solar'));
const SpacelabTheme = React.lazy(() => import('./spacelab'));
const SuperheroTheme = React.lazy(() => import('./superhero'));
const UnitedTheme = React.lazy(() => import('./united'));
const YetiTheme = React.lazy(() => import('./yeti'));


export function useTheme() {
    return React.useContext(ThemeContext);
}

export function SwitchThemeButton({theme, children}) {
    const [, setTheme] = useTheme();

    return <Button color="primary" block onClick={() => window.location.reload(false) + setTheme(theme)}>{children}</Button>;
}

export function ThemePart() {
    const [theme,] = useTheme();
    return <SwitchThemeButton theme={theme === "dark" ? "light" : "dark"}><i className={theme === "dark" ? "fas fa-cloud-sun fa-sm" : "fas fa-cloud-moon fa-sm"}></i></SwitchThemeButton>;
}

export default function ThemeProvider({children, tid}) {

    const state = useReducer((oldValue, newValue) => {
        localStorage.setItem(tid + '_theme', newValue);
        return newValue;
    }, localStorage.getItem(tid + '_theme') || 'dark');

    const [theme, setTheme] = state;

    return <ThemeContext.Provider value={state}>
        <div className={theme}>
            <React.Suspense  value={state} fallback={<></>}>
                {(theme === "dark") ? <DarkTheme/> : <LightTheme/>}
            </React.Suspense>
            {children}
        </div>
    </ThemeContext.Provider>
}
