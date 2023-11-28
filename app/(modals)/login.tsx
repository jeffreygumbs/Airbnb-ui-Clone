import { View, Text,StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowser'
import { TextInput } from 'react-native-gesture-handler'
import { defaultStyles } from '@/constants/Styles'
import Colors from '@/constants/Colors'
import { FontAwesome5, Ionicons } from '@expo/vector-icons'
import { useOAuth } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'

enum Strategy {
    Google = 'oauth_google',
    Apple = 'oauth_apple',
    Microsoft = 'oauth_microsoft',
}

const Login = () => {
    useWarmUpBrowser()
    const router = useRouter()
    const {startOAuthFlow: appleAuth} = useOAuth({strategy: 'oauth_apple'})
    const {startOAuthFlow: googleAuth} = useOAuth({strategy: 'oauth_google'})
    const {startOAuthFlow: microsoftAuth} = useOAuth({strategy: 'oauth_microsoft'})

    const onSelectAuth = async (strategy: Strategy) => {
        const selectedAuth = {
            [Strategy.Google]: googleAuth,
            [Strategy.Apple]: appleAuth,
            [Strategy.Microsoft]: microsoftAuth,
        }[strategy];

        try{
            const { createdSessionId, setActive} = await selectedAuth();
            if(createdSessionId){
                setActive!({session: createdSessionId});
                router.back();
            }
        }
        catch(e){
            console.error('OAuth error', e);
        }
    }

  return (
    <View style={styles.container}>
      <TextInput autoCapitalize='none' placeholder='Email' style={[defaultStyles.inputField, {marginBottom: 30}]} />
      <TouchableOpacity style={defaultStyles.btn}>
        <Text style={defaultStyles.btnText}>Continue</Text>
      </TouchableOpacity>
      <View style={styles.separatorView}>
        <View style={{
            flex:1,
            borderBottomColor: "#000",
            borderBottomWidth: StyleSheet.hairlineWidth,
        }}/>
        <Text style={styles.separatorText}>or</Text>
        <View style={{
            flex:1,
            borderBottomColor: "#000",
            borderBottomWidth: StyleSheet.hairlineWidth,
        }}/>
      </View>
      <View style={{gap: 20}}>
        <TouchableOpacity style={styles.btnOutline}>
            <Ionicons name='call-outline' size={24} style={defaultStyles.btnIcon}/>
            <Text style={styles.btnOutlineText}>Continue with Phone</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnOutline} onPress={() => onSelectAuth(Strategy.Apple)}>
            <Ionicons name='md-logo-apple' size={24} style={defaultStyles.btnIcon}/>
            <Text style={styles.btnOutlineText}>Continue with Apple</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnOutline} onPress={() => onSelectAuth(Strategy.Google)}>
            <Ionicons name='md-logo-google' size={24} style={defaultStyles.btnIcon}/>
            <Text style={styles.btnOutlineText}>Continue with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnOutline} onPress={() => onSelectAuth(Strategy.Microsoft)}>
            <FontAwesome5 name='microsoft' size={24} style={defaultStyles.btnIcon}/>
            <Text style={styles.btnOutlineText}>Continue with Microsoft</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
        padding: 26,
    },
    separatorView:{
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        marginVertical: 20,
    },
    separatorText:{
        fontFamily: 'mon-sb',
        color: Colors.grey,
    },
    btnOutline:{
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: Colors.grey,
        height: 50,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10,
    },
    btnOutlineText:{
        color:'#000',
        fontSize: 16,
        fontFamily: 'mon-sb',
    },
})
export default Login