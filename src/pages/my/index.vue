<template></template>

<script>
import { countScrollHeight, getDomHeight } from "@/utils/common.js";

import { onMounted, reactive, toRefs, computed, watch, ref } from "vue";
import { useStore } from "vuex";
import NavBar from "@/components/NavBar/index";
import Card from "@/components/Card/index";
import TabBar from "@/components/TabBar/index";

export default {
  name: "Index",
  components: { NavBar, Card, TabBar },
  setup() {
    const store = useStore();

    const state = reactive({
      containerHeight: "0px",
    });
    // onMounted(() => {
    //   state.containerHeight = countScrollHeight() + "px";
    // });
    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss">
</style>
