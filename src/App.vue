<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
// import { firebaseAuth } from "boot/firebase"
export default {
  name: "App",
  created() {
    this.$q.dark.set(true)
  },
  mounted() {
    // console.log("current user:", firebaseAuth)
  },
}
</script>
