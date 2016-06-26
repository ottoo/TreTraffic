// Angular 2
import '@angular/platform-browser';
import '@angular/platform-browser-dynamic';
import '@angular/core';
import '@angular/common';
import '@angular/forms';
import '@angular/http';
import '@angular/router';

// RxJS
import 'rxjs';

(<any>global).$ = (<any>window).jQuery = require('jquery');

import './../node_modules/materialize-css/dist/js/materialize.min.js';
import './../node_modules/materialize-css/dist/css/materialize.min.css';

require.context('./public/img/mapicons', false, /\.png$/);
