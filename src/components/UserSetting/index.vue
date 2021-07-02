<template>
  <view class="setting">
    <view @tap="clickItem">分享到微信</view>
    <view @tap="clickItem">意见反馈</view>
    <view @tap="clickItem">获取帮助</view>
    <view @tap="clickItem">关于</view>
    <view @tap="closeUserSetting">取消</view>
  </view>
</template>
<script>
import Taro from "@tarojs/taro";
import { useStore } from "vuex";
import { onMounted, reactive, toRefs, computed, watch, ref } from "vue";
import func from "vue-editor-bridge";
export default {
  name: "tabBar",
  setup(props, ctx) {
    const store = useStore();
    const index = computed(() => store.state.user.index);
    const state = reactive({
      nickName: "wuyi",
      signature: "这是我的个性签名",
    });

    onMounted(() => {});

    function closeUserSetting() {
      ctx.emit("closeUserSetting");
    }

    function clickItem() {
      Taro.showToast({
        title: "开发人员正在摸鱼🐟",
        icon: "none",
      });
    }

    return {
      ...toRefs(state),
      index,
      closeUserSetting,
      clickItem,
    };
  },
};
</script>
<style lang="scss">
.setting {
  width: calc(100vw - 100px);
  background-color: #fff;
  border-radius: 30px;
  position: absolute;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  // box-sizing: border-box;
  // padding: 32px;
  z-index: 100;

  view {
    font-size: 28px;
    color: #000;
    height: 100px;
    line-height: 100px;
    text-align: center;
    border-bottom: 1px solid rgb(240, 240, 240);

    &:nth-last-child(1) {
      border: none;
    }
  }
}
</style>
