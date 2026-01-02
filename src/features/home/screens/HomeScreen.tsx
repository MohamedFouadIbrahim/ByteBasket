import { Container } from "@/components";
import React, { useMemo, useState } from "react";
import { FlatList, Platform, StyleSheet, TextInput, useWindowDimensions, View } from 'react-native';
import { ProductCard } from "../components/ProductCard";
import { useProducts } from "../hooks/useProducts";

  
export function HomeScreen() {
    const { products, searchProducts } = useProducts()
    const [searchQuery, setSearchQuery] = useState('')    
    const { width } = useWindowDimensions()
    
    const filteredProducts = useMemo(() => {
       return searchProducts(searchQuery)
    }, [products, searchQuery]);

    const isTwoColumn = useMemo(() => {
        return Platform.OS === 'web' && width >= 768;
    }, [width]);

    return (
        <Container>
            <View style={Platform.OS === 'web' ? styles.webContainer : styles.mobileContainer}>
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search products..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        clearButtonMode="while-editing"
                    />
                </View>
                <FlatList
                    data={filteredProducts}
                    renderItem={({ item }) => (
                        <ProductCard product={item}
                        onPress={()=>{
                        }}
                        />
                    )}
                    keyExtractor={(item) => item.id}
                    key={isTwoColumn ? 'two-column' : 'one-column'}
                    numColumns={isTwoColumn ? 2 : 1}
                    contentContainerStyle={styles.listContainer}
                    columnWrapperStyle={isTwoColumn ? styles.columnWrapper : undefined}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </Container>        
    )
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    webContainer: {
        flex: 1,
        maxWidth: 1200,
        width: '100%',
        alignSelf: 'center',
    },
    mobileContainer: {
        flex: 1,
    },
    searchContainer: {
        padding: 16,
        paddingBottom: 8,
    },
    searchInput: {
        height: 48,
        backgroundColor: '#f5f5f5',
        borderRadius: 12,
        paddingHorizontal: 16,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    listContainer: {
        padding: 8,
    },
    columnWrapper: {
        justifyContent: 'space-evenly',
    },
});