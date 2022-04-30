<template>
  <view class="setting"
    :class="{ 'setting-show': userOtherStatus === 'entering' || userOtherStatus === 'entered', 'setting-hide': userOtherStatus === 'exiting' || userOtherStatus === 'exited' }">
    <view class="other-list">
      <view class="item" @tap="clickItem">分享到微信</view>
      <view class="item" @tap="clickItem">意见反馈</view>
      <view class="item" @tap="clickItem">获取帮助</view>
      <view class="item" @tap="clickItem">关于</view>
    </view>
    <view class="item cancel" @tap="closeUserSetting">取消</view>
  </view>
</template>
<script>
import Taro from "@tarojs/taro";
import { useStore } from "vuex";
import { onMounted, reactive, toRefs, computed, watch, ref } from "vue";
export default {
  name: "userSetting",
  props: {
    status: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, ctx) {
    const store = useStore();
    const index = computed(() => store.state.user.index);
    const state = reactive({
      nickName: "wuyi",
      signature: "这是我的个性签名",
    });

    const userOtherStatus = ref('exited') // exited -> entering -> entered -> exiting -> exited
    watch(() => props.status, (newVal) => {
      if (newVal === true) {
        userOtherStatus.value = 'entering'
        setTimeout(() => {
          userOtherStatus.value = 'entered'
        }, 200)
      } else {
        userOtherStatus.value = 'exiting'
        setTimeout(() => {
          userOtherStatus.value = 'exited'
        }, 200)
      }
    })

    onMounted(() => { });

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
      userOtherStatus,
      closeUserSetting,
      clickItem,
    };
  },
};
</script>
<style lang="scss">
.setting {
  width: calc(100vw - 100px);
  position: absolute;
  bottom: 0;
  left: 50%;
  z-index: 100;
  transition: all .2s ease-out;

  .other-list {
    border-radius: 20px 20px 12px 12px;
    background-color: #fff;
    margin-bottom: 20px;
  }

  .item {
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

  .cancel {
    background-color: #fff;
    border-radius: 12px 12px 20px 20px;
  }


}

.setting-show {
  transform: translateX(-50%) translateY(-50px);
}

.setting-hide {
  transform: translateX(-50%) translateY(100%);
}
</style>
