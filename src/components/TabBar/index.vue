<template>
  <view id="TabBar" class="tab-bar">
    <view class="tab" @tap="changeTabBar(0)">
      <image src="@/assets/images/home.png" v-if="index === 0"></image>
      <image src="@/assets/images/home1.png" v-else></image>
    </view>
    <view class="tab" @tap="puhlish">
      <image src="@/assets/images/fabu.png" v-if="index === 1"></image>
      <image src="@/assets/images/fabu1.png" v-else></image>
    </view>
    <view class="tab" @tap="changeTabBar(2)">
      <image src="@/assets/images/my.png" v-if="index === 2"></image>
      <image src="@/assets/images/my1.png" v-else></image>
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
    function changeTabBar(idx) {
      if (index.value === idx) return;
      store.commit("INDEX", idx);
    }
    function puhlish() {
      ctx.emit("publish");
    }
    return {
      index,
      changeTabBar,
      puhlish,
    };
  },
};
</script>
<style lang="scss">
.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  // box-sizing: border-box;
  // padding: 0 40px;
  height: 140px;
  width: 100vw;
  background: rgba($color: #fff, $alpha: 0.5);
  backdrop-filter: blur(15px);
  display: flex;
  align-items: center;
  // justify-content: space-between;
  justify-content: space-around;
  z-index: 99;

  .tab {
    width: 60px;
    height: 60px;

    image {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
