import { View } from 'react-native'
import { Stack } from 'expo-router'
import ExploreHeader from '@/components/ExploreHeader';
import { useMemo, useState } from 'react';
import Listing from '@/components/Listing';
import listingsData from '@/assets/data/airbnb-listings.json';
// import listingsDataGeo from '@/assets/data/neighbourhoods.geo.json';
import ListingsMap from '@/components/ListingsMap';
import ListingsBottomSheet from '@/components/ListingsBottomSheet';

const Page = () => {
  const [category, setCategory] = useState<string>("Tiny homes");
  const items = useMemo(() => listingsData as any, []);
  const onDataChanged = (category: string) => {
    setCategory(category)
  }
  return (
    <View style={{flex: 1, marginTop: 80}}>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChanged={onDataChanged} />,
        }}
      />
      {/* <Listing listings={items} category={category}/> */}
      <ListingsMap listing={listingsData}/>
      <ListingsBottomSheet listings={items} category={category}/>
    </View>
  )
}

export default Page