import * as Font from 'expo-font';

export const useCustomFonts = () => {
    return Font.loadAsync({
        'Inter-Regular': require('../assets/fonts/Inter-Italic-VariableFont_opsz,wght.ttf'),
        'Inter-SemiBold': require('../assets/fonts/Inter-VariableFont_opsz,wght.ttf'),
        'Manrope-Bold': require('../assets/fonts/Manrope-VariableFont_wght.ttf'),
    });
};
