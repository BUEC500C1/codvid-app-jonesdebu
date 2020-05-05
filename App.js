import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import {Geojson} from 'react-native-maps';




export default class App extends Component {
  constructor(){
     global.coords = []
    fetch('https://api.covid19api.com/country/united-states/status/confirmed/live?from=2020-04-01T00:00:00Z&to=2020-04-10T00:00:00Z', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },

    })

    .then((response) => response.json())
    .then((response) => {
      //super();
      coords = [parseFloat(response[0].Lon), parseFloat(response[0].Lat)]
      console.log(coords)
    });

    super();
    global.myPlace = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: [coords[1], coords[0]],// Lon then Lat
      }
    }
  ]
};

  }


  render() {
    //var Coor = this.handlePress
    console.log('test')
    //console.log(Coor)
    return(
      <View style={ {paddingTop: 1000, paddingLeft: 50 }}>

        <MapView
        //onPress = constructor(
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
