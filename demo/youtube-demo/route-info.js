import '../../../polymer/polymer.js';
import { Polymer } from '../../../polymer/lib/legacy/polymer-fn.js';
Polymer({
  _template: `
    <style>
      :host {
        font-style: italic;
        font-size: 0.85em;
        font-weight: 200;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #fff;
      }
    </style>
    <span>Route prefix: {{route.prefix}} · Route path: {{route.path}} · Query params: {{_stringifyQueryParams(route.__queryParams.*)}}</span>
`,

  is: 'route-info',

  properties: {
    route: {
      type: Object
    }
  },

  _stringifyQueryParams: function() {
    var params = [];
    if (this.route && this.route.__queryParams) {
      for (var key in this.route.__queryParams) {
        params.push(key + ' = ' + this.route.__queryParams[key]);
      }
    }
    return params.join(', ');
  }
})
