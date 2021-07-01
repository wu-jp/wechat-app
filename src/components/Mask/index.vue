<template>
  <view id="mask" class="mask">
    <!-- 发布 -->
    <slot name="publish"></slot>
    <!-- 设置个人信息 -->
    <slot name="setUserInfo"></slot>
    <!-- 设置 -->
    <slot name="userSetting"></slot>
  </view>
</template>
<script>
import { useStore } from "vuex";
import { onMounted, reactive, toRefs, computed, watch, ref } from "vue";
export default {
  name: "tabBar",
  setup() {
    const store = useStore();
    const index = computed(() => store.state.user.index);

    return {
      index,
    };
  },
};
</script>
<style lang="scss">
.mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba($color: #000000, $alpha: 0.5);
  z-index: 99;
}
</style>
