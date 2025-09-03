<template>
  <div class="invite-page">
    <section id="welcome">
      <h1>
        Welcome to our invitation,
        <span v-if="profile && profile.guests">
          {{ guestNames }}
        </span>
      </h1>
      <Photo />
    </section>

    <Schedule :items="profile?.schedule" />

    <Transport v-if="showTransport" :data="profile?.transportInfo" />

    <RSVP :profile="profile" />
  </div>
</template>

<script>
import { computed } from "vue";
import { useAuth } from "../composables/useAuth";
import Transport from "./Transport.vue";
import RSVP from "./Rsvp.vue";

export default {
  components: { Transport, RSVP },
  setup() {
    const { profile } = useAuth();
    const guestNames = computed(() =>
      profile?.guests?.map(g => g.name).join(" and ")
    );
    const showTransport = computed(() => (profile?.city || "").toLowerCase() === "valencia");
    return { profile, guestNames, showTransport };
  }
};
</script>