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
      let pageParams = Taro.getCurrentInstance().router.params;
      console.log(pageParams);
      Taro.setNavigationBarTitle({
        title: `${pageParams.name}的粉丝`,
      });
      // TODO 通过页面参数，获取用户详
    });
    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss">
</style>
