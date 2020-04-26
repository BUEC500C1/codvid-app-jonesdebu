import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';



export default class App extends Component {
  handlePress = async () => {
    fetch('https://api.covid19api.com/country/south-africa/status/confirmed/live?from=2020-04-01T00:00:00Z&to=2020-04-10T00:00:00Z', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    /*  body: JSON.stringify({
        "type": "select",
        "args": {
            "columns": [
              "Country"
            ],
        }
      })*/
    })

    .then((response) => response.json())
    .then((response) => {
      Alert.alert("Country: " + response[0].Country + " Current confirmed cases: " + response[0].Cases);
    })
    .catch((error) => {
      console.error(error);
    });
  }

  render() {
    return(
      <View style={ {paddingTop: 50, paddingLeft: 50 }}>
      <Text> Welcome  </Text>
      <Text> WIP </Text>
        <TouchableOpacity onPress={this.handlePress.bind(this)}>
          <Text style={{ paddingTop: 50, paddingLeft: 50, color: '#FF0000'}}>
          Press to show data
          </Text>
        </TouchableOpacity>
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
