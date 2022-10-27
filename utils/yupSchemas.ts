import * as Yup from "yup";

export const createHouseholdSchema = Yup.object().shape({
  householdName: Yup.string()
    .required("Namnet på hushållet kan inte vara tomt")
    .matches(/^\S+(?: \S+)*$/, "Ogiltligt hushålls namn")
    .min(2, "Namnet måste innehålla minst 2 tecken"),
  profileName: Yup.string()
    .required("Profilnamn får inte vara tomt")
    .min(2, "Profilnamn måste minst inehålla 2 tecken")
    .matches(/^\S*$/, "Profilnamn kan inte innehålla mellanslag"),
});

export const profileSchema = Yup.object().shape({
  profileName: Yup.string()
    .required("profile name cant be empty")
    .min(2, "must contain atleast 2 characters")
    .matches(/^\S*$/, "profile name cannot contain spaces"),
});

export const createOrEditChoreSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Titel måste vara minst två tecken")
    .max(20, "Titel kan inte vara längre än 20 tecken")
    .required("Titel kan inte vara tom"),
  description: Yup.string()
    .min(10, "Beskrivning måste vara minst 10 tecken")
    .max(100, "Beskrivning kan inte vara längre än 100 tecken")
    .required("Beskrivning kan inte vara tom"),
});
