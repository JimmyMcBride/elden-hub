<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
// import { mapActions } from "vuex"
// import { firebaseAuth } from "boot/firebase"

export default {
  name: "App",
  created() {
    this.$q.dark.set(true)
  },
  // methods: {
  //   ...mapActions("store", ["loadCurrentUser"]),
  // },
}
</script>
