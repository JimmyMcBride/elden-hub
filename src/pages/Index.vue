<template>
  <q-page class="q-pa-md row items-start q-gutter-md justify-around">
    <topic-card
      v-for="topic in topics"
      :title="topic.name"
      :description="topic.description"
      :key="topic.name"
    />
  </q-page>
</template>

<script>
import TopicCard from "components/TopicCard.vue"
import { mapActions } from "vuex"

export default {
  name: "PageIndex",
  components: {
    TopicCard,
  },
  // data() {
  //   return {}
  // },
  methods: {
    ...mapActions("store", ["loadTopics"]),
  },
  mounted() {
    this.loadTopics()
  },
  computed: {
    topics() {
      console.log("topics:", this.$store.getters["store/topics"])
      return this.$store.getters["store/topics"]
    },
  },
}
</script>
