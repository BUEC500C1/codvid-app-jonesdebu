import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import {Geojson} from 'react-native-maps';




export default class App extends Component {
  constructor(){
    super();
    global.myPlace = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: [64.165329, 48.844287],
      }
    }
  ]
};

  }
  handlePress = async () => {
    fetch('https://api.covid19api.com/country/south-africa/status/confirmed/live?from=2020-04-01T00:00:00Z&to=2020-04-10T00:00:00Z', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },

    })

    .then((response) => response.json())
    .then((response) => {
      console.log(response[0])

      myPlace = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'Point',
              coordinates: [response[0].Lat, response[0].Lon],
            }
          }
        ]
      };

      return myPlace

    })
    .catch((error) => {
      console.error(error);
    });
  }




  render() {
    //var Coor = this.handlePress
    console.log('test')
    //console.log(Coor)
    return(
      <View style={ {paddingTop: 1000, paddingLeft: 50 }}>

        <MapView
        onMapReady = {this.handlePress.bind(this)}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        >
          <Geojson
            geojson={myPlace}
            strokeColor="red"
            fillColor="green"
            strokeWidth={2}
          />
        </MapView>
      </View>
    )
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
