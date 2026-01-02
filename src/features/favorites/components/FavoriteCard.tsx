import { ThemedText } from '@/components';
import { Colors } from '@/constants/theme';
import type { Product } from '@/features/home/types/products.types';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';

interface FavoriteCardProps {
  product: Product;
  onPress?: (product: Product) => void;
}

export function FavoriteCard({ product, onPress }: FavoriteCardProps) {
  

  return (
    <Pressable style={styles.card} onPress={() => { onPress && onPress(product)}}>
      <Image
        source={{ uri: product.image }}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <View style={styles.header}>
          <ThemedText style={styles.name} numberOfLines={1}>
            {product.name}
          </ThemedText>
          <TouchableOpacity
            style={styles.favoriteButton}
          >
            <Ionicons name="heart" size={20} color={Colors.default.Red} />
          </TouchableOpacity>
        </View>

        <ThemedText style={styles.price}>
          ${product.price.toFixed(2)}
        </ThemedText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    margin: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  image: {
    width: 100,
    height: 100,
    backgroundColor: '#f0f0f0',
  },
  content: {
    flex: 1,
    padding: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  name: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    marginRight: 8,
  },
  favoriteButton: {
    padding: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
});
