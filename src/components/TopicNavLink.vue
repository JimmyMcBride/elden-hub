<template>
  <router-link :to="'/topics/' + id">
    <q-item :active="$route.path === '/topics/' + id" clickable v-ripple>
      <q-item-section class="q-ml-lg"> {{ title }} </q-item-section>
    </q-item>
  </router-link>
</template>

<script>
export default {
  name: "TopicCard",
  props: {
    title: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
  },
  mounted() {},
}
</script>
