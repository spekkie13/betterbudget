import {StyleSheet} from 'react-native'
import {Padding_LARGE, Padding_MEDIUM} from "@/constants/UIConstants"

export const styles_categoryOverview = (theme) => StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    paddingBottom: Padding_MEDIUM,
    paddingTop: Padding_MEDIUM,
    flex: 1
  },
  scrollContainer: {
    paddingBottom: Padding_LARGE
  },
  title: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  titleText: {
    fontSize: 24,
  },
  body: {
    flexDirection: 'row',
    width: '100%',
    margin: 5,
    backgroundColor: theme.colors.background
  },
  cardView: {
    marginRight: 5
  },
  buttonView: {
    alignItems: 'center',
    marginBottom: 5
  },
  text: {
    color: theme.colors.text,
    marginTop: 10
  }
})
