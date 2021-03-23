<template>
  <div>
    <q-toolbar inset>
      <q-breadcrumbs>
        <q-breadcrumbs-el
          icon="fas fa-dragon"
          label="Topics"
          class="text-primary"
          to="/"
        />
        <q-breadcrumbs-el :label="topic.title" />
      </q-breadcrumbs>
    </q-toolbar>
    <!-- <div class="text-h3 q-ml-xl">{{ topic.title }}</div> -->
    <div class="q-px-xl q-py-md">
      <!-- <div class="q-pa-md"> -->
      <q-table
        :title="topic.title"
        :data="discussions"
        :columns="columns"
        row-key="title"
        :pagination="pagination"
      />
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex"

export default {
  data() {
    return {
      columns: [
        { name: "title", label: "Title", field: "title", align: "left" },
        { name: "likes", label: "Likes", field: "likes", align: "left" },
        {
          name: "dislikes",
          label: "Dislikes",
          field: "dislikes",
          align: "left",
        },
        {
          name: "comments",
          label: "comments",
          field: "totalComments",
          align: "left",
        },
        { name: "views", label: "Views", field: "views", align: "left" },
        // { name: "pinned", label: "Pinned", field: "pinned" },
      ],
      pagination: {
        // sortBy: 'desc',
        // descending: false,
        page: 1,
        rowsPerPage: 30,
        // rowsNumber: xx if getting data from a server
      },
    }
  },
  methods: {
    ...mapActions("store", ["loadTopic", "loadDiscussions"]),
  },
  mounted() {
    this.loadTopic(this.$route.params.topicSlug)
    this.loadDiscussions(this.$route.params.topicSlug)
  },
  computed: {
    topic() {
      return this.$store.getters["store/topic"]
    },
    discussions() {
      console.log("discussions:", this.$store.getters["store/discussions"])
      return this.$store.getters["store/discussions"]
    },
    loading() {
      return this.$store.getters["store/topicsLoading"]
    },
    discussionsLoading() {
      return this.$store.getters["store/discussionsLoading"]
    },
  },
  watch: {
    "$route.params": {
      handler({ topicSlug }) {
        this.loadTopic(topicSlug)
      },
      immediate: true,
    },
  },
}
</script>
