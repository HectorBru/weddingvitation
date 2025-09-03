<template>
  <section id="transport">
    <h2>Transport & Hotels (Valencia guests)</h2>
    <div v-if="data">
      <!-- show transport/hotel details -->
      <p v-html="data.info"></p>
    </div>
    <div v-else>
      <p>Contact us for transport details.</p>
    </div>
  </section>
</template>

<script>
export default {
  props: { data: { type: Object, default: null } }
};
</script>