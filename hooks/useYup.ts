import * as Yup from "yup";

export function useYup() {
  const newHouseholdSchema = Yup.object().shape({
    householdName: Yup.string()
      .required("Namnet på hushållet kan inte vara tomt")
      .matches(/^\S+(?: \S+)*$/, "Ogiltligt hushålls namn")
      .min(2, "Namnet måste innehålla minst 2 tecken"),
    profileName: Yup.string()
      .required("Profilnamn får inte vara tomt")
      .min(2, "Profilnamn måste minst inehålla 2 tecken")
      .max(20, "Profilnamnet kan inte vara längre än 20 tecken")
      .matches(/^\S*$/, "Profilnamn kan inte innehålla mellanslag"),
  });

  const householdSchema = Yup.object().shape({
    householdName: Yup.string()
      .required("Namnet på hushållet kan inte vara tomt")
      .matches(/^\S+(?: \S+)*$/, "Ogiltligt hushålls namn")
      .min(2, "Namnet måste innehålla minst 2 tecken"),
  });

  const householdCodeSchema = Yup.object().shape({
    householdCode: Yup.string()
      .required("En hushållskod måste innehålla sex stycken tecken")
      .min(6, "En hushållskod måste innehålla sex tecken")
      .matches(/^\S*$/, "En hushållskod kan inte innehålla mellanslag"),
  });

  const profileSchema = Yup.object().shape({
    profileName: Yup.string()
      .required("Profilnamn får inte vara tomt")
      .min(2, "Profilnamn måste minst inehålla 2 tecken")
      .max(20, "Profilnamnet kan inte vara längre än 20 tecken")
      .matches(/^\S*$/, "Profilnamn kan inte innehålla mellanslag"),
  });

  const choreSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Titel måste vara minst två tecken")
      .max(20, "Titel kan inte vara längre än 20 tecken")
      .required("Titel kan inte vara tom"),
    description: Yup.string()
      .min(10, "Beskrivning måste vara minst 10 tecken")
      .max(100, "Beskrivning kan inte vara längre än 100 tecken")
      .required("Beskrivning kan inte vara tom"),
  });

  const userSchema = Yup.object().shape({
    email: Yup.string().email("Ange en giltlig Email").required("Email kan inte vara tomt"),
    password: Yup.string().min(6, "minst 6 tecken").required("Lösenord kan inte vara tomt"),
    passwordConfirmation: Yup.string().oneOf([Yup.ref("password"), null], "Lösenorden matchar inte"),
  });

  const loginSchema = Yup.object().shape({
    email: Yup.string().email("Ange en giltlig Email").required("Email kan inte vara tomt"),
    password: Yup.string().required("Lösenord kan inte vara tomt"),
  });

  return { newHouseholdSchema, householdSchema, householdCodeSchema, profileSchema, choreSchema, userSchema, loginSchema };
}
