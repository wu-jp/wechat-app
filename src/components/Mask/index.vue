<template>
  <view id="mask" class="mask"
    :class="{ 'mask-show': maskStatus === 'entering' || maskStatus === 'entered', 'mask-hide': maskStatus === 'exiting' || maskStatus === 'exited' }">
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
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const store = useStore();
    const index = computed(() => store.state.user.index);
    const maskStatus = ref('exited') // exited -> entering -> entered -> exiting -> exited
    watch(() => props.status, (newVal) => {
      if (newVal === true) {
        maskStatus.value = 'entering'
        setTimeout(() => {
          maskStatus.value = 'entered'
        }, 200)
      } else {
        maskStatus.value = 'exiting'
        setTimeout(() => {
          maskStatus.value = 'exited'
        }, 200)
      }
    })

    return {
      index,
      maskStatus
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
  transition: all .2s ease-out;
}

.mask-show {
  z-index: 99;
  background-color: rgba($color: #000000, $alpha: 0.5);
}

.mask-hide {
  z-index: -1;
  background-color: rgba($color: #000000, $alpha: 0);
}
</style>
