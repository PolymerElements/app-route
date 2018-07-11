/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
import '../app-route.js';

import '../app-location.js';
import {Polymer} from '@polymer/polymer/lib/legacy/polymer-fn.js';
import {html} from '@polymer/polymer/lib/utils/html-tag.js';
Polymer({
  _template: html`
    <app-location route="{{route}}">
    </app-location>
    <app-route id="page" route="{{route}}" pattern="/:page" data="{{data}}">
    </app-route>
    <app-route id="user" route="{{route}}" pattern="/user" tail="{{userRoute}}">
    </app-route>
    <app-route id="tail" route="{{userRoute}}" pattern="/:page" data="{{userData}}" query-params="{{userQueryParams}}">
    </app-route>
  `,

  is: 'app-example-1',

  observers: [
    'pageChanged(data.page)',
    'userPathChanged(userRoute.path)',
  ],

  pageChanged: function(page) {
    if (page === 'redirectToUser') {
      this.set('data.page', 'user');
    }
  },

  userPathChanged: function(path) {
    // Redirect from /user/ and /user to /user/view
    if (path === '/' || path === '') {
      this.set('userRoute.path', '/view');
    }
  }
})
