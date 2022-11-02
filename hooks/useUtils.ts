import * as ImagePicker from "expo-image-picker";
import { Share } from "react-native";
import { resetChoreState } from "../store/chore/choreSlice";
import { resetCompletedChores } from "../store/completedChore/completedChoreSlice";
import { HouseholdModel } from "../store/household/householdModel";
import { resetHousehold } from "../store/household/householdSlice";
import { Profile } from "../store/profile/profileModel";
import { resetProfileState } from "../store/profile/profileSlice";
import { useAppDispatch } from "../store/store";

export function useUtils() {
  const dispatch = useAppDispatch();

  const generateHouseholdCode = () => {
    return Math.random().toString(36).slice(2, 8).toUpperCase();
  };

  function convertToRGB(hex: string, alpha: number): string {
    const newHex = hex.substring(1);

    if (newHex.length != 6) {
      throw "Only six-digit hex colors are allowed.";
    }

    const aRgbHex = newHex.match(/.{1,2}/g);
    if (aRgbHex) {
      const aRgb = [parseInt(aRgbHex[0], 16), parseInt(aRgbHex[1], 16), parseInt(aRgbHex[2], 16)];

      const aRgbString = `rgba(${aRgb[0]}, ${aRgb[1]}, ${aRgb[2]}, ${alpha})`;

      return aRgbString;
    }
    return "rgba(0,0,0,0)";
  }

  const addDays = function (date: Date, days: number) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      return result.uri;
    }
  };

  const shareData = async (household: HouseholdModel, profile: Profile) => {
    try {
      await Share.share({
        message: `Här kommer en inbjudan till mitt hushåll ${household.name}!\nAnge denna kod för att gå med i mitt hushåll: ${household.code}\nMVH ${profile?.profileName}`,
      });
    } catch (error) {
      console.log(error);
    }
  };


  const resetStore = () => {
    dispatch(resetProfileState());
    dispatch(resetHousehold());
    dispatch(resetChoreState());
    dispatch(resetCompletedChores());
  };

  return {
    generateHouseholdCode,
    convertToRGB,
    addDays,
    pickImage,
    resetStore,
    shareData
  };
}
