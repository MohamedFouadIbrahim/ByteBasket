import { Container } from "@/components";
import { Colors } from "@/constants/theme";
import { RootStackParamList } from "@/navigation/types";
import { toggleFavorite } from "@/redux/favorites.store";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchProducts } from "@/redux/products.store";
import { shareProduct } from "@/utils";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { ActivityIndicator, Alert, AppState, Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Product } from "../types/products.types";


type Props = NativeStackScreenProps<RootStackParamList, 'ProductDetail'>;

export function ProductDetailScreen({ route }: Props) {
    const navigation = useNavigation()
    const { product: routeProduct, productId } = route.params;
    const [product, setProduct] = useState<Product | null>(routeProduct || null);
    const [loading, setLoading] = useState(!routeProduct);
    const [quantity, setQuantity] = useState(1);
    const dispatch = useAppDispatch();
    const products = useAppSelector((state) => state.products.products);
    const favorites = useAppSelector((state) => state.favorites.favorites);
    const isAppReady = useRef(AppState.currentState === 'active');
    // Handle deep link: fetch product by ID from Redux store
    useEffect(() => {
        if (productId && !routeProduct) {
            // Try to find product in Redux store
            const foundProduct = products.find(p => p.id === productId);

            if (foundProduct) {
                setProduct(foundProduct);
                setLoading(false);
            } else {
                // If products not loaded yet, dispatch fetch
                 if (products.length === 0) {
                    setLoading(true);
                    dispatch(fetchProducts())
                        .unwrap()
                        .then((fetchedProducts) => {
                            // Use the fetched products, not the stale 'products' from closure
                            const prod = fetchedProducts.find((p: Product) => p.id === productId);
                            if (prod) {
                                setProduct(prod);
                            } else {
                                // Product not found - show error only if app was ready
                                if (isAppReady.current) {
                                    Alert.alert(
                                        'Product Not Found',
                                        'The product you are looking for could not be found.',
                                        [{ text: 'OK', onPress: () => navigation.goBack() }]
                                    );
                                }
                            }
                            setLoading(false);
                        })
                        .catch((error) => {
                            console.error('Failed to fetch products:', error);
                            setLoading(false);
                        });
                } else {
                    // Products loaded but product not found
                    Alert.alert(
                        'Product Not Found',
                        'The product you are looking for could not be found.',
                        [{ text: 'OK', onPress: () => navigation.goBack() }]
                    );
                    setLoading(false);
                }
            }
        }
    }, [productId, routeProduct, products, dispatch, navigation]);

    const handleShare = async () => {
        if (!product) return;

        await shareProduct({
            product,
            onSuccess: () => {
                console.log('Product shared successfully');
            },
            onError: (error) => {
                Alert.alert('Share Failed', error.message);
            },
        });
    };
    const isFavorite = useMemo(
        () => product ? favorites.some((item) => item.id === product.id) : false,
        [favorites, product]
    );

    const handleToggleFavorite = () => {
        if (product) {
            dispatch(toggleFavorite(product));
        }
    };

    const incrementQuantity = () => setQuantity(prev => prev + 1);
    const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));


    // Show loading state while fetching product from deep link
    if (loading) {
        return (
            <Container edges={['bottom']}>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={Colors.default.Primary} />
                    <Text style={styles.loadingText}>Loading product...</Text>
                </View>
            </Container>
        );
    }
    
    // Safety check
    if (!product) {
        return null;
    }

    return (
          <Container edges={['bottom']} >
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={Platform.OS === 'web' ? styles.webScrollContent : undefined}
            >
                <View style={Platform.OS === 'web' ? styles.webContentContainer : undefined}>
                    {/* Product Image */}
                    <View style={[
                        styles.imageContainer,
                        Platform.OS === 'web' && styles.webImageContainer
                    ]}>
                        <Image
                            source={{ uri: product.image }}
                            style={styles.productImage}
                            resizeMode="stretch"
                        />
                    </View>

                {/* Action Buttons */}
                <View style={styles.actionButtons}>
                    <TouchableOpacity style={styles.actionButton} onPress={handleShare} >
                        <Ionicons name="share-social-outline" size={20} color="#333" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={handleToggleFavorite}
                    >
                        <Ionicons
                            name={isFavorite ? "heart" : "heart-outline"}
                            size={20}
                            color={isFavorite ? Colors.default.Red : "#333"}
                        />
                    </TouchableOpacity>
                </View>

                {/* Product Info */}
                <View style={styles.productInfo}>
                    <Text style={styles.productName}>{product.name}</Text>
                    <View style={styles.priceRow}>
                        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
                        <View style={styles.stockBadge}>
                            <Text style={styles.stockText}>In Stock</Text>
                        </View>
                    </View>

                    {/* Rating */}
                    <View style={styles.ratingContainer}>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Ionicons
                                key={star}
                                name={star <= 4 ? "star" : "star-outline"}
                                size={16}
                                color="#FFA500"
                            />
                        ))}
                        <Text style={styles.ratingText}>4.8 (120 Reviews)</Text>
                    </View>

                    {/* Quantity and Add to Cart */}
                    <View style={styles.cartSection}>
                        <View style={styles.quantitySelector}>
                            <TouchableOpacity onPress={decrementQuantity} style={styles.quantityButton}>
                                <Text style={styles.quantityButtonText}>−</Text>
                            </TouchableOpacity>
                            <Text style={styles.quantityText}>{quantity}</Text>
                            <TouchableOpacity onPress={incrementQuantity} style={styles.quantityButton}>
                                <Text style={styles.quantityButtonText}>+</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.addToCartButton}>
                            <Ionicons name="cart-outline" size={20} color="#fff" />
                            <Text style={styles.addToCartText}>Add to Cart</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Description */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Description</Text>
                        <Text style={styles.description} numberOfLines={4}>
                            {product.description}
                        </Text>
                    </View>

                    {/* Key Features */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Key Features</Text>
                        <View style={styles.featuresGrid}>
                            <View style={styles.featureItem}>
                                <View style={[styles.featureIcon, { backgroundColor: '#FFE8D6' }]}>
                                    <Ionicons name="battery-charging" size={20} color="#FF9D5C" />
                                </View>
                                <Text style={styles.featureLabel}>Battery</Text>
                                <Text style={styles.featureValue}>40 Hrs</Text>
                            </View>
                            <View style={styles.featureItem}>
                                <View style={[styles.featureIcon, { backgroundColor: '#E8D6FF' }]}>
                                    <MaterialCommunityIcons name="headphones" size={20} color="#9D5CFF" />
                                </View>
                                <Text style={styles.featureLabel}>Noise</Text>
                                <Text style={styles.featureValue}>Cancelling</Text>
                            </View>
                            <View style={styles.featureItem}>
                                <View style={[styles.featureIcon, { backgroundColor: '#FFE8D6' }]}>
                                    <Ionicons name="volume-high" size={20} color="#FF9D5C" />
                                </View>
                                <Text style={styles.featureLabel}>Optimal</Text>
                                <Text style={styles.featureValue}>V5.2</Text>
                            </View>
                            <View style={styles.featureItem}>
                                <View style={[styles.featureIcon, { backgroundColor: '#D6FFE8' }]}>
                                    <Ionicons name="analytics" size={20} color="#5CFF9D" />
                                </View>
                                <Text style={styles.featureLabel}>Bass</Text>
                                <Text style={styles.featureValue}>8 Mics</Text>
                            </View>
                        </View>
                    </View>

                    {/* Reviews */}
                    <View style={styles.section}>
                        <View style={styles.reviewsHeader}>
                            <Text style={styles.sectionTitle}>Reviews</Text>
                            <TouchableOpacity>
                                <Text style={styles.seeAllText}>See all</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.reviewsContainer}>
                            <View style={styles.ratingScore}>
                                <Text style={styles.ratingScoreNumber}>4.8</Text>
                                <View style={styles.stars}>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Ionicons
                                            key={star}
                                            name="star"
                                            size={14}
                                            color="#FFA500"
                                        />
                                    ))}
                                </View>
                                <Text style={styles.reviewCount}>120 reviews</Text>
                            </View>

                            <View style={styles.ratingBars}>
                                {[
                                    { stars: 5, percentage: 60 },
                                    { stars: 4, percentage: 25 },
                                    { stars: 3, percentage: 10 },
                                    { stars: 2, percentage: 3 },
                                    { stars: 1, percentage: 2 },
                                ].map((item) => (
                                    <View key={item.stars} style={styles.ratingBarRow}>
                                        <Ionicons name="star" size={12} color="#FFA500" />
                                        <Text style={styles.ratingBarLabel}>{item.stars}</Text>
                                        <View style={styles.ratingBarBackground}>
                                            <View
                                                style={[
                                                    styles.ratingBarFill,
                                                    { width: `${item.percentage}%` }
                                                ]}
                                            />
                                        </View>
                                        <Text style={styles.ratingBarPercentage}>{item.percentage}%</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    </View>
                </View>
                </View>
            </ScrollView>
        </Container>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    webScrollContent: {
        alignItems: 'center',
    },
    webContentContainer: {
        maxWidth: 1200,
        width: '100%',
    },
    imageContainer: {
        width: '100%',
        height: 200,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    webImageContainer: {
        height: 500,
    },
    productImage: {
        width: '100%',
        height: '100%',
    },
    indicators: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 20,
        gap: 6,
    },
    indicator: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#DDD',
    },
    activeIndicator: {
        backgroundColor: '#4A90E2',
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    actionButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    productInfo: {
        padding: 16,
    },
    productName: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    price: {
        fontSize: 24,
        fontWeight: '700',
        color: '#4A90E2',
    },
    stockBadge: {
        backgroundColor: '#E8F5E9',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
    },
    stockText: {
        color: '#4CAF50',
        fontSize: 12,
        fontWeight: '600',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginBottom: 20,
    },
    ratingText: {
        fontSize: 14,
        color: '#666',
        marginLeft: 4,
    },
    section: {
        marginTop: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 12,
    },
    colorOptions: {
        flexDirection: 'row',
        gap: 12,
    },
    colorOption: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'transparent',
    },
    colorSelected: {
        borderColor: '#4A90E2',
    },
    colorCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
    },
    cartSection: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 20,
    },
    quantitySelector: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 12,
        paddingHorizontal: 8,
    },
    quantityButton: {
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantityButtonText: {
        fontSize: 20,
        color: '#333',
    },
    quantityText: {
        fontSize: 16,
        fontWeight: '600',
        marginHorizontal: 12,
        minWidth: 24,
        textAlign: 'center',
    },
    addToCartButton: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#4A90E2',
        borderRadius: 12,
        paddingVertical: 12,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },
    addToCartText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    description: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
    readMoreText: {
        color: '#4A90E2',
        fontSize: 14,
        fontWeight: '600',
        marginTop: 8,
    },
    featuresGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    featureItem: {
        width: '48%',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#F9F9F9',
        borderRadius: 12,
    },
    featureIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    featureLabel: {
        fontSize: 12,
        color: '#999',
        marginBottom: 2,
    },
    featureValue: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
    reviewsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    seeAllText: {
        color: '#4A90E2',
        fontSize: 14,
        fontWeight: '600',
    },
    reviewsContainer: {
        flexDirection: 'row',
        gap: 20,
    },
    ratingScore: {
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 80,
    },
    ratingScoreNumber: {
        fontSize: 32,
        fontWeight: '700',
        color: '#333',
        marginBottom: 4,
    },
    stars: {
        flexDirection: 'row',
        gap: 2,
        marginBottom: 4,
    },
    reviewCount: {
        fontSize: 12,
        color: '#999',
    },
    ratingBars: {
        flex: 1,
        gap: 8,
    },
    ratingBarRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    ratingBarLabel: {
        fontSize: 12,
        color: '#666',
        width: 12,
    },
    ratingBarBackground: {
        flex: 1,
        height: 6,
        backgroundColor: '#F0F0F0',
        borderRadius: 3,
        overflow: 'hidden',
    },
    ratingBarFill: {
        height: '100%',
        backgroundColor: '#4A90E2',
        borderRadius: 3,
    },
    ratingBarPercentage: {
        fontSize: 12,
        color: '#666',
        width: 32,
        textAlign: 'right',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 16,
    },
    loadingText: {
        fontSize: 16,
        color: '#666',
    },
});