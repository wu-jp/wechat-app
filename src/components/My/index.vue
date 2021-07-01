<template>
  <view id="my" class="my" :class="{ overflow: showMask }">
    <view class="user-info center">
      <image
        class="avatar"
        mode="widhtFix"
        src="@/assets/images/avatar.jpeg"
      ></image>
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
        <view @tap="setUserSetting">设置</view>
      </view>
    </view>
    <view class="prods">
      <!-- 切换作品 -->
      <view class="prod-nav">
        <text :class="{ target: target === 1 }" @tap="target = 1">作品</text>
        <text :class="{ target: target === 2 }" @tap="target = 2">喜欢</text>
      </view>
      <!-- 作品 -->
      <view>
        <view class="prod-content" v-if="target === 1">
          <view class="item" v-for="(item, index) in 13" :key="index">
            <image v-if="index % 2" src="@/assets/images/pord.png"></image>
            <image v-else src="@/assets/images/pord2.png"></image>
          </view>
        </view>
        <view class="prod-content" v-else>
          <view class="item" v-for="(item, index) in 5" :key="index">
            <image v-if="!(index % 2)" src="@/assets/images/pord.png"></image>
            <image v-else src="@/assets/images/pord2.png"></image>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import Taro from "@tarojs/taro";
import { useStore } from "vuex";
import { onMounted, reactive, toRefs, computed, watch, ref } from "vue";
export default {
  name: "tabBar",
  props: {
    showMask: Boolean,
  },
  setup(props, ctx) {
    const store = useStore();
    const index = computed(() => store.state.user.index);
    const state = reactive({
      target: 1,
    });
    onMounted(() => {
      console.log(props.showMask);
    });

    function goConcernedPage() {
      Taro.navigateTo({
        url: "/pages/concerned/index?name=" + "吴想要雨" + "&id=" + "00001",
      });
    }
    function goFansPage() {
      Taro.navigateTo({
        url: "/pages/fans/index?name=" + "吴想要雨" + "&id=" + "00001",
      });
    }

    function setUserInfo() {
      ctx.emit("setUserInfo");
    }

    function setUserSetting() {
      ctx.emit("setUserSetting");
    }

    return {
      ...toRefs(state),
      index,
      goConcernedPage,
      goFansPage,
      setUserInfo,
      setUserSetting,
    };
  },
};
</script>
<style lang="scss">
.my {
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  font-size: 28px;
  color: #000;

  .user-info {
    width: 100vw;
    padding-top: 200px;
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

  .prods {
    padding-bottom: 160px;
  }

  .prod-nav {
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

  .prod-content {
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
