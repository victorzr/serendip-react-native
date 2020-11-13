import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, Alert } from 'react-native';
import Svg, { Polygon } from 'react-native-svg';
import Constants from 'expo-constants';

export default function App() {
  const windowWidth = Dimensions.get('window').width;
  const Center = windowWidth / 2;
  const Radius = Center - 20;

  const [x, setX] = useState(2);
  const [y, setY] = useState(7);
  const [numSides, setNumSides] = useState(3);
  const [polygonPoints, setPolygonPoints] = useState();

  useEffect(() => {
    calculateSides();
    let newPolyPoints = '';
    const angle = 2 * Math.PI / numSides;
    for (let side = 0; side < numSides; side++) {
      const x = Math.cos(angle * side) * Radius + Center;
      const y = Math.sin(angle * side) * Radius + Center;
      newPolyPoints = `${newPolyPoints} ${x},${y}`;
    }
    setPolygonPoints(newPolyPoints);
  }, [numSides, x, y]);

  const isNumber = (n) => {
    const int = parseInt(n, 10);
    return isNaN(int) === false;
  }

  const calculateSides = () => {
    const int = x + y;
    if (int >= 3) {
      setNumSides(int);
    } else {
      createErrorAlert('The total number of sides must be greater than 2');
    }
  }

  const createErrorAlert = (message) =>{
    Alert.alert(
      'An error has occurred',
      message,
      );
    }

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.label}>
          {'X: '}
        </Text>
        <TextInput
          style={styles.textInput}
          defaultValue={x.toString()}
          selectTextOnFocus
          onChangeText={n => {
            if(isNumber(n) && n != ''){
              let int = parseInt(n, 10);
              if (int >= 0) {
                setX(int);
              } else {
                createErrorAlert('X must be greater than 0')
              }
            } else if (n != ''){
              createErrorAlert('X must be a number')
            }

          }}
        />
        <Text style={styles.label}>
          {'Y: '}
        </Text>
        <TextInput
          style={styles.textInput}
          defaultValue={y.toString()}
          selectTextOnFocus
          onChangeText={n => {
            if(isNumber(n)){
              let int = parseInt(n, 10);
              if (int <= 10) {
                setY(int);
              } else {
                createErrorAlert('Y must be less than or equal to 10')
              }
            } else if (n != ''){
              createErrorAlert('Y must be a number');
            }
          }}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.label}>
          {`Number of sides: ${numSides.toString()}`}
        </Text>
      </View>
      <Svg style={styles.svg} width={windowWidth} height={windowWidth}>
        <Polygon
          points={polygonPoints}
          fill="#00c2b8"
        />
      </Svg>
      <StatusBar style="auto"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#fff',
  },
  textContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    marginHorizontal: 12,
  },
  label: {
    fontSize: 20,
  },
  textInput: {
    backgroundColor: '#ecf0f1',
    flex: 1,
    fontSize: 20,
  },
  svg: {
    aspectRatio: 1,
    backgroundColor: '#fff',
  },
});