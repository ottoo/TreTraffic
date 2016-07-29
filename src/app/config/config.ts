export let BACKEND_URL: string = '';

if (process.env.ENV === 'build') {
    BACKEND_URL = 'https://ottokivikarki.co:3333/api/lines';
} else {
    BACKEND_URL = 'http://127.0.0.1:3333/api/lines';
}

export var MOCKDATA_URL: string = 'http://127.0.0.1:3333/mocks';
