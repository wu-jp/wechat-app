<template>
  <NavBar :navBarInfo="navBarInfo"></NavBar>
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
  name: "found",
  components: {
    NavBar, Card
  },
  onTabItemTap(item) {
    index = item.index
  },
  setup() {
    const store = useStore()
    store.commit("INDEX", index)
    const state = reactive({
      cardBoxHeight: "0px",
      navBarInfo: {
        pageName: "关注",
      },
    })
    onMounted(() => {
      state.cardBoxHeight = countScrollHeight() + "px"
    })

    return {
      ...toRefs(state),
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
