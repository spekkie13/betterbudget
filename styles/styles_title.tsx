import {StyleSheet} from 'react-native'

export const styles_title = (theme) => StyleSheet.create({
  title: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    paddingTop: 10,
    backgroundColor: theme.colors.background
  },
  titleText: {
    fontSize: 32,
    color: theme.colors.textColor
  },
})
