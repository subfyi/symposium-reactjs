import {default as axios, default as Axios} from 'axios';
import swal2 from 'sweetalert2';


var isLocal = window.location.host.indexOf('localhost') === 0 || window.location.host.indexOf('127.0.0.1') === 0;

export const endpoint = isLocal ? 'http://127.0.0.1:8000/' : 'https://api.iseser.com/';
export const endpointWeb = endpoint.replace(/\/$/, '');

var client_id = '2',
    client_secret = 'JjPIsb7TNCf7ysEfs0JDhl5XXBgIVh6dMRLMCrb9';

var access_token = localStorage.getItem('symposium_access_token'),
    refresh_token = localStorage.getItem('symposium_refresh_token');

export var free = axios.create({
    baseURL: endpoint
});

free.interceptors.response.use(a => a, a => Promise.reject(a.response && a.response.data && a.response.data.message && new Error(a.response.data.message)));

export async function hatagoster(data) {
    try {
        await data;
        return 0;
    } catch (e) {
        if (!Axios.isCancel(e)) {
            console.error('Hata:', e);
            await swal2.fire('Hata olustu', (e.data && e.data.message) || e.message || e || "Hata olustu.", 'error');
        }
    }
    return 1;
}

export async function hatagostervalue(data) {
    try {
        return await data;
    } catch (e) {
        if (!Axios.isCancel(e)) {
            console.error('Hata:', e);
            await swal2.fire('Hata olustu', (e.response && e.response.data && e.response.data.message) || e.message || e || "Hata olustu.", 'error');
        }

        throw e;
    }
}

export function is_logged_in() {
    return !!refresh_token;
}

var _onLoggedIn;

export function onLoggedIn(callback) {
    _onLoggedIn = callback;
}

export function loggedIn() {
    _onLoggedIn && _onLoggedIn(true);
}

export function logout() {
    access_token = null;
    refresh_token = null;
    localStorage.removeItem('symposium_access_token');
    localStorage.removeItem('symposium_refresh_token');
    _onLoggedIn && _onLoggedIn(false);
}

export async function log_in(username, password) {
    var form = new FormData();

    form.append('grant_type', 'password');
    form.append('client_id', client_id);
    form.append('client_secret', client_secret);
    form.append('username', username);
    form.append('password', password);

    var data = await free.post('/oauth/token', form);

    access_token = data.data.access_token;
    refresh_token = data.data.refresh_token;

    localStorage.setItem('symposium_access_token', access_token);
    localStorage.setItem('symposium_refresh_token', refresh_token);
}

var cached_token;

function renew_token() {
    if (cached_token) {
        return cached_token;
    }

    cached_token = _renew_token()
        .finally(function () {
            cached_token = null;
        });

    async function _renew_token() {
        var form = new FormData();

        form.append('grant_type', 'refresh_token');
        form.append('client_id', client_id);
        form.append('client_secret', client_secret);
        form.append('refresh_token', refresh_token);

        var data = await free.post('/oauth/token', form);

        access_token = data.data.access_token;

        localStorage.setItem('symposium_access_token', access_token);
    }
}

export var tokenized = axios.create({
    baseURL: endpoint
});

export function set_hook(start, stop) {
    var count = 0;
    var data;

    function check() {
        if (count === 1 && !data) {
            data = start();
        } else if (count === 0) {
            stop(data);
            data = null;
        }
    }

    var request = tokenized.interceptors.request.use((a) => {
        ++count;
        check();
        return a;
    });

    var response = tokenized.interceptors.response.use((a) => {
        --count;
        check();
        return a;
    }, (a) => {
        --count;
        check();
        return Promise.reject(a);
    });

    var request2 = free.interceptors.request.use((a) => {
        ++count;
        check();
        return a;
    });

    var response2 = free.interceptors.response.use((a) => {
        --count;
        check();
        return a;
    }, (a) => {
        --count;
        check();
        return Promise.reject(a);
    });

    return function () {
        tokenized.interceptors.response.eject(response);
        tokenized.interceptors.request.eject(request);
        free.interceptors.response.eject(response2);
        free.interceptors.request.eject(request2);
    };
}

tokenized.interceptors.request.use(function (config) {
    if (access_token == null) {
        return Promise.reject(new Error('You must be logged in to use this action.'));
    }

    config.headers.Authorization = 'Bearer ' + access_token;
    return config;
});

tokenized.interceptors.response.use(a => a, async function (error) {
    if (error.response && error.response.status === 401) {
        await renew_token();
        return tokenized(error.config);
    }

    throw error;
});
