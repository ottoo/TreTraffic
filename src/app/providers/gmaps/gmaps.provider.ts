import { Injectable } from '@angular/core';
const shortId = require('shortid');
const _ = require('lodash');
const gmaps = require('gmaps');

// Declare variable google so there are no typescript knows about it
declare let google;

@Injectable()
export class GMapsProvider {
  defaultLat: number = 61.4981509;
  defaultLng: number = 23.7610254;
  gmap: any = null;
  markers: Array<any> = [];
  lineRefs: Array<Object> = [];
  hideDelay: Boolean = false;
  selectedMarkerDelay: any;

  constructor() {

  }

  /**
   * Sets up the map on init
   * @param {number}
   * @param {number}
   */
  initGMap(lat: number = this.defaultLat, lng: number = this.defaultLng) {
    this.gmap = new gmaps({
      div: '#maparea',
      lat: lat,
      lng: lng,
      zoom: 14,
      mapTypeControl: false,
      zoomControl: true
    });

    let styles = [
      {
        'featureType': 'road.highway',
        'elementType': 'geometry',
        'stylers': [
          { 'saturation': -100 },
          { 'lightness': -8 },
          { 'gamma': 1.18 }
        ]
      }, {
        'featureType': 'road.arterial',
        'elementType': 'geometry',
        'stylers': [
          { 'saturation': -100 },
          { 'gamma': 1 },
          { 'lightness': -24 }
        ]
      }, {
        'featureType': 'poi',
        'elementType': 'geometry',
        'stylers': [
          { 'saturation': -100 }
        ]
      }, {
        'featureType': 'administrative',
        'stylers': [
          { 'saturation': -100 }
        ]
      }, {
        'featureType': 'transit',
        'stylers': [
          { 'saturation': -100 }
        ]
      }, {
        'featureType': 'water',
        'elementType': 'geometry.fill',
        'stylers': [
          { 'saturation': -100 }
        ]
      }, {
        'featureType': 'road',
        'stylers': [
          { 'saturation': -100 }
        ]
      }, {
        'featureType': 'administrative',
        'stylers': [
          { 'saturation': -100 }
        ]
      }, {
        'featureType': 'landscape',
        'stylers': [
          { 'saturation': -100 }
        ]
      }, {
        'featureType': 'poi',
        'stylers': [
          { 'saturation': -100 }
        ]
      }
    ];

    this.gmap.addStyle({
      styledMapName: 'Styled Map',
      styles: styles,
      mapTypeId: 'map_style'
    });

    this.gmap.setStyle('map_style');

    gmaps.geolocate({
      success: (position) => {
        this.gmap.setCenter(position.coords.latitude, position.coords.longitude);
        this.addMarker({
          id: shortId.generate(),
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          title: 'Title',
          label: 'Label'
        });
      },
      error: (error) => {
        alert('Geolocation failed: ' + error.message);
      },
      not_supported: () => {
        alert('Your browser does not support geolocation');
      }
    });
  }

  /**
   * Gets the vehicle based on its reference number
   * @param {number} vehicleRef
   */
  getVehicleMarker(vehicleRef: number) {
    return _.find(this.markers, { 'vehicleRef': vehicleRef });
  }

  /**
   * Gets the vehicle icon based on its reference number
   * @param {number} lineRef
   */
  getIconPath(lineRef: number) {
    return lineRef ? '/res/number_' + lineRef + '.png' : '';
  }

  /**
   * Adds a new marker on the map if it doesnt yet exist, otherwise it updates the position
   * of the given marker
   * @param {Object} vehicleMarkerConfig
   */
  addMarker(vehicleMarkerConfig) {
    let foundVehicle = this.getVehicleMarker(vehicleMarkerConfig.vehicleRef);

    if (foundVehicle) {
      foundVehicle.setPosition(new google.maps.LatLng(vehicleMarkerConfig.lat,
          vehicleMarkerConfig.lng));
      foundVehicle.set('delay', vehicleMarkerConfig.delay);
    } else {
      if (_.isUndefined(vehicleMarkerConfig.lineRef)) {
        return;
      }

      let markerObj = this.gmap.addMarker({
        id: shortId.generate(),
        icon: this.getIconPath(vehicleMarkerConfig.lineRef),
        lat: vehicleMarkerConfig.lat,
        lng: vehicleMarkerConfig.lng,
        title: vehicleMarkerConfig.title,
        details: {
          delay: vehicleMarkerConfig.delay
        },
        click: (e) => {
          // Delay is in the format P0Y0M0DT0H3M43.000S
          let seconds = e.delay.match(/[M]\d*/g)[1].replace('M', '');
          Materialize.toast(`The bus is late ${seconds} seconds.`, 2000);
          this.selectedMarkerDelay = seconds;
          this.hideDelay = true;
        }
      });

      markerObj.set('lineRef', vehicleMarkerConfig.lineRef);
      markerObj.set('vehicleRef', vehicleMarkerConfig.vehicleRef);
      markerObj.set('delay', vehicleMarkerConfig.delay);
      this.markers.push(markerObj);
    }
  }

  /**
   * Removes a marker from the map
   * @param {Object} markerObj
   */
  removeMarker(markerObj) {
    if (markerObj) {
      markerObj.setMap(null);
    }
  }

  /**
   * Removes all the markers from the map
   */
  removeAllMarkers() {
    this.gmap.removeMarkers();
  }

  /**
   * Toggles the visibility of a marker
   * @param {number} lineRef
   */
  toggleMarkerVisibility(lineRef: number) {
    if (lineRef) {
      let foundMarkers = _.filter(this.markers, (val) => {
        return +val.lineRef === lineRef;
      });

      _.forEach(foundMarkers, (marker) => {
        marker.getVisible() ? marker.setVisible(false) : marker.setVisible(true);
      });
    }
  }

  /**
   * Get the default location for the map
   */
  getDefaultLocation() {
    return { lat: this.defaultLat, lng: this.defaultLng };
  }
}
