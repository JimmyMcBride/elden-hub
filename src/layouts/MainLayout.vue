<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-blue-grey-10">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
      </q-toolbar>
      <div class="q-px-lg q-pt-xl q-mb-md">
        <div class="text-h3 cinz-bold">Elden Hub</div>
        <div class="text-subtitle1">{{ todaysDate }}</div>
      </div>
      <q-img src="~assets/valk-banner.png" class="header-image absolute-top" />
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :width="300"
      :breakpoint="1220"
    >
      <q-scroll-area style="height: calc(100% - 192px); margin-top: 192px">
        <q-list padding>
          <q-expansion-item
            expand-separator
            icon="fas fa-dragon"
            label="Topics"
            :header-class="$route.path === '/' ? 'text-primary' : ''"
          >
            <topic-nav-link
              v-for="(topic, id) in topics"
              :title="topic.title"
              :id="id"
              :key="id"
            />
          </q-expansion-item>

          <router-link to="/build-planner" class="text-subtitle1">
            <q-item
              :active="$route.path === '/build-planner'"
              disable
              clickable
              v-ripple
            >
              <q-item-section avatar>
                <q-icon name="fas fa-hat-wizard" />
              </q-item-section>

              <q-item-section>
                <div class="flex">
                  Build Planner
                  <span style="font-size: 0.6rem" class="q-ml-sm"
                    >* Comming Soon</span
                  >
                </div>
              </q-item-section>
            </q-item>
          </router-link>

          <router-link
            v-if="currentUser"
            to="/notifications"
            class="text-subtitle1"
          >
            <q-item
              :active="$route.path === '/notifications'"
              clickable
              v-ripple
            >
              <q-item-section avatar>
                <q-icon name="fas fa-magic" />
              </q-item-section>

              <q-item-section> Notifications </q-item-section>
            </q-item>
          </router-link>

          <router-link v-if="currentUser" to="/messages" class="text-subtitle1">
            <q-item :active="$route.path === '/messages'" clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="fas fa-scroll" />
              </q-item-section>

              <q-item-section> Messages </q-item-section>
            </q-item>
          </router-link>
        </q-list>
      </q-scroll-area>

      <q-img
        class="absolute-top"
        src="~assets/brokenking.jpeg"
        style="height: 192px"
      >
        <q-inner-loading :showing="authLoading">
          <q-spinner-gears size="50px" color="primary" />
        </q-inner-loading>
        <div class="absolute-bottom bg-transparent" :hidden="authLoading">
          <q-btn
            v-if="currentUser != null"
            color="red"
            class="q-ma-md"
            @click="logout"
            >Logout</q-btn
          >
          <q-btn v-else color="primary" class="q-ma-md" @click="modal = true"
            >Login/Sign Up</q-btn
          >
          <q-dialog v-model="modal">
            <auth-modal :modal="modal" />
          </q-dialog>
          <div class="bg-gray-1">
            <q-avatar size="56px" class="q-mb-sm">
              <q-img src="~assets/wooper.png" />
            </q-avatar>
          </div>
          <div v-if="currentUser" class="text-weight-bold">
            {{ currentUser.username }}
          </div>
          <div v-else class="text-weight-bold">Lost Hollow</div>
          <div v-if="currentUser != null" class="text-weight-bold">
            {{ currentUser.email }}
          </div>
          <div v-else class="text-italic">ooooohhhhhhh</div>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { date } from "quasar"
import AuthModal from "components/AuthModal"
import { mapActions } from "vuex"
import TopicNavLink from "src/components/TopicNavLink.vue"
import { firestore } from "boot/firebase"

export default {
  name: "MainLayout",
  components: { AuthModal, TopicNavLink },
  data() {
    return {
      leftDrawerOpen: false,
      modal: false,
      opened: true,
    }
  },
  computed: {
    todaysDate() {
      const timeStamp = Date.now()
      return date.formatDate(timeStamp, "dddd D MMMM, YYYY")
    },
    /**
     * func
     * @returns {any}
     */
    // textColor() {
    //   if (this.$route.path)
    // },
    /**
     * func
     * @returns {any}
     */
    currentUser() {
      return this.$store.getters["store/currentUser"]
    },
    /**
     * func
     * @returns {any}
     */
    authLoading() {
      return this.$store.getters["store/authLoading"]
    },
    /**
     * func
     * @returns {any}
     */
    topics() {
      return this.$store.getters["store/topics"]
    },
  },
  methods: {
    ...mapActions("store", ["loadCurrentUser", "logoutUser", "loadTopics"]),
    logout() {
      this.logoutUser()
      this.loadCurrentUser()
    },
  },
  async mounted() {
    this.loadCurrentUser()
    this.loadTopics()
  },
}
</script>

<style lang="scss">
.header-image {
  height: 100%;
  z-index: -1;
}
a {
  text-decoration: none;
}
</style>
