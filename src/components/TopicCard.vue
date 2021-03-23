<template>
  <router-link :to="'/topics/' + id">
    <q-card flat bordered class="my-card" style="width: 30rem; max-width: 90vw">
      <q-card-section>
        <div class="text-h6">{{ topic.title }}</div>
      </q-card-section>

      <q-separator inset></q-separator>

      <q-card-section>
        {{ topic.description }}
      </q-card-section>
    </q-card>
  </router-link>
</template>

<script>
export default {
  name: "TopicCard",
  props: {
    topic: {
      type: Object,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
  },
}
</script>
