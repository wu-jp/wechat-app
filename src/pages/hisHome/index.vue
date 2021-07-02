<template></template>

<script>
import Taro from "@tarojs/taro";
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
    onMounted(() => {
      Taro.setNavigationBarTitle({
        title: "某某某",
      });
    });
    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss">
</style>
