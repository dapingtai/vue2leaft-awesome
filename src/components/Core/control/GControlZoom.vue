<template>
  <div style="display: none;">
    <slot v-if="ready"></slot>
  </div>
</template>

<script>
import { optionsMerger, propsBinder } from 'vue2-leaflet/src/utils/utils.js';
import ControlMixin from 'vue2-leaflet/src/mixins/Control.js';
import Options from 'vue2-leaflet/src/mixins/Options.js';
import {Control, DomUtil} from 'leaflet';

/** Custom Zoom Function**/
let Zoom = Control.Zoom.extend({
  options: {
    position: 'topleft',
    zoomInText: '+',
    zoomInTitle: 'Zoom in',
    zoomOutText: '&#x2212;',
    zoomOutTitle: 'Zoom out'
  },
  onAdd: function (map) {
    let container = DomUtil.create('div', 'geocloud-control-zoom geocloud-bar leaflet-control');
    let zoomName = 'geoclud-control-zoom';
    let options = this.options;

    this._zoomInButton = this._createButton(options.zoomInText, options.zoomInTitle,
        zoomName + '-in', container, this._zoomIn, this);
    this._zoomOutButton = this._createButton(options.zoomOutText, options.zoomOutTitle,
        zoomName + '-out', container, this._zoomOut, this);

    return container;
  }
})

let zoom = function (options) {
  return new Zoom(options);
};


/**
 * Add any custom component as a leaflet control-zoom
 */
export default {
  name: 'GControlZoom',
  mixins: [ControlMixin, Options],
  props: {
    zoomInText: {
      type: String,
      default: '<i class="fa fa-plus"></i>',
    },
    zoomInTitle: {
      type: String,
      default: 'Geocloud Zoom in',
    },
    zoomOutText: {
      type: String,
      default: '<i class="fa fa-minus"></i>',
    },
    zoomOutTitle: {
      type: String,
      default: 'Geocloud Zoom out',
    },
  },
  data() {
    return { ready: false }
  },
  mounted() {
    const options = optionsMerger(
      {
        ...this.controlOptions,
        zoomInText: this.zoomInText,
        zoomInTitle: this.zoomInTitle,
        zoomOutText: this.zoomOutText,
        zoomOutTitle: this.zoomOutTitle,
      },
      this
    );

    this.mapObject = zoom(options);
    propsBinder(this, this.mapObject, this.$options.props);
    this.mapObject.addTo(this.$parent.mapObject);
    this.ready = true;
    this.$nextTick(() => {
      /**
       * Triggers when the component is ready
       * @type {object}
       * @property {object} mapObject - reference to leaflet map object
       */
      this.$emit('ready', this.mapObject);
    });
  },
  render() {
    return null;
  },
};
</script>

<style>
.geocloud-bar a{
  border-radius: 2px;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12);
  color: #2196F3;
  background-color: #fff;
  width: 30px;
  height: 30px;
  line-height: 30px;
  display: block;
  text-align: center;
  text-decoration: none;
  margin-bottom: 4px;
  cursor: pointer;
  font-size: 12px;
}
</style>

