import {StyleSheet} from 'react-native'

export const styles_categoryInfoCard = (theme) => StyleSheet.create({
  container: {
    marginTop: 5,
    backgroundColor: theme.colors.background
  },
  card: {
    borderRadius: 5,
    borderWidth: 2,
    marginLeft: 10,
    marginBottom: 4,
    borderColor: theme.colors.primary,
    width: 185,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.secondary,
  },

  categoryName: {
    fontWeight:'bold',
    color: theme.colors.textColor
  },
  periodName: {
    fontStyle: 'italic',
    color: theme.colors.textColor,
    paddingBottom: 5
  },
  status: {
    color: theme.colors.textColor
  }
})
