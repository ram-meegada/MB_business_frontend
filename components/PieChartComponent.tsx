import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PieChart from 'react-native-pie-chart';

const PieChartComponent = () => {
  const widthAndHeight = 250;
  const series = [
    { value: 430, color: '#fbd203' },
    { value: 321, color: '#ffb300' },
    { value: 185, color: '#ff9100' },
    { value: 123, color: '#ff6c00' },
  ]
  const sliceColor = ['#F44336', '#2196F3', '#FFEB3B', '#4CAF50']; // Colors
  const labels = ['Milk', 'Feed', 'Vet', 'Others'];

  return (
    <View style={styles.container}>
      <PieChart
        widthAndHeight={widthAndHeight}
        series={series}
      />

      {/* Labels */}
      <View style={styles.labelContainer}>
        {labels.map((label, index) => (
          <View key={index} style={styles.labelRow}>
            <View style={[styles.colorDot, { backgroundColor: sliceColor[index] }]} />
            <Text>{`${label} - ${series[index]}`}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default PieChartComponent;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 40,
  },
  labelContainer: {
    marginTop: 20,
    alignItems: 'flex-start',
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  colorDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginRight: 8,
  },
});
