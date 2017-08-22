import '../app-route.js';
import '../app-location.js';
import { Polymer } from '../../polymer/lib/legacy/polymer-fn.js';
Polymer({
  _template: `
      <app-location route="{{route}}"></app-location>
      <app-route route="{{route}}" pattern="/report/:id" data="{{data}}" active="{{active}}"></app-route>
`,

  is: 'observer-tester',

  properties: {
    route: {
      type: Object,
      notify:true
    },
    data: {
      type: Object,
      notify: true
    },
    active: {
      type: Boolean,
      value: false,
      observer: 'checkActive'
    }
  },

  checkActive: function(active) {
    var x = 1;
  }
});
