import { Pressable, StyleSheet } from "react-native";
import { useThemeContext } from "@/hooks/ThemeContext";
import { COLORS } from "@/constants/Colors";

export function ThemedPressable({
  style,
  type = "default",
  ...otherProps
}) {
  const { theme } = useThemeContext();
  const colors = theme === "dark" ? COLORS.dark : COLORS.light;
  const styles = createStyles(colors);

  return (
    <Pressable
      style={[
        {
          height: 55,
          width: "100%",
          borderWidth: 1,
          borderRadius: 2,
          justifyContent: "center",
        },
        styles[type] || styles.default,
        style,
      ]}
      {...otherProps}
    />
  );
}

function createStyles(colors) {
  return StyleSheet.create({
    default: {
      backgroundColor: colors.buttonColor,
      borderColor: colors.borderColor,
      color: colors.text,
    }, 
    selected: {
      backgroundColor: colors.buttonColorSelected,
      borderColor: colors.borderColorSelected,
      color: colors.textSelected,
    }
  })
}

