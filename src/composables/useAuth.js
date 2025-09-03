// filepath: src/composables/useAuth.js
import { ref, onUnmounted } from "vue";
import { auth, db } from "../../firebase.js";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const user = ref(null);
const profile = ref(null);

let unsub = null;
function init() {
  unsub = onAuthStateChanged(auth, async (u) => {
    user.value = u;
    if (u) {
      const snap = await getDoc(doc(db, "invites", u.uid));
      profile.value = snap.exists() ? snap.data() : null;
    } else {
      profile.value = null;
    }
  });
}
onUnmounted(() => unsub && unsub());

async function login(email, password) {
  await signInWithEmailAndPassword(auth, email, password);
}
function logout() {
  return signOut(auth);
}

export function useAuth() {
  if (!unsub) init();
  return { user, profile, login, logout };
}