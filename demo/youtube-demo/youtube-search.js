import '../../../polymer/polymer.js';
import '../../../paper-input/paper-input.js';
import '../../../iron-ajax/iron-ajax.js';
import '../../app-route.js';
import './route-info.js';
import { Polymer } from '../../../polymer/lib/legacy/polymer-fn.js';
Polymer({
  _template: `
    <style>
      :host {
        --primary-color: #fff;
        --paper-input-container-color: #fff;
        display: block;
        position: relative;
        padding: 1em;
      }

      route-info {
        color: #fff;
      }
    </style>

    <!-- This app-route consumes the route which was provided by the tail of
    a app-route in the host of this element -->
    <app-route route="{{route}}" pattern="/:searchQuery" data="{{data}}">
    </app-route>

    <paper-input label="Search Youtube" value="{{data.searchQuery}}"></paper-input>

    <route-info route="[[route]]"></route-info>

    <iron-ajax auto="" id="youtubeSearch" url="https://www.googleapis.com/youtube/v3/search" params="{{params}}" last-response="{{videoData}}">
    </iron-ajax>
`,

  is: 'youtube-search',

  properties: {
    route: {
      type: Object,
      notify: true
    },

    data: {
      type: Object
    },

    category: {
      type: String,
      notify: true
    },

    params: {
      type: String,
      computed: '_setParams(data.searchQuery)'
    },

    videoData: {
      type: Object,
      notify: true
    }
  },

  observers: ['_pathChanged(route.path)'],

  _pathChanged: function() {
    this.async(function() {
      if (!this.route.path) {
        this.set('route.path', '/');
      }
    });
  },

  _setParams: function(category) {
    return {
      part: 'snippet',
      q: this.data.searchQuery,
      key: 'AIzaSyAuecFZ9xJXbGDkQYWBmYrtzOGJD-iDIgI',
      type: 'video'
    }
  }
});
