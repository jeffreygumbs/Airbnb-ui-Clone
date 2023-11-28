import { View, Text, TouchableOpacity, StyleSheet, ListRenderItem, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Ionicons } from "@expo/vector-icons";
import { defaultStyles } from '@/constants/Styles';
import { Listings } from '@/interfaces/listings';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';
import { Link } from 'expo-router';
import { BottomSheetFlatList, BottomSheetFlatListMethods } from '@gorhom/bottom-sheet';

interface Props {
    listings: any[];
    category: string;
    refresh: number;
}

const Listing = ({listings: items, category, refresh}: Props) => {
    const [loading, setLoading] = useState(false);
    const listRef = useRef<BottomSheetFlatListMethods>(null);

    useEffect(() => {
        if (refresh) {
            listRef.current?.scrollToOffset({offset: 0, animated: true})
        }
    }, [refresh]);

useEffect(() => {
    console.log(`Reload Listings: ${items.length}`)
    setLoading(true);
    setTimeout(() => {
        setLoading(false);
    }, 200)
}, [category])

const renderRow: ListRenderItem<Listings> = ({item}) => (
    <Link href={`/listing/${item.id}`} asChild>
        <TouchableOpacity>
            <Animated.View style={styles.listing} entering={FadeInRight} exiting={FadeOutLeft}>
                <Image source={{uri: item.medium_url}} style={styles.image}/>
                <TouchableOpacity style={{position: 'absolute', right: 30, top: 30}}>
                    <Ionicons name="heart-outline" size={24} color={"#000"} />
                </TouchableOpacity>
                <View style={{flexDirection: 'row', justifyContent: 'space-between',}}>
                    <Text>{item.name}</Text>
                    <View style={{flexDirection: 'row', gap: 4}}>
                        <Ionicons name="star" size={16} />
                        <Text>{item.review_scores_rating / 20}</Text>
                    </View>
                </View>
                <Text style={{fontFamily: 'mon'}}>{item.room_type}</Text>
                <View style={{flexDirection: 'row', gap: 4}}>
                    <Text style={{fontFamily: 'mon-sb'}}>$ {item.price}</Text>
                    <Text style={{fontFamily: 'mon'}}>night</Text>
                </View>
            </Animated.View>
        </TouchableOpacity>
    </Link>
)
  return (
    <View style={defaultStyles.container}>
      <BottomSheetFlatList renderItem={renderRow} data={loading ? [] : items} ref={listRef} ListHeaderComponent={<Text style={styles.info}>{items.length} house</Text>}/>
    </View>
  )
}

const styles = StyleSheet.create({
    listing: {
        padding: 16,
        gap: 10,
        marginVertical: 16,
    },
    image: {
        width: '100%',
        height: 300,
        borderRadius:10,
    },
    info:{
        marginTop:4,
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'mon-sb',
    }

})

export default Listing