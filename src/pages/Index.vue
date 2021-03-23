<template>
  <section>
    <q-toolbar inset>
      <q-breadcrumbs>
        <q-breadcrumbs-el
          icon="fas fa-dragon"
          label="Topics"
          class="text-primary"
          to="/"
        />
        <q-breadcrumbs-el :label="$route.params.topicSlug" />
      </q-breadcrumbs>
    </q-toolbar>
    <q-page
      class="q-pa-md row items-start q-gutter-md justify-around items-stretch"
    >
      <q-inner-loading :showing="loading">
        <q-spinner-gears size="200px" color="primary" />
      </q-inner-loading>
      <topic-card
        v-for="(topic, id) in topics"
        :topic="topic"
        :key="id"
        :id="id"
      />
    </q-page>
  </section>
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
  //   return {
  //     topics: this.$store.getters["store/topics"],
  //   }
  // },
  methods: {
    ...mapActions("store", ["loadTopics"]),
  },
  mounted() {
    this.loadTopics()
  },
  computed: {
    topics() {
      return this.$store.getters["store/topics"]
    },
    loading() {
      return this.$store.getters["store/topicsLoading"]
    },
    // currentUser() {
    //   console.log("currentUser:", this.$store.getters["store/currentUser"])
    //   return this.$store.getters["store/currentUser"]
    // },
  },
}
</script>
