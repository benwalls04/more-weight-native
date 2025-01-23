import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedPressable } from "@/components/ThemedPressable";
import { FloatPressable } from "@/components/FloatPressable";
import { ThemedLayout } from "@/components/ThemedLayout";
import { useSplitsContext } from "@/hooks/SplitsContext";
import { useThemeContext } from "@/hooks/ThemeContext";
import { useRouter } from "expo-router";
import { View, StyleSheet, Dimensions, FlatList, Pressable } from "react-native";
import { useState } from "react";
import { SPLIT_TITLES } from "@/constants/Survey";
import { COLORS } from "@/constants/Colors";
import axios from "axios";

const windowWidth = Dimensions.get('window').width * .85;
const BUTTON_MARGIN = 4;
const BTN_WIDTH =  windowWidth - 10;

export default function Base() {

  const { setBase, setSplits, splits, setLeaf } = useSplitsContext();
  const router = useRouter();
  const [choiceIndex, setChoiceIndex] = useState(-1);

  const { theme } = useThemeContext();
  const colors = theme === "dark" ? COLORS.dark : COLORS.light;
  const styles = createStyles(colors);

  // FIXME: replace includes list with info pop up
  // FIXME: function that changes long description to short: IE shoul, biceps, triceps -> arms 

  const handleNext = async () => {
    if (choiceIndex > -1){
        const newSplits = {...splits};
        let [key, value] = Object.entries(splits.selection[choiceIndex])[0];
        newSplits.selection = value;
        setSplits(newSplits);
      if (Array.isArray(newSplits.selection[0])){
          const response = await axios.post('https://more-weight.com/partition', { splits: newSplits.selection });
          newSplits.selection = response.data;
          setLeaf(response.data)
          setSplits(newSplits);
          setBase(SPLIT_TITLES[key])
          router.push("/split");
        } 
    }
  };

  const handlePress = (index) => {
    setChoiceIndex(index)
  }
  
  return (
    <ThemedView>
      <ThemedLayout
        header={
          <ThemedText 
            style={styles.title}
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.5}
        >
          Which split type do you prefer?
        </ThemedText>
        }

      body={
        <FlatList 
          data={splits.selection}
          keyExtractor={(item, index) => index.toString()}
          numColumns={1}
          contentContainerStyle={styles.list}
          scrollEnabled={false}
          renderItem={({item, index}) => (
            <FloatPressable 
              onPress={() => handlePress(index)}
              type={choiceIndex === index ? "selected" : "default"}
              style={[styles.button, {width: BTN_WIDTH}]}
            >
              <View style={{flexDirection: 'row', width: '100%'}}>
                <View style={styles.buttonTextContainer}>
                  <ThemedText style={styles.buttonText}>{SPLIT_TITLES[Object.entries(item)[0][0]]}</ThemedText>
                </View>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                  <Pressable style={styles.checkButton}
                    onPress={() => handlePress(index)}
                  >
                    <View style={[styles.check, {opacity: choiceIndex === index ? 1 : 0}]} />
                  </Pressable>
                </View>
              </View>
            </FloatPressable>
          )}
        />
      }

      footer={
        <View style={{justifyContent: 'center', width: '100%', flexDirection: 'row'}}>
          <ThemedPressable 
            onPress={() => router.back()}
            style={styles.submitButton}
            type="accent"
        >
          <ThemedText>Back</ThemedText>
        </ThemedPressable>
        <ThemedPressable 
          onPress={() => handleNext()}
          style={styles.submitButton}
          type="selected"
        >
          <ThemedText>Next</ThemedText>
          </ThemedPressable>
        </View>
        }
      />
    </ThemedView>
    );
}

  
function createStyles(colors) {
  return StyleSheet.create({
    title: {
      fontSize: 20,
      textAlign: 'center',
      alignSelf: 'center',
    },
    list: {
      flexGrow: 1,
      width: '100%',
    },
    button: {
      height: 40,
      margin: 0,
      marginBottom: 15,
    },
    buttonTextContainer: {
      flex: 4,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
    buttonText: {
      width: '100%',
      marginLeft: "30%",
      fontSize: 16,
      marginBottom: 2,
      textAlign: "left",
    },
    checkButton: {
      backgroundColor: colors.background,
      marginLeft: 10,
      color: "green",
      justifyContent: 'center',
      alignItems: 'center',
      width: 20,
      height: 20,
      borderRadius: 4,      
    },
    check: {
      width: 10,
      height: 10,
      backgroundColor: colors.tint,
      borderRadius: 2,
    },
    subtextContainer: {
      flex: 3,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      width: '100%',
    },
    subtext: {
      paddingLeft: 10,
      fontSize: 12,
      lineHeight: 16,
      marginBottom: 2,
      textAlign: 'left',
    },
    submitButton: {
      borderWidth: 0,
      height: 30,
      width: '50%',
      margin: BUTTON_MARGIN,
      justifyContent: 'center',
      alignItems: 'center',
    }
  }); 
}
