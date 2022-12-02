import React, { Component } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

import LocateControl from './LocateControl';

import L from 'leaflet';
import leafGreen from '../assets/leaf-green.png';
import leafShadow from '../assets/leaf-shadow.png';


export default class MapExample extends Component {

    mapRef = React.createRef()

    state = {
        greenIcon:{
          lat: 39.74739,
          lng: -105.00019,
        },
        userLocation: undefined,
    }

    componentDidUpdate(prevState){
      if (prevState.userLocation !== this.state.userLocation){
        const map = this.mapRef.current.leafletElement
        if (map.distance(this.state.userLocation, desination) < 10){
          alert("You've reached within 10 meters of your destination")
        }
      }
    }

    updateUserLocation = userLocation => {
      this.setState({
        ...this.state,
        userLocation: userLocation 
      })
    }

    greenIcon = L.icon({
        iconUrl: leafGreen,
        shadowUrl: leafShadow,
        iconSize: [38, 95], // size of the icon
        shadowSize: [50, 64], // size of the shadow
        iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62], // the same for the shadow
        popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
        })
    render() {
    const locateOptions = {
        position: 'topright',
        strings: {
            title: 'Show me where I am, yo!'
        },
      onActivate: () => {} // callback before engine starts retrieving locations
    }

    // SHOW CURRENT LOCATION 
    const positionGreenIcon = [this.state.greenIcon.lat, this.state.greenIcon.lng]

    return (
        <Map ref={this.mapRef} center={this.props.center} zoom={this.props.zoom}>
        {/* MAP LAYER */}
            <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />

        {/* CURRENT LOCATION */}
            <LocateControl options={locateOptions} startDirectly updateUserLocation={this.updateUserLocation}/>

        {/* DESTINATION LOCATION  */}
            <Marker position={positionGreenIcon} icon={this.greenIcon}>
                <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </Map>
    );
    }
}