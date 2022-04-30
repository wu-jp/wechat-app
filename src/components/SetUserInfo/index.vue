<template>
  <view class="setUserInfo"
    :class="{ 'setUserInfo-show': setUserStatus === 'entering' || setUserStatus === 'entered', 'setUserInfo-hide': setUserStatus === 'exiting' || setUserStatus === 'exited' }">
    <view class="edit-title">
      <image src="@/assets/images/close-black.png" @tap="closeSetUserInfo"></image>
      <text>编辑个人资料</text>
      <text class="save" @tap="saveEdit">保存</text>
    </view>
    <view class="edit-avatar">
      <image src="@/assets/images/avatar.jpeg"></image>
      <text>更换头像</text>
    </view>
    <view class="edit-item edit-name">
      <view>昵称</view>
      <input type="text" :maxlength="24" v-model="nickName" placeholder="请输入昵称" />
    </view>
    <view class="edit-item edit-signature">
      <view>个性签名</view>
      <textarea name="" v-model="signature" :maxlength="100" placeholder="请输入个性签名" />
    </view>
    <view class="my-id">
      <view>我的ID</view>
      <image src="@/assets/images/copy.png"></image>
    </view>
  </view>
</template>
<script>
import Taro from "@tarojs/taro";
import { useStore } from "vuex";
import { onMounted, reactive, toRefs, computed, watch, ref } from "vue";
import func from "vue-editor-bridge";
export default {
  name: "tabBar",
  props: {
    status: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, ctx) {
    const store = useStore();
    const index = computed(() => store.state.user.index);
    const setStatus = computed(() => props.status);

    const setUserStatus = ref('exited') // exited -> entering -> entered -> exiting -> exited
    watch(() => props.status, (newVal) => {
      if (newVal === true) {
        setUserStatus.value = 'entering'
        setTimeout(() => {
          setUserStatus.value = 'entered'
        }, 200)
      } else {
        setUserStatus.value = 'exiting'
        setTimeout(() => {
          setUserStatus.value = 'exited'
        }, 200)
      }
    })
    const state = reactive({
      nickName: "wuyi",
      signature: "这是我的个性签名",
    });

    onMounted(() => { });

    function closeSetUserInfo() {
      ctx.emit("closeSetUserInfo");
    }

    function saveEdit() {
      Taro.showToast({
        title: "开发人员正在摸鱼🐟",
        icon: "none",
      });
    }

    return {
      ...toRefs(state),
      index,
      setStatus,
      setUserStatus,
      closeSetUserInfo,
      saveEdit,
    };
  },
};
</script>
<style lang="scss">
.setUserInfo {
  background-color: #fff;
  border-radius: 20px 20px 0 0;
  width: 100vw;
  height: 70vh;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  transition: all .2s ease-out;
  box-sizing: border-box;
  padding: 32px;
  z-index: 100;

  .edit-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 30px;
    color: #000;
    font-weight: 600;

    image {
      width: 30px;
      height: 30px;
      padding: 10px;
    }

    .save {
      color: rgb(13, 151, 231);
      font-size: 26px;
    }
  }

  .edit-avatar {
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;

    image {
      width: 120px;
      height: 120px;
      border-radius: 50%;
    }

    text {
      margin-top: 20px;
      color: rgb(13, 151, 231);
      font-size: 22px;
    }
  }

  .edit-item {
    view {
      color: #999;
      margin-bottom: 16px;
      font-size: 26px;
    }
  }

  .edit-name {
    font-size: 26px;
    padding-bottom: 20px;
    margin-bottom: 22px;
    border-bottom: 1px solid rgb(219, 219, 219);

    input {
      width: 100%;
    }
  }

  .edit-signature {
    font-size: 26px;
    padding-bottom: 20px;
    margin-bottom: 22px;
    border-bottom: 1px solid rgb(219, 219, 219);

    textarea {
      width: 100%;
      height: 200px;
      text-align: center;
    }
  }

  .my-id {
    display: flex;
    align-items: center;

    view {
      color: #999;
      font-size: 26px;
    }

    image {
      margin-left: 20px;
      width: 20px;
      height: 20px;
    }
  }
}

.setUserInfo-show {
  transform: translateY(0);
}

.setUserInfo-hide {
  transform: translateY(70vh);
}
</style>
