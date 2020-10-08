import ControlGeolocation from './ControlGeolocation';
import ControlZoom from './ControlZoom';
import ControlLayer from "./ControlLayers";
import ControlLocalGeojson from "./ControlLocalGeojson";
import ControlMultiImages from "./ControlMultiImages";
import ControlGeocodingSearch from "./ControlGeocodingSearch";
import TopRightButton from './TopRightButton';

let GControl = {
    ControlGeolocation, ControlZoom,
    ControlLayer, ControlLocalGeojson,
    ControlMultiImages, ControlGeocodingSearch
    , TopRightButton
};

export default GControl;
