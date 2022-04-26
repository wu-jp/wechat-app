<template>
  <view id="mask" class="mask" :class="{ mask1: status1 === 'show', mask2: status1 === 'hide' }">
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
  props: {
    status: {
      type: String,
      default: 'init',
    },
  },
  setup(props, { emit }) {
    const store = useStore();
    const index = computed(() => store.state.user.index);
    const status1 = computed(() => props.status);

    return {
      index,
      status1,
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
  background-color: rgba($color: #000000, $alpha: 0);
  z-index: -1;
}

.mask1 {
  animation: move1 .2s ease-out forwards;
}

// show
@keyframes move1 {
  0% {
    z-index: -1;
    background-color: rgba($color: #000000, $alpha: 0);
  }

  100% {
    z-index: 99;
    background-color: rgba($color: #000000, $alpha: 0.5);
  }
}

// hide
.mask2 {
  animation: move2 .2s ease-out forwards;
}

@keyframes move2 {
  0% {
    z-index: 99;
    background-color: rgba($color: #000000, $alpha: 0.5);
  }

  100% {
    z-index: -1;
    background-color: rgba($color: #000000, $alpha: 0);
  }
}
</style>
