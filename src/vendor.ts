// Angular 2
import 'angular2/platform/browser';
import 'angular2/platform/common_dom';
import 'angular2/core';
import 'angular2/router';
import 'angular2/http';

// RxJS
import 'rxjs';

(<any>global).$ = (<any>window).jQuery = require('jquery');

import './../node_modules/materialize-css/dist/js/materialize.min.js';
import './../node_modules/materialize-css/dist/css/materialize.min.css';

require.context('./public/img/mapicons', false, /\.png$/);
