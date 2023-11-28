import { View, Text, StyleSheet } from 'react-native'
import React, { useMemo, useRef, useState } from 'react'
import { Listings } from '@/interfaces/listings'
import BottomSheet from '@gorhom/bottom-sheet';
import Listing from './Listing';
import Colors from '@/constants/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';


interface Props {
    listings: Listings[];
    category: string;
}

const ListingsBottomSheet = ({listings, category}: Props) => {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['10%','100%'], []);
    const [refresh, setRefresh] = useState(0);

    const showMap = () => {
        bottomSheetRef.current?.collapse();
        setRefresh(refresh + 1);
    };

  return (
    <BottomSheet ref={bottomSheetRef} index={1} snapPoints={snapPoints} handleIndicatorStyle={{backgroundColor: Colors.grey}} enablePanDownToClose={false} style={styles.sheetContainer}>
        <View style={{flex: 1}}>
            <Listing listings={listings} category={category} refresh={refresh}/>
            <View style={styles.absoluteBtn}>
                <TouchableOpacity onPress={showMap} style={styles.mapBtn}>
                    <Text style={styles.mapBtnText}>Map</Text>
                    <Ionicons name="map" size={20} color={'#fff'} />
                </TouchableOpacity>
            </View>
        </View>
    </BottomSheet>
  )
}
const styles = StyleSheet.create({
    absoluteBtn: {
        position: 'absolute',
        bottom: 30,
        width: '100%',
        alignItems: 'center',
    },
    sheetContainer: {
        backgroundColor: '#fff',
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 4,
        shadowOffset: {
            width: 1,
            height: 1,
        },
        borderRadius: 30,
    },
    mapBtn:{
        backgroundColor: Colors.dark,
        flexDirection: 'row',
        height: 50,
        padding: 16,
        gap: 8,
        alignItems: 'center',
        borderRadius: 30,
    },
    mapBtnText:{
        color: '#fff',
        fontFamily: 'mon-b'
    },
})
export default ListingsBottomSheet