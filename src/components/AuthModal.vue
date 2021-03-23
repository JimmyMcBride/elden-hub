<template>
  <q-card style="width: 20rem">
    <q-tabs
      v-model="tab"
      dense
      class="text-grey q-pa-sm"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
    >
      <q-tab name="login" label="Login"></q-tab>
      <q-tab name="register" label="Register"></q-tab>
    </q-tabs>

    <q-separator></q-separator>

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="login">
        <login-register :tab="tab" :modal="modal" />
      </q-tab-panel>

      <q-tab-panel name="register">
        <login-register :tab="tab" :modal="modal" />
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>

<script>
import LoginRegister from "components/LoginRegister"

export default {
  name: "AuthModal",
  props: ["modal"],
  components: {
    LoginRegister,
  },
  data() {
    return {
      tab: "login",
    }
  },
  // computed: {
  // },
}
</script>
