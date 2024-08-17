import { Image, ScrollView, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/constants'


const MainScreen = () => {
    return (
        <SafeAreaView className='bg-primary h-full' >
            <ScrollView contentContainerStyle={{ height: '100%' }} >
                <View className='w-full justify-center items-center h-full px-4'>
                    <Image
                        source={images.logo}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default MainScreen

