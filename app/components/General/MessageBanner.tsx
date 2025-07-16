import { View, Text, StyleSheet } from 'react-native'

export function MessageBanner ({ message } : { message: string }) {
    if (!message) return null

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{message}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { padding: 8, backgroundColor: '#fee2e2', borderRadius: 8 },
    text: { color: '#b91c1c' },
});
