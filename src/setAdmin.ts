import * as admin from "firebase-admin";

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

async function setAdmin(uid: string) {
  try {
    await admin.auth().setCustomUserClaims(uid, { admin: true });
    console.log(`✅ User ${uid} is now an admin!`);
  } catch (error) {
    console.error("❌ Error setting admin claim:", error);
  }
}

// Replace with the actual User UID from Firebase Authentication
const USER_UID = "7vwpvQ0t6hV9d1XVRMdNLdDojWS2"; // 🔥 Change this to the correct UID
setAdmin(USER_UID);
