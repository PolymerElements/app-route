import '../polymer/polymer.js';
import { AppRouteConverterBehavior } from './app-route-converter-behavior.js';
import { Polymer } from '../polymer/lib/legacy/polymer-fn.js';

Polymer({
  is: 'app-route-converter',

  behaviors: [AppRouteConverterBehavior]
});
