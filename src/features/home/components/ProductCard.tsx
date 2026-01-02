import { ThemedText } from "@/components";
import { Colors } from "@/constants/theme";
import { toggleFavorite } from "@/redux/favorites.store";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Ionicons } from "@expo/vector-icons";
import React, { useCallback, useMemo } from "react";
import { Image, Platform, Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import { Product } from "../types/products.types";

interface ProductCardProps {
    product: Product;
    onPress?: (product: Product) => void;
}

export function ProductCard({ product, onPress }: ProductCardProps) {
    const dispatch = useAppDispatch();
    const favorites = useAppSelector((state) => state.favorites.favorites);

    const isFavorite = useMemo(() => favorites.some((item) => item.id === product.id),[favorites, product.id]);
    
    const handleToggleFavorite = useCallback((e: any)=>{
        e.stopPropagation();
        dispatch(toggleFavorite(product));
    },[dispatch])
    
    return (
        <Pressable
            onPress={()=>{ onPress && onPress(product) }}
            style={styles.card}
        >

        <Image 
            source={{uri: product.image}}
            resizeMode="cover"
            style={styles.image}
        />

       <View style={styles.content}>
            <View style={styles.header}>
                <ThemedText style={styles.name} numberOfLines={1}>
                    {product.name}
                </ThemedText>
                    
                <TouchableOpacity
                    style={styles.favoriteButton}
                    onPress={handleToggleFavorite}
                >
                <Ionicons
                    name={isFavorite ? "heart" : "heart-outline"}
                    size={20}
                    color={isFavorite ? Colors.default.Red : "#666"}
                />
                </TouchableOpacity>
            </View>

                <ThemedText style={styles.description} numberOfLines={2}  >
                        {product.description}
                    </ThemedText>
                <ThemedText style={styles.price}>
                    ${product.price.toFixed(2)}
                </ThemedText>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        margin: 8,
        backgroundColor: '#fff',
        flex: 1,
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
        height: 130,
        backgroundColor: '#f0f0f0',
        ...(Platform.OS === 'web' && {
            objectFit: 'cover',
        } as any),
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
        // marginRight: 8,
    },
    description: {
        // flex: 1,
        fontSize: 12,
        // maxWidth: '30%',
        lineHeight:15
        // marginRight: 8,
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
