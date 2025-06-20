import {StyleSheet} from 'react-native'
import {Padding_EXTRA_SMALL, Padding_LARGE, Padding_MEDIUM} from "@/constants/UIConstants"

export const styles_categoryDetails = (theme) => StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    flex: 1,
    paddingTop: Padding_MEDIUM,
    paddingLeft: 10,
    alignItems: 'center',
  },
  titleText: {
    paddingTop: 15,
    paddingBottom: 5,
    fontSize: 16,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    color: theme.colors.text
  },
  categoryList: {
    paddingBottom: Padding_LARGE
  },
  expenseItemView: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    paddingTop: Padding_EXTRA_SMALL
  },
  expenseItemText: {
    color: theme.colors.textColor,
    lineHeight: 25
  },
  backButton: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 25,
  },
  errorMessage: {
    color: theme.colors.failureColor
  },
  touchable: {
    paddingTop: Padding_EXTRA_SMALL
  }
})
