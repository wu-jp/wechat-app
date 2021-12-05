<template>
  <NavBar :navBarInfo="navBarInfo"></NavBar>
</template>

<script>
import { countScrollHeight, getDomHeight } from "@/utils/common.js"

import Taro from "@tarojs/taro"
import { onMounted, reactive, toRefs, computed, watch, ref } from "vue"
import { useStore } from "vuex"

import NavBar from "@/components/NavBar/index"
let index
export default {
  name: "found",
  components: {
    NavBar,
  },
  onTabItemTap(item) {
    index = item.index
  },
  setup() {
    const store = useStore()
    store.commit("INDEX", index)
    const state = reactive({
      navBarInfo: {
        pageName: "关注",
      },
    })
    onMounted(() => {})

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
