<template>
  <section id="rsvp">
    <h2>RSVP</h2>
    <div v-for="(g, i) in profile.guests" :key="i" class="guest-rsvp">
      <h3>{{ g.name }}</h3>
      <label>
        Coming?
        <select v-model="responses[i].attending">
          <option :value="true">Yes</option>
          <option :value="false">No</option>
        </select>
      </label>
      <label>
        Need bus?
        <input type="checkbox" v-model="responses[i].needsBus" />
      </label>
      <label>
        Song
        <input v-model="responses[i].song" placeholder="Song you'd like" />
      </label>
    </div>
    <button @click="save">Save RSVP</button>
    <p v-if="saved">Saved!</p>
  </section>
</template>

<script>
import { reactive, watch, ref } from "vue";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase.js";

export default {
  props: { profile: { type: Object, required: true } },
  setup(props) {
    const saved = ref(false);
    const responses = reactive(
      props.profile.guests.map(_ => ({ attending: true, needsBus: false, song: "" }))
    );

    async function save() {
      // save into invites/{uid}/rsvps  OR update invites doc rsvps field
      const uid = props.profile._uid || props.profile.uid; // ensure you set uid in profile doc when created
      await setDoc(doc(db, "invites", uid), { rsvps: responses }, { merge: true });
      saved.value = true;
      setTimeout(() => (saved.value = false), 2000);
    }
    return { responses, save, saved };
  }
};
</script>