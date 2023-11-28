import { Text, View, StyleSheet } from 'react-native'
import React, { memo } from 'react'
import  { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import  MapView from 'react-native-map-clustering'
import { defaultStyles } from '@/constants/Styles';
import { Listings } from '@/interfaces/listings';
import { useRouter } from 'expo-router';

interface Props {
  listing: any;
}

const INITIAL_REGION = {
  latitude: 45.523113676451345,  
  longitude: -73.5937699698697 ,
  latitudeDelta: 2,
  longitudeDelta: 2,
};

const ListingsMap = memo(({listing}: Props) => {
  const router = useRouter();
  const onMarkerSelected = (item: Listings) => {
    router.push(`/listing/${item.id}`);
  };

  const renderCluster = (cluster: any) => {
  const {id, geometry, onPress, properties} = cluster;
  const points = properties.point_count;

  return (
    <Marker key={`cluster-${id}`} coordinate={{longitude: geometry.coordinates[0], latitude: geometry.coordinates[1]}} onPress={onPress}>
      <View style={styles.marker}><Text style={{color:'#000', textAlign:'center', fontFamily: 'mon-sb'}}>{points}</Text></View>
    </Marker>
  )}

    return (
      <View style={defaultStyles.container}>
        <MapView animationEnabled={false} provider={PROVIDER_GOOGLE} style={StyleSheet.absoluteFill} showsUserLocation showsMyLocationButton initialRegion={INITIAL_REGION} clusterColor="#fff" clusterTextColor='#000' clusterFontFamily='mon-sb' renderCluster={renderCluster}>
          {
           listing.map((item: Listings) => (
            <Marker onPress={() => onMarkerSelected(item)} key={item.id} coordinate={{latitude: +item.latitude, longitude: +item.longitude }}>
              <View style={styles.marker}>
                <Text style={styles.markerText}>$ {item.price}</Text>
              </View>
            </Marker>
           ))
          }
        </MapView>
      </View>
    )
  });

  const styles = StyleSheet.create({
    container:{
      flex: 1,
    },
    marker: {
      padding: 8,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
      elevation: 5,
      borderRadius: 12,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 6,
      shadowOffset: {
        width: 1,
        height: 10,
      },
    },
    markerText: {
      fontSize: 14,
      fontFamily: 'mon-sb',
    },
    
  });


export default ListingsMap