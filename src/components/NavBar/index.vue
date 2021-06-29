<template>
  <view class="nav-wrapper" :style="{ height: height }">
    <image
      class="pageName logo"
      mode="heightFix"
      :style="{ top: navTop, height: navHeight }"
      src="@/assets/images/logo2.png"
      v-if="index === 0"
    ></image>
    <text
      v-else
      class="pageName"
      :style="{ top: navTop, height: navHeight, lineHeight: navHeight }"
      >{{ pageName }}</text
    >
  </view>
</template>


<script>
import { computed, onMounted, reactive, toRefs, watchEffect } from "vue";
import Taro from "@tarojs/taro";
import { useStore } from "vuex";

export default {
  components: {},
  props: {
    navBarInfo: {
      type: Object,
      default() {
        return null;
      },
    },
  },
  setup(props, context) {
    const store = useStore();
    const state = reactive({
      height: null,
      navHeight: null,
      navTop: null,
      navBottom: null,
      pageName: "",
    });
    const index = computed(() => store.state.user.index);
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
      console.log(state.navHeight);
    });
    watchEffect(() => {
      state.pageName = props.navBarInfo.pageName;
    });

    return {
      ...toRefs(state),
      index,
    };
  },
};
</script>

<style lang="scss">
.nav-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100vw;
  background: rgba($color: #fff, $alpha: 0.9);
  z-index: 99;

  .pageName {
    position: absolute;
    left: 30px;
    font-size: 42px;
    font-weight: 600;
    color: #222;
  }

  .logo {
    box-sizing: border-box;
    padding: 16px 0;
  }
}
</style>
