/*
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt The complete set of authors may be found
 * at http://polymer.github.io/AUTHORS.txt The complete set of contributors may
 * be found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by
 * Google as part of the polymer project is also subject to an additional IP
 * rights grant found at http://polymer.github.io/PATENTS.txt
 */

import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * This element supports a subset of the features of the google-map element
 * v2.x. Namely, the fluid attribute and videoId/list properties are supported.
 */
class GoogleYoutube extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }

        :host([fluid]) {
          width: 100%;
          max-width: 100%;
          position: relative;
        }

        #container {
          width: 100%;
          height: 100%;
          max-width: 100%;
          max-height: 100%;
        }

        :host([fluid]) #container {
          width: 100%;
          height: auto;
          padding-top: 56.25%;
        }

        #iframe {
          width: 100%;
          height: 100%;
        }

        :host([fluid]) #iframe {
          vertical-align: bottom;
          position: absolute;
          top: 0px;
          left: 0px;
        }
      </style>
      <div id="container"></div>
    `;
  }

  static get properties() {
    return {
      videoId: {
        type: String,
        observer: '_videoIdChanged',
      },

      state: {
        type: Number,
        notify: true,
      },

      currenttime: {
        type: Number,
        notify: true,
      },

      isReady: {
        type: Boolean,
        value: false,
      },

      duration: {type: Number, notify: true},

      __unreadyCommands: {
        type: Array,
        value: [],
      },

      __currenttimeInterval: {
        type: Number,
      }
    };
  }

  _videoIdChanged() {
    this.isReady = false;
    if (this.__player && this.__player.destroy) {
      this.__player.destroy();
    }
    this.__player = new YT.Player(this.$.container, {
      videoId: this.videoId,
      events: {
        onReady: this.__onPlayerReady.bind(this),
        onStateChange: this.__onStateChange.bind(this),
      }
    });
    // this.loadVideo(this.videoId);
  }

  loadVideo(id) {
    if (!this.isReady) {
      return;
    }

    this.__player.loadVideoById(id)
  }

  connectedCallback() {
    super.connectedCallback();
    this.__origin = window.location.origin;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.__currenttimeInterval) {
      clearInterval(this.__currenttimeInterval);
      this.__currenttimeInterval = null;
    }
  }

  seekTo(newTime) {
    if (!this.isReady) {
      this.__unreadyCommands.push(this.seekTo.bind(this, [newTime]));
      return;
    }

    this.__player.seekTo(newTime);
  }

  __onPlayerReady() {
    this.isReady = true;
    this.duration = this.__player.getDuration();

    const ev = new CustomEvent('google-youtube-ready', {composed: true});
    this.dispatchEvent(ev);
    for (const command of this.__unreadyCommands) {
      command.call(this);
    };

    this.__unreadyCommands = [];

    setInterval(this.__updateCurrentTime.bind(this), 100);
  }

  __updateCurrentTime() {
    if (!this.__player.getCurrentTime) {
      clearInterval(this.__currenttimeInterval);
      this.__currenttimeInterval = null;
      return;
    }

    this.currenttime = Math.floor(this.__player.getCurrentTime());
  }

  __onStateChange(e) {
    this.state = e.data;
  }

  pause() {
    if (!this.isReady) {
      this.__unreadyCommands.push(this.pause);
      return;
    }

    this.__player.pauseVideo();
  }

  play() {
    if (!this.isReady) {
      this.__unreadyCommands.push(this.play);
      return;
    }

    this.__player.playVideo();
  }
}

customElements.define('google-youtube', GoogleYoutube);