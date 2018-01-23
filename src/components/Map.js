import React from "react"
import { compose, withProps, withHandlers } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import { MarkerClusterer } from "react-google-maps/lib/components/addons/MarkerClusterer"
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as airportsAction from '../actions/airports'

const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `92vh` }} />,
    containerElement: <div style={{ height: `92vh` }} />,
    mapElement: <div style={{ height: `92vh` }} />,
  }),
    withHandlers({
    onMarkerClustererClick: () => (markerClusterer) => {
      const clickedMarkers = markerClusterer.getMarkers()
    },
  }),
  withScriptjs,
  withGoogleMap
  )((props) =>
    <GoogleMap defaultZoom={7} defaultCenter={{ lat: props.lat, lng: props.lng }}>
      {props.isMarkerShown && <Marker position={{ lat: props.lat, lng: props.lng }} onClick={props.onMarkerClick} />}
      <MarkerClusterer
      onClick={props.onMarkerClustererClick}
      averageCenter
      enableRetinaIcons
      gridSize={60}
    >
      {props.markers.map(marker => (
        <Marker
          position={{ lat: marker.latitude_deg, lng: marker.longitude_deg }}
        />
      ))}
    </MarkerClusterer>
    </GoogleMap>
)

class Map extends React.PureComponent {
  state = {
    isMarkerShown: true,
  }

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false })
  }

  componentWillMount = () => {
    this.props.airportsAction.airports(this.props.location.lat, this.props.location.lng)
  }

  render() {
    console.log("airports", this.state.airports)
    return (

        <MyMapComponent
          lat={this.props.location.lat}
          lng={this.props.location.lng}
          markers={this.props.airports}
          isMarkerShown={this.state.isMarkerShown}
          onMarkerClick={this.handleMarkerClick}
        />
    
    )
  }
}

function mapStateToProps(state, props) {
  return {
    location: state.location,
    airports: state.airports
  }
}

function mapDispatchToProps(dispatch) {
  return {
    airportsAction: bindActionCreators(airportsAction, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);
