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
      :breakpoint="830"
    >
      <q-scroll-area
        style="
          height: calc(100% - 192px);
          margin-top: 192px;
          border-right: 1px solid #ddd;
        "
      >
        <q-list padding>
          <q-item active clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="fas fa-dragon" />
            </q-item-section>

            <q-item-section> Topics </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="fas fa-hat-wizard" />
            </q-item-section>

            <q-item-section> Build Planner </q-item-section>
          </q-item>

          <q-item disable v-ripple>
            <q-item-section avatar>
              <q-icon name="fas fa-magic" />
            </q-item-section>

            <q-item-section> Notifications </q-item-section>
          </q-item>

          <q-item disable v-ripple>
            <q-item-section avatar>
              <q-icon name="fas fa-scroll" />
            </q-item-section>

            <q-item-section> Messages </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <q-img
        class="absolute-top"
        src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.mos.cms.futurecdn.net%2FqToATWfBr5bcg9pN4dKktm-1200-80.jpg&f=1&nofb=1"
        style="height: 192px"
      >
        <div class="absolute-bottom bg-transparent">
          <div class="bg-gray-1">
            <q-avatar size="56px" class="q-mb-sm">
              <q-img src="~assets/wooper.png" />
            </q-avatar>
          </div>
          <div class="text-weight-bold">Lost Hollow</div>
          <div class="text-italic">ooooohhhhh</div>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { date } from "quasar";

export default {
  name: "MainLayout",
  // components: { EssentialLink },
  data() {
    return {
      leftDrawerOpen: false,
      // essentialLinks: linksData,
    };
  },
  computed: {
    todaysDate() {
      const timeStamp = Date.now();
      return date.formatDate(timeStamp, "dddd D MMMM, YYYY");
    },
  },
};
</script>

<style lang="scss">
.header-image {
  height: 100%;
  z-index: -1;
  // opacity: 0.8;
  // margin-top: 20rem;
  // filger: grayscale()
}
</style>
