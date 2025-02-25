const admin = require("firebase-admin");

// Initialize Firebase Admin SDK
const serviceAccount = require("../firebase-admin-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});


async function setAdmin(uid) {
  try {
    await admin.auth().setCustomUserClaims(uid, { admin: true });
    console.log(`✅ User ${uid} is now an admin!`);
  } catch (error) {
    console.error("❌ Error setting admin claim:", error);
  }
}

// Replace this with the actual UID
setAdmin("P2dOECIAkVMaq3necemEfmaPUdH3");
