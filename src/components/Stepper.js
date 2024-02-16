import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Stepper = ({currentStep, totalSteps}) => {
  const arr = Array(totalSteps).fill(true);
  return (
    <View style={styles.container}>
      <Text style={styles.font}>
        Step {currentStep+1}/{totalSteps}
      </Text>
      <View style={styles.stepContainer}>
        {arr.map((item, index) => (
          <View
            key={index}
            style={[
              styles.step,
              index == currentStep ? {backgroundColor: '#5063EE'} : {},
            ]}></View>
        ))}
      </View>
    </View>
  );
};

export default Stepper;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    gap: 10,
  },
  font: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  stepContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  step: {
    height: 5,
    flex: 1,
    backgroundColor: '#C7C7C7',
    borderRadius: 5,
  },
});
