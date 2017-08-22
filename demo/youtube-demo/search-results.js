import '../../../polymer/polymer.js';
import '../../../paper-card/paper-card.js';
import '../../../iron-flex-layout/iron-flex-layout.js';
import { Polymer } from '../../../polymer/lib/legacy/polymer-fn.js';
Polymer({
  _template: `
    <style>
      :host {
        @apply --layout-horizontal;
        @apply --layout-center-center;
        @apply --layout-wrap;
      }

      a {
        color: black;
        text-decoration: none;
      }

      paper-card {
        width: 300px;
        margin: 1em 0.5em 0em;
        font-size: 14px;
      }

      .card-content {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    </style>
    <template is="dom-repeat" items="{{items}}" as="video">
      <!-- The '#' is included because the use-hash-as-path property is
      set to true in the app-location -->
      <a href="./#/video/{{video.id}}">
        <paper-card image="{{video.thumbnail}}">
          <div class="card-content">
            {{video.title}}
          </div>
        </paper-card>
      </a>
    </template>
`,

  is: 'search-results',

  properties: {
    items: {
      type: Array
    }
  }
})
