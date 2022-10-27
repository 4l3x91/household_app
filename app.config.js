import "dotenv/config";

export default {
  expo: {
    name: "household_app",
    slug: "household_app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/myIcon.jpg",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/splashScreen.png",
      resizeMode: "contain",
      backgroundColor: "#191c1e",
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/myAdaptiveIcon.jpg",
        backgroundColor: "#191c1e",
      },
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      firebaseApiKey: process.env.FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.FIREBASE_APP_ID,
      firebaseMeasurementId: process.env.FIREBASE_MEASUREMENT_ID,
    },
  },
};
