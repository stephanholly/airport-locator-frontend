import React from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

import * as locationAction from '../actions/location'

class Home extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      address: '',
      geocodeResults: null,
      loading: false,
      latlong: null
    }
    this.handleSelect = this.handleSelect.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.renderGeocodeFailure = this.renderGeocodeFailure.bind(this)
    this.renderGeocodeSuccess = this.renderGeocodeSuccess.bind(this)
  }

  handleSelect(address) {
    this.setState({
      address,
      loading: true,
    })

  geocodeByAddress(address)
    .then(results => getLatLng(results[0]))
    .then(({ lat, lng }) => {
      console.log('Success Yay', { lat, lng })
      this.setState({
        geocodeResults: this.renderGeocodeSuccess(lat, lng),
        loading: false,
        latlong: { lat, lng }
      })
    })
    .catch(error => {
      console.log('Oh no!', error)
      this.setState({
        geocodeResults: this.renderGeocodeFailure(error),
        loading: false,
      })
    })
  }

  handleChange(address) {
    this.setState({
      address,
      geocodeResults: null,
    })
  }

  renderGeocodeFailure(err) {
    return (
      <div className="alert alert-danger" role="alert">
        <strong>Error!</strong> {err}
      </div>
    )
  }

  renderGeocodeSuccess(lat, lng) {
    return (
      <div className="alert alert-success" role="alert">
        <strong>Success!</strong> Geocoder found latitude and longitude:{' '}
        <strong>
          {lat}, {lng}
        </strong>
      </div>
    )
  }

  render() {
    const AutocompleteItem = ({ formattedSuggestion }) => (
      <div className="Demo__suggestion-item">
        <i className="fa fa-map-marker Demo__suggestion-icon" />
        <strong>{formattedSuggestion.mainText}</strong>{' '}
        <small className="text-muted">
          {formattedSuggestion.secondaryText}
        </small>
      </div>
    )

    const cssClasses = {
      root: 'form-group',
      input: 'form-control',
      autocompleteContainer: 'my-autocomplete-container'
    }

    const defaultStyles = {
      root: {
        position: 'relative',
        paddingBottom: '0px',
      },
      input: {
        display: 'inline-block',
        width: '100%',
        padding: '10px',
      },
      autocompleteContainer: {
        position: 'absolute',
        top: '100%',
        backgroundColor: 'white',
        border: '1px solid #555555',
        width: '100%',
      },
      autocompleteItem: {
        backgroundColor: '#ffffff',
        padding: '10px',
        color: '#555555',
        cursor: 'pointer',
      },
      autocompleteItemActive: {
        backgroundColor: '#fafafa'
      },
    }

    const inputProps = {
      value: this.state.address,
      onChange: this.handleChange,
      placeholder: 'select a city...'
    }

    const shouldFetchSuggestions = ({ value }) => value.length > 2

    const onError = (status, clearSuggestions) => {
      console.log(
        'Error happened while fetching suggestions from Google Maps API',
        status
      )
      clearSuggestions()
    }

  return (
      <div className="main-container">
      <div className="blur"></div>
       <div className="search">
          <PlacesAutocomplete
            classNames={cssClasses}
            onSelect={this.handleSelect}
            onError={onError}
            renderSuggestion={AutocompleteItem}
            onEnterKeyDown={this.handleSelect}
            inputProps={inputProps}
            styles={defaultStyles}
            shouldFetchSuggestions={shouldFetchSuggestions}
          />
        <Link className="search-button" to="/map">
            <input
              type="submit"
              value="search"
              onClick={(e) => this.props.locationAction.location(this.state.latlong)}
            />
          </Link>
       </div>
      </div>
  )
}
}

function mapStateToProps(state, props) {
  return {
    location: state.location
  }
}

function mapDispatchToProps(dispatch) {
  return {
    locationAction: bindActionCreators(locationAction, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
