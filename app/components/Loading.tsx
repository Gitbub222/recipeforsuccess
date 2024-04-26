import * as React from 'react';
import { ActivityIndicator, View } from 'react-native';

export const Loading = () => {
    return <View
        style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%", backgroundColor: "#f6e8d3" }}>
        <ActivityIndicator size="large" color='#106374' />
    </View>
}

export default Loading;