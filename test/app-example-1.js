import '../app-route.js';
import '../app-location.js';
import { Polymer } from '../../polymer/lib/legacy/polymer-fn.js';
Polymer({
  _template: `
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
