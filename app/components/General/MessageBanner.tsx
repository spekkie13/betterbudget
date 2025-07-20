import { View, Text, StyleSheet } from 'react-native'

type MessageType = 'success' | 'error';

interface MessageBannerProps {
    message: string;
    type?: MessageType;
}

export function MessageBanner({ message, type = 'error' }: MessageBannerProps) {
    if (!message) return null;

    return (
        <View style={[
            styles.container,
            type === 'success' ? styles.successContainer : styles.errorContainer
        ]}>
            <Text style={[
                styles.text,
                type === 'success' ? styles.successText : styles.errorText
            ]}>
                {message}
            </Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 8,
        borderRadius: 8,
    },
    text: {
        fontSize: 14,
    },
    errorContainer: {
        backgroundColor: '#fee2e2',
    },
    errorText: {
        color: '#b91c1c',
    },
    successContainer: {
        backgroundColor: '#dcfce7',
    },
    successText: {
        color: '#15803d',
    },
});

