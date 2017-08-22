import '../../polymer/polymer.js';
import '../app-location.js';
import '../app-route.js';
import { Polymer } from '../../polymer/lib/legacy/polymer-fn.js';
Polymer({
  _template: `
    <app-location route="{{route}}">
    </app-location>
    <app-route route="{{route}}" pattern="/:page" data="{{data}}" tail="{{tail}}">
    </app-route>
`,

  is: 'redirect-app-route',

  properties: {
    route: {
      notify: true
    },
    data: {
      type: Object,
      notify: true
    },
    tail: {
      notify: true
    }
  }
});
