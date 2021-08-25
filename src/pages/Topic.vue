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
    <div class="q-px-xl q-py-md">
      <!-- <q-card class="q-pa-md q-ma-md">
        <topic-item
          v-for="discussion in discussions"
          :discussion="discussion"
          :key="discussion.published.seconds"
        >
        </topic-item>
        <q-card class="flex justify-center q-mt-md">
          <q-pagination v-model="page" :max="5" input />
        </q-card>
      </q-card> -->
      <q-table
        :title="topic.title"
        :data="discussions"
        :columns="columns"
        row-key="title"
        :pagination="pagination"
        :loading="topicLoading"
        :dense="$q.screen.lt.md"
        :grid="$q.screen.lt.sm"
        style="text-align: center"
      >
        <template v-slot:body-cell-pinned="props">
          <q-td :props="props">
            <q-icon v-show="props.value" name="fas fa-thumbtack" size="1.5em" />
          </q-td>
        </template>
        <template v-slot:body-cell-published="props">
          <q-td :props="props">
            <!-- <q-icon v-show="props.value" name="fas fa-thumbtack" size="1.5em" /> -->
            <div>{{ format_date(props.value) }}</div>
          </q-td>
        </template>
      </q-table>
    </div>
  </div>
</template>

<script>
// import TopicItem from "components/TopicItem.vue"
import moment from "moment"
import { mapActions } from "vuex"

export default {
  // components: { TopicItem },
  data() {
    return {
      columns: [
        { name: "title", label: "Title", field: "title", align: "left" },
        {
          name: "username",
          label: "Username",
          field: "username",
          align: "center",
        },
        { name: "likes", label: "Likes", field: "likes", align: "center" },
        {
          name: "dislikes",
          label: "Dislikes",
          field: "dislikes",
          align: "center",
        },
        {
          name: "comments",
          label: "comments",
          field: "totalComments",
          align: "center",
        },
        { name: "views", label: "Views", field: "views", align: "center" },
        {
          name: "published",
          label: "Published",
          field: "published",
          align: "center",
        },
        { name: "pinned", label: "Pinned", field: "pinned", align: "center" },
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
    format_date(date) {
      console.log(`CURR DATE: ${new Date(date.seconds)}`)
      return moment(new Date(date.seconds * 1000)).format("MMM D, YYYY")
    },
  },
  mounted() {
    this.loadTopic(this.$route.params.topicSlug)
    this.loadDiscussions(this.$route.params.topicSlug)
  },
  computed: {
    topic() {
      return this.$store.getters["store/topic"]
    },
    topicLoading() {
      return this.$store.getters["store/topicLoading"]
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
