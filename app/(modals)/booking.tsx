import { View, Text, StyleSheet, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import { BlurView } from 'expo-blur'
import Animated, { FadeIn, FadeOut, SlideInDown } from 'react-native-reanimated'
import { defaultStyles } from '@/constants/Styles'
import { SignedIn } from '@clerk/clerk-expo'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { router, useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import Colors from '@/constants/Colors'
import { places } from '@/assets/data/places'
//@ts-ignore
import DatePicker from 'react-native-modern-datepicker'

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const guestsGroups = [
  {
    name: 'Adults',
    text: 'Ages 13 or above',
    count: 0,
  },
  {
    name: 'Children',
    text: 'Ages 2-12',
    count: 0,
  },
  {
    name: 'Infants',
    text: 'Under 2',
    count: 0,
  },
  {
    name: 'Pets',
    text: 'Pets allowed',
    count: 0,
  },
];

const Booking = () => {
  const router = useRouter();
  const [openCard, setOpenCard] = useState(0);
  const [selectedPlace, setSelectedPlace] = useState(0);
  const [groups, setGroups] = useState(guestsGroups)
  const today = new Date().toISOString().substring(0, 10);
  const onClearAll = () => {
    setOpenCard(0);
    setSelectedPlace(0);
    setGroups(guestsGroups)
  }
  return (
    <BlurView intensity={70} style={styles.container} tint='light'>
      <View style={styles.card}>
        {openCard != 0 && (
        <AnimatedTouchableOpacity onPress={() => setOpenCard(0)} style={styles.cardPreview} entering={FadeIn.duration(200)} exiting={FadeOut.duration(200)}>
          <Text style={styles.previewText}>Where</Text>
          <Text style={styles.previewDate}>I'm flexible</Text>
        </AnimatedTouchableOpacity>)
        }
        {openCard === 0 &&(
          <>
          <Animated.Text entering={FadeIn} style={styles.cardHeader}>Where to?
          </Animated.Text>
          <Animated.View style={styles.cardBody}>
            <View style={styles.searchSection}>
              <Ionicons style={styles.searchIcon} name='ios-search' size={20} color={'#000'} />
              <TextInput style={styles.inputField} placeholder='Search Destination' placeholderTextColor={Colors.grey}/>
            </View>
          </Animated.View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{gap: 25, paddingLeft: 20, marginBottom: 30,}}>
              {places.map((item, index) => (
                <TouchableOpacity key={index} onPress={() => setSelectedPlace(index)}>
                  <Image source={item.img} style={selectedPlace === index ? styles.placeSelected : styles.place}/>
                  <Text style={[{paddingTop: 6}, selectedPlace === index ? {fontFamily: 'mon-sb'} : {fontFamily: 'mon'}]}>{item.title}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </>
        )}
      </View>
      <View style={styles.card}>
        {openCard != 1 && (
        <AnimatedTouchableOpacity onPress={() => setOpenCard(1)} style={styles.cardPreview} entering={FadeIn.duration(200)} exiting={FadeOut.duration(200)}>
          <Text style={styles.previewText}>When</Text>
          <Text style={styles.previewDate}>Any Week</Text>
        </AnimatedTouchableOpacity>)
        }
        {openCard === 1 &&(
          <>
          <Animated.Text entering={FadeIn} style={styles.cardHeader}>When's your trip
          </Animated.Text>
          <Animated.View style={styles.cardBody}>
          <DatePicker current={today} selected={today} mode={'Calender'} options={{ 
            headerFont: 'mon-sb',
            defaultFont: 'mon',
            borderColor: 'transparent',
            mainColor: Colors.primary,
            }}/>
          </Animated.View>
          </>
        )}
      </View>
      <View style={styles.card}>
        {openCard != 2 && (
        <AnimatedTouchableOpacity onPress={() => setOpenCard(2)} style={styles.cardPreview} entering={FadeIn.duration(200)} exiting={FadeOut.duration(200)}>
          <Text style={styles.previewText}>Who</Text>
          <Text style={styles.previewDate}>Add Guest</Text>
        </AnimatedTouchableOpacity>)
        }
        {openCard === 2 &&(
          <>
          <Animated.Text entering={FadeIn} style={styles.cardHeader}>Who's coming?
          </Animated.Text>
          <Animated.View style={styles.cardBody}>
            {groups.map((item, index) => (
            <View key={index} style={[styles.guestItem, index + 1 < guestsGroups.length ? styles.itemBorder : null]}>
              <View>
                <Text style={{fontFamily: 'mon-sb', fontSize: 14,}}>{item.name}</Text>
                <Text style={{fontFamily: 'mon-sb', fontSize: 14, color: Colors.grey}}>{item.text}</Text>
              </View>
              <View style={{flexDirection: 'row', gap: 10,alignItems: 'center', justifyContent: 'center'}}>
                <TouchableOpacity onPress={() => {
                  const newGroups = [...groups];
                  newGroups[index].count = newGroups[index].count > 0 ? newGroups[index].count -1 : 0;
                  setGroups(newGroups);
                }} >
                  <Ionicons name='remove-circle-outline' size={26} color={groups[index].count > 0 ? Colors.grey: '#cdcdcd'}/>
                </TouchableOpacity >
                <Text style={{fontFamily: 'mon', fontSize: 16, minWidth: 18, textAlign: 'center', }}>{item.count}</Text>
                <TouchableOpacity onPress={() => {
                  const newGroups = [...groups];
                  newGroups[index].count++;
                  setGroups(newGroups);
                }}>
                  <Ionicons name='add-circle-outline' size={26} color={Colors.grey}/>
                </TouchableOpacity>
              </View>
            </View>
            ))}
          </Animated.View>
          </>
        )}
      </View>
      <Animated.View style={defaultStyles.footer} entering={SlideInDown.delay(200)}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <TouchableOpacity onPress={onClearAll} style={{justifyContent: 'center'}}>
          <Text style={{fontSize: 18, fontFamily: 'mon-sb', textDecorationLine: 'underline'}}>Clear All</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.back()} style={[defaultStyles.btn,{paddingRight: 20, paddingLeft: 50}]}>
          <Ionicons name='search-outline' size={24} color={'#fff'} style={[defaultStyles.btnIcon]} />
          <Text style={[defaultStyles.btnText]}>Clear All</Text>
        </TouchableOpacity>
        </View>
      </Animated.View>
    </BlurView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingTop: 100,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    margin: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    gap: 20,
  },
  previewText: {
    fontFamily: 'mon-sb',
    color: Colors.grey,
    fontSize: 14,
  },
  previewDate: {
    fontFamily:'mon-sb',
    color: Colors.dark,
    fontSize: 14,
  },
  cardPreview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  cardHeader: {
    padding: 20,
    fontFamily:'mon-sb',
    fontSize: 24,
  },
  cardBody: {
    paddingHorizontal: 20,
  },
  searchSection:{
    height: 50,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ABABAB',
    borderRadius: 8,
    backgroundColor: '#fff',
    alignContent: 'center',
    alignItems: 'center',
  },
  searchIcon:{
    padding: 10,
  },
  inputField:{
    flex: 1,
    padding:10,
    backgroundColor: '#fff'
  },
  place:{
    borderRadius: 10,
    width: 120,
    height: 120,
  },
  placeSelected:{
    height:120,
    width: 120,
    borderRadius: 10,
    borderWidth: 2,
    borderColor:Colors.grey,
  },
  guestItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  itemBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.grey,
  },
})

export default Booking