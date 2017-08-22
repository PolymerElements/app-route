import '../../../polymer/polymer.js';
import '../../../google-youtube/google-youtube.js';
import { Polymer } from '../../../polymer/lib/legacy/polymer-fn.js';
Polymer({
  _template: `
    <style>
      :host {
        display: block;
        position: relative;
        width: 100%;
      }

      google-youtube {
        height: 100%;
      }
    </style>

    <google-youtube id="player" video-id="{{videoId}}" state="{{__state}}" currenttime="{{__currentTime}}" width="100%" height="100%">
    </google-youtube>
`,

  is: 'youtube-lite',

  properties: {
    videoId: {
      type: String,
      notify: true
    },

    state: {
      type: String,
      notify: true,
      observer: '_stateChanged'
    },

    currentTime: {
      type: Number,
      notify: true,
      observer: '_currentTimeChanged'
    },

    startTime: {
      type: Number
    },

    __state: {
      type: String,
      observer: '__ytApiStateChange'
    },

    __currentTime: {
      type: String,
      observer: '_ytCurrentTimeChanged'
    },

    __pauseOnFirstSeek: {
      type: Boolean
    }
  },

  listeners: {
    'google-youtube-ready': '_onYoutubeReady'
  },

  _seekTo: function(newTime) {
    var player = this.$.player;

    if (player.duration == 1 || newTime < player.duration) {
      player.seekTo(newTime);
    }
  },

  _onYoutubeReady: function() {
    this.__pauseOnFirstSeek = this.state == 'paused';

    if (!this.__pauseOnFirstSeek || this.startTime) {
      this._seekTo(this.startTime);
    }
  },

  _currentTimeChanged: function(newTime, oldTime) {
    var apiState = this.__readableStateToApiState(this.state);

    if (apiState != 2 || this.__state != 2) {
      return;
    }

    this._seekTo(newTime);
  },

  _ytCurrentTimeChanged: function(ytCurrentTime) {
    if (this.__state === this.__apiStates.PAUSED) {
      return;
    }

    this.currentTime = ytCurrentTime;
  },

  _stateChanged: function(newState, oldState) {
    var newApiState = this.__readableStateToApiState(newState);

    if (newApiState == this.__state ||
        this.__state == this.__apiStates.UNSTARTED) {
      return;
    }

    this.currentTime = this.__currentTime;
    var player = this.$.player;

    switch (newApiState) {
      case this.__apiStates.PLAYING:
        player.play();
        break;
      case this.__apiStates.PAUSED:
        player.pause();
        break;
      default:
        return;
    }
  },

  __ytApiStateChange: function(newState, oldState) {
    var readableState;

    switch (newState) {
      case this.__apiStates.ENDED:
        readableState = this.__states.PAUSED;
        break;
      case this.__apiStates.PLAYING:
        readableState = this.__states.PLAYING;
        break;
      case this.__apiStates.PAUSED:
        readableState = this.__states.PAUSED;
        break;
      default:
        return;
    }

    if (this.state == readableState) {
      return;
    }

    if (this.__pauseOnFirstSeek && readableState == this.__states.PLAYING) {
      this.__pauseOnFirstSeek = false;
      this.$.player.pause();
      return;
    }

    this.state = readableState;
    this.currentTime = this.__currentTime;
  },

  __readableStateToApiState: function(readableState) {
    var newApiState  = -2;

    if (readableState == this.__states.PLAYING) {
      newApiState = this.__apiStates.PLAYING;

    } else if (readableState = this.__states.PAUSED) {
      newApiState = this.__apiStates.PAUSED;
    }

    return newApiState;
  },

  __states: {
    PLAYING: 'playing',
    PAUSED: 'paused'
  },

  __apiStates: {
    UNSTARTED: -1,
    ENDED: 0,
    PLAYING: 1,
    PAUSED: 2,
    BUFFERING: 3,
    QUEUED: 5
  }
});
