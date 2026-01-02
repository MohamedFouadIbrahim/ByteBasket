import { Container, ThemedText } from "@/components";
import { RootStackParamList } from "@/navigation/types";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { EmptyFavorites } from "../components/EmptyFavorites";
import { FavoriteCard } from "../components/FavoriteCard";
import { useFavorites } from "../hooks/useFavorites";

type FavoritesScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export function FavoritesScreen() {
    const { favorites, favoritesCount } = useFavorites();
    const navigation = useNavigation<FavoritesScreenNavigationProp>();

    return (
        <Container>
            <FlatList
                ListHeaderComponent={()=>(
                    <ThemedText type="subtitle" >
                        {`Favorites : ${favoritesCount}`}
                    </ThemedText>
                )}
                data={favorites}
                renderItem={({ item }) => (
                    <FavoriteCard
                        product={item}
                        onPress={() => {
                            navigation.navigate('ProductDetail', { product: item });
                        }}
                    />
                )}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={()=>{
                    return (
                        <Container>
                            <EmptyFavorites />
                        </Container>
                    )
                }}
            />
        </Container>
    );
}

const styles = StyleSheet.create({
    listContent: {
        padding: 16,
    },
});
