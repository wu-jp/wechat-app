<template>
  <NavBar :navBarInfo="navBarInfo"></NavBar>
  <!-- 首页卡片 -->
  <Card :style="{ height: cardBoxHeight }"></Card>

</template>

<script>
import {
  countScrollHeight,
  getDomHeight,
  getNavHeight,
} from "@/utils/common.js"

import Taro from "@tarojs/taro"
import { onMounted, reactive, toRefs, computed, watch, ref } from "vue"
import { useStore } from "vuex"

import NavBar from "@/components/NavBar/index"
import Card from "@/components/Card/index"
let index
export default {
  name: "index",
  components: {
    NavBar,
    Card,
  },
  onTabItemTap(item) {
    index = item.index
  },
  setup() {
    const store = useStore()
    store.commit("INDEX", index)
    const state = reactive({
      cardBoxHeight: "0px",
      navHeight: "0px",
      navBarInfo: {
        pageName: "ROAM",
      },
    })
    const index = computed(() => store.state.user.index)
    onMounted(() => {
      state.cardBoxHeight = countScrollHeight() + "px"
      state.navHeight = getNavHeight() + "px"
    })
    watch(index, (newVal, oldVal) => {
      console.log(newVal)
      if (newVal === 0) {
        state.navBarInfo.pageName = "ROAM"
      } else if (newVal === 2) {
        state.navBarInfo.pageName = "吴想要雨"
      }
    })

    return {
      ...toRefs(state),
      index,
    }
  },
}
</script>

<style lang="scss">
.index {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
