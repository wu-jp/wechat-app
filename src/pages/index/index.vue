<template>
  <NavBar :navBarInfo="navBarInfo"></NavBar>
  <!-- 首页卡片 -->
  <Card v-if="index === 0"></Card>
  <!-- 我的 -->
  <My v-if="index === 2"
      @setUserInfo="setUserInfo"
      @setUserSetting="setUserSetting"
      :showMask="showMask"></My>
  <TabBar @publish="publish"></TabBar>

  <Mask v-if="showMask">
    <!-- 发布组件 -->
    <template v-slot:publish
              v-if="showPublish">
      <Publish @closePublish="closePublish"></Publish>
    </template>
    <!-- 编辑个人信息组件 -->
    <template v-slot:setUserInfo
              v-if="showSetUserInfo">
      <SetUserInfo @closeSetUserInfo="closeSetUserInfo"></SetUserInfo>
    </template>
    <!-- 设置组件 -->
    <template v-slot:userSetting
              v-if="showUserSetting">
      <UserSetting @closeUserSetting="closeUserSetting"></UserSetting>
    </template>
  </Mask>
</template>

<script>
import { countScrollHeight, getDomHeight } from "@/utils/common.js"

import Taro from "@tarojs/taro"
import { onMounted, reactive, toRefs, computed, watch, ref } from "vue"
import { useStore } from "vuex"

import NavBar from "@/components/NavBar/index"
import Card from "@/components/Card/index"
import TabBar from "@/components/TabBar/index"
import Mask from "@/components/Mask/index"
import Publish from "@/components/Publish/index"
import My from "@/components/My/index"
import SetUserInfo from "@/components/SetUserInfo/index"
import UserSetting from "@/components/UserSetting/index"

export default {
  name: "Index",
  components: {
    NavBar,
    Card,
    TabBar,
    Mask,
    Publish,
    My,
    SetUserInfo,
    UserSetting,
  },
  setup() {
    const store = useStore()
    const state = reactive({
      showMask: false,
      showPublish: false,
      showSetUserInfo: false,
      showUserSetting: false,
      containerHeight: "0px",

      navBarInfo: {
        pageName: "ROAM",
      },
    })
    console.log('1')
    const index = computed(() => store.state.user.index)
    onMounted(() => {
      //   state.containerHeight = countScrollHeight() + "px";

      Taro.stopPullDownRefresh({
        success: function (res) {
          console.log("下拉刷新回调", res)
        },
      })
    })
    watch(index, (newVal, oldVal) => {
      console.log(newVal)
      if (newVal === 0) {
        state.navBarInfo.pageName = "ROAM"
      } else if (newVal === 2) {
        state.navBarInfo.pageName = "吴想要雨"
      }
    })
    function publish() {
      state.showMask = true
      state.showPublish = true
    }
    function closePublish() {
      state.showMask = false
      state.showPublish = false
    }
    function setUserInfo() {
      state.showMask = true
      state.showSetUserInfo = true
    }
    function closeSetUserInfo() {
      state.showMask = false
      state.showSetUserInfo = false
    }
    function setUserSetting() {
      state.showMask = true
      state.showUserSetting = true
    }
    function closeUserSetting() {
      state.showMask = false
      state.showUserSetting = false
    }
    return {
      ...toRefs(state),
      index,
      publish,
      closePublish,
      setUserInfo,
      closeSetUserInfo,
      setUserSetting,
      closeUserSetting,
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
