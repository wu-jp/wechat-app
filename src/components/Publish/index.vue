<template>
  <view id="publish" class="publish">
    <view class="nav-publish" :style="{ height: height }">
      <view class="nav-content" :style="{ top: navTop, height: navHeight }">
        <image
          @tap="closePublish"
          class="publish-close"
          src="@/assets/images/close-bold.png"
        ></image>
        <image
          class="publish-minus"
          mode="widthFix"
          src="@/assets/images/minus-bold.png"
        ></image>
      </view>
    </view>
    <view class="publish-content">
      <view class="mid">
        <image :src="publishImg" v-if="publishImg" mode="widhtFix"></image>
        <textarea
          v-model="inputValue"
          name=""
          id=""
          cols="30"
          rows="10"
          placeholder="添加想法..."
          placeholder-class="placeholderclass"
        ></textarea>
      </view>
      <view class="address">
        <view class="left">
          <image src="@/assets/images/location.png"></image>
          <text>This is addrss name.</text>
        </view>
        <image class="right" src="@/assets/images/close-black.png"></image>
      </view>
      <view class="handle-add">
        <view class="left">
          <text>图片</text>
          <text>位置</text>
        </view>
        <view class="right">发送</view>
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
  setup(props, ctx) {
    const store = useStore();
    const index = computed(() => store.state.user.index);
    const state = reactive({
      height: null,
      navHeight: null,
      navTop: null,
      navBottom: null,

      publishImg: "", //发布的图片
      inputValue: "", //发布的文字内容
    });

    onMounted(() => {
      let tmpPhoneSize = Taro.getMenuButtonBoundingClientRect();
      let tmpSystemInfo = Taro.getSystemInfoSync();
      state.height =
        tmpSystemInfo.statusBarHeight +
        tmpPhoneSize.height +
        (tmpPhoneSize.top - tmpSystemInfo.statusBarHeight) * 2 +
        "px";
      state.navTop = tmpPhoneSize.top + "px";
      state.navBottom = tmpPhoneSize.bottom + "px";
      state.navHeight = tmpPhoneSize.height + "px";
    });

    function closePublish() {
      ctx.emit("closePublish");
    }

    return {
      ...toRefs(state),
      index,
      closePublish,
    };
  },
};
</script>
<style lang="scss">
.publish {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  border-radius: 20px 20px 0 0;
  height: 100vh;
  width: 100vw;
  z-index: 100;

  .nav-publish {
    position: relative;
    width: 100vw;

    .nav-content {
      position: absolute;
      width: 100vw;

      .publish-close {
        position: absolute;
        top: 50%;
        left: 30px;
        transform: translateY(-50%);
        width: 40px;
        height: 40px;
      }
      .publish-minus {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 60px;
      }
    }
  }

  .publish-content {
    box-sizing: border-box;
    padding: 70px;

    .mid {
      display: flex;
      margin-bottom: 30px;

      image {
        width: 200px;
        margin-right: 20px;
        max-height: 300px;
      }

      textarea {
        font-size: 28px;
      }

      .placeholderclass {
        color: rgb(105, 105, 105);
      }
    }

    .address {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-radius: 8px;
      background-color: rgb(236, 236, 236);
      padding: 16px 20px;
      font-size: 26px;
      color: #222;

      .left {
        display: flex;
        align-items: center;
        image {
          height: 26px;
          width: 22px;
          margin-right: 12px;
        }
      }
      .right {
        width: 20px;
        height: 20px;
      }
    }

    .handle-add {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #000;
      font-size: 26px;
      margin-top: 40px;
      .left {
        display: flex;
        align-items: center;
      }

      .right {
        border-radius: 10px;
        height: 70px;
        line-height: 70px;
        width: 180px;
        text-align: center;
        font-size: 28px;
        color: #fff;
        background-color: #222;
      }
    }
  }
}
</style>
