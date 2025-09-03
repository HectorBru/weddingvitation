// Node admin script to batch-create Auth users and invites/{uid} docs.
// Requirements:
// 1) npm run admin:create-invites
// 2) set GOOGLE_APPLICATION_CREDENTIALS to your service account JSON path
// 3) create scripts/invites.json (see invites.sample.json)
const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path");

const saPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
if (!saPath || !fs.existsSync(saPath)) {
  console.error("Set GOOGLE_APPLICATION_CREDENTIALS to your service-account.json path.");
  process.exit(1);
}

admin.initializeApp({
  credential: admin.credential.cert(require(saPath))
});
const db = admin.firestore();

async function main() {
  const invitesPath = path.resolve(__dirname, "invites.json");
  if (!fs.existsSync(invitesPath)) {
    console.error("Create scripts/invites.json (see invites.sample.json).");
    process.exit(1);
  }
  const invites = JSON.parse(fs.readFileSync(invitesPath, "utf8"));
  for (const inv of invites) {
    try {
      let userRecord;
      try {
        userRecord = await admin.auth().getUserByEmail(inv.email);
        console.log(`User exists: ${inv.email} -> ${userRecord.uid}`);
      } catch (e) {
        userRecord = await admin.auth().createUser({
          email: inv.email,
          password: inv.password
        });
        console.log(`Created user: ${inv.email} -> ${userRecord.uid}`);
      }
      const uid = userRecord.uid;
      const docData = {
        uid,
        email: inv.email,
        guests: inv.guests || [],
        city: inv.city || "",
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      };
      await db.collection("invites").doc(uid).set(docData, { merge: true });
      console.log(`Saved invites/${uid}`);
    } catch (err) {
      console.error(`Error for ${inv.email}:`, err.message || err);
    }
  }
  process.exit(0);
}

main();