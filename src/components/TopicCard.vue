<template>
  <q-card flat bordered class="my-card" style="width: 30rem; max-width: 90vw">
    <q-card-section>
      <div class="text-h6">{{ title }}</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      {{ description }}
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: "TopicCard",
  props: {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },
  },
}
</script>
