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
