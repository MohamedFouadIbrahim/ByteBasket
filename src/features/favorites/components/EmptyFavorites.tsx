import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export function EmptyFavorites() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Favorites Empty</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
  },
});
