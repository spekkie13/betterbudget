import {StyleSheet} from 'react-native'

export const styles_login = (theme) => StyleSheet.create({
  safeContainer: {
    backgroundColor: theme.colors.background,
    flex: 1
  },
  container: {
    marginHorizontal: 20,
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: theme.colors.oppositeColor,
    borderColor: theme.colors.primary,
    color: theme.colors.textColor,
    shadowColor: '#00FF00',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 10,
  },
  button: {
    marginVertical: 4,
    width: 225,
    color: theme.colors.primary
  },
  loading: {
    margin: 28
  },
  buttonView: {
    width: '100%',
    alignItems: 'center'
  }
})
