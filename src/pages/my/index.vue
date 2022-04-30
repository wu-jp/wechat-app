<template>
  <NavBar :navBarInfo="navBarInfo"></NavBar>
  <scroll-view id="my" class="my" :scrollY="true" :style="{ height: myHeight }" @scroll="onScroll">
    <view id="user-info" class="user-info center">
      <image class="avatar" mode="widhtFix" src="@/assets/images/avatar.jpeg"></image>
      <view class="data center">
        <view class="item">
          <text class="number">0</text>
          <text>作品</text>
        </view>
        <view class="item" @tap="goConcernedPage">
          <text class="number">0</text>
          <text>关注</text>
        </view>
        <view class="item" @tap="goFansPage">
          <text class="number">0</text>
          <text>粉丝</text>
        </view>
      </view>
      <view class="handle center">
        <view @tap="setUserInfo">编辑资料</view>
        <view>🐟邀请好友</view>
        <view @tap="setUserSetting">更多</view>
      </view>
    </view>
    <view class="prods">
      <!-- 切换作品 -->
      <view class="prod-nav" :style="style">
        <text :class="{ target: target === 1 }" @tap="target = 1">作品</text>
        <text :class="{ target: target === 2 }" @tap="target = 2">喜欢</text>
      </view>
      <!-- 作品 -->
      <view>
        <view class="prod-content" v-if="target === 1">
          <view class="item" v-for="(item, index) in 20" :key="index">
            <image mode="aspectFill" v-if="index % 2" src="@/assets/images/IMG_0019.jpeg"></image>
            <image mode="aspectFill" v-else src="@/assets/images/pord2.png"></image>
          </view>
        </view>
        <view class="prod-content" v-else>
          <view class="item" v-for="(item, index) in 5" :key="index">
            <image mode="aspectFill" v-if="!(index % 2)" src="@/assets/images/IMG_0019.jpeg"></image>
            <image mode="aspectFill" v-else src="@/assets/images/pord2.png"></image>
          </view>
        </view>
      </view>
    </view>
  </scroll-view>
  <Mask :status="showMask">
    <!-- 编辑个人信息组件 -->
    <template v-slot:setUserInfo>
      <SetUserInfo :status="showSetUserInfo" @closeSetUserInfo="closeSetUserInfo"></SetUserInfo>
    </template>
    <!-- 设置组件 -->
    <template v-slot:userSetting>
      <UserSetting :status="showUserSetting" @closeUserSetting="closeUserSetting"></UserSetting>
    </template>
  </Mask>
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
import TabBar from "@/components/TabBar/index"
import Mask from "@/components/Mask/index"
import My from "@/components/My/index"
import SetUserInfo from "@/components/SetUserInfo/index"
import UserSetting from "@/components/UserSetting/index"
let index
let a

export default {
  name: "my",
  components: {
    NavBar,
    Card,
    TabBar,
    Mask,
    SetUserInfo,
    UserSetting,
  },
  onTabItemTap(item) {
    index = item.index
  },
  // onPageScroll(e) {
  //   console.log(e.scrollTop)
  //   if (e.scrollTop >= a) {
  //     console.log("😜😜😜😜😜😜😜")
  //   }
  // },
  setup() {
    const store = useStore()
    store.commit("INDEX", index)

    const state = reactive({
      showMask: false,
      showPublish: false,
      showSetUserInfo: false,
      showUserSetting: false,
      containerHeight: "0px",
      navBarInfo: {
        pageName: "吴想要雨",
      },
      target: 1,

      myHeight: "0px", // 整个页面高度-导航栏
      userInfoDomHeight: 0, //个人信息dom高度
      navHeight: "0px", //导航栏高度
      style: { position: "absolute", top: "0px" },
    })
    const index = computed(() => store.state.user.index)
    onMounted(() => {
      state.myHeight = countScrollHeight() + "px"
      state.navHeight = getNavHeight() + "px"
      setTimeout(() => {
        // TODO 获取个人信息dom高度
        getDomHeight("user-info").then((res) => {
          console.log("获取个人信息dom高度", res)
          state.userInfoDomHeight = res
          a = res
        })
      }, 600)
    })
    function goConcernedPage() {
      Taro.navigateTo({
        url: "/pages/concerned/index?name=" + "吴想要雨" + "&id=" + "00001",
      })
    }
    function goFansPage() {
      Taro.navigateTo({
        url: "/pages/fans/index?name=" + "吴想要雨" + "&id=" + "00001",
      })
    }
    function setUserInfo() {
      console.log("00000")
      state.showMask = true
      state.showSetUserInfo = true
    }
    function closeSetUserInfo() {
      state.showMask = false
      state.showSetUserInfo = false
    }
    function setUserSetting() {
      console.log("11111")
      state.showMask = true
      state.showUserSetting = true
    }
    function closeUserSetting() {
      state.showMask = false
      state.showUserSetting = false
    }

    function onScroll(e) {
      console.log(e)
      let scrollTop = e.detail.scrollTop
      if (scrollTop >= state.userInfoDomHeight) {
        // console.log("😜")
        state.style = {
          position: "fixed",
          top: state.navHeight,
        }
      } else {
        state.style = {
          position: "absolute",
          top: "0px",
        }
      }
    }

    return {
      ...toRefs(state),
      index,
      goConcernedPage,
      goFansPage,
      setUserInfo,
      setUserSetting,
      closeSetUserInfo,
      closeUserSetting,

      onScroll,
    }
  },
}
</script>

<style lang="scss">
.my {
  width: 100vw;
  box-sizing: border-box;
  font-size: 28px;
  color: #000;
  overflow: scroll;

  .user-info {
    width: 100vw;
    padding-top: 100px;
    padding-bottom: 40px;
    flex-direction: column;

    .avatar {
      width: 140px;
      height: 140px;
      border-radius: 50%;
    }

    .data {
      width: 100vw;
      margin-top: 30px;
      font-size: 26px;

      .item {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0 40px;

        .number {
          color: #000;
          font-size: 30px;
          font-weight: 600;
        }
      }
    }

    .handle {
      width: 100vw;
      margin-top: 30px;
      font-weight: 600;

      view {
        margin: 0 8px;
        height: 64px;
        line-height: 64px;
        padding: 0 44px;
        border-radius: 6px;
        background-color: rgb(231, 231, 231);
      }
    }
  }

  .prod-nav {
    background-color: #fff;
    width: 100vw;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    border-top: 1px solid #ccc;
    color: rgb(126, 126, 126);

    .target {
      color: #000;
      position: relative;
      font-weight: 600;

      &::after {
        content: "";
        position: absolute;
        bottom: -16px;
        left: 50%;
        transform: translateX(-50%);
        height: 5px;
        width: 50px;
        background-color: #000;
      }
    }
  }

  .prods {
    position: relative;
  }

  .prod-content {
    padding-top: 80px;
    width: 100vw;
    display: grid;
    grid-template-columns: repeat(3, calc(calc(100vw / 3) - calc(8px / 3)));
    grid-gap: 4px;
    grid-auto-rows: calc(100vw / 3);

    .item {
      image {
        height: 100%;
        width: 100%;
      }
    }
  }
}

.overflow {
  overflow: hidden;
}

.center {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
