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
          mode="widthFix"
          class="publish-minus"
          src="@/assets/images/minus-bold.png"
        ></image>
      </view>
    </view>
    <view class="publish-content">
      <view class="mid">
        <image
          mode="aspectFill"
          :src="publishImg"
          v-if="publishImg"
          @tap="previewImg"
        ></image>
        <textarea
          v-model="inputValue"
          name=""
          id=""
          :maxlength="120"
          :cols="30"
          :rows="10"
          placeholder="添加想法..."
          placeholder-class="placeholderclass"
        ></textarea>
      </view>
      <view class="address" v-if="showAddress">
        <view class="left">
          <image src="@/assets/images/location.png"></image>
          <text>This is addrss name.</text>
        </view>
        <image
          class="right"
          src="@/assets/images/close-black.png"
          @tap="showAddress = false"
        ></image>
      </view>
      <view class="handle-add">
        <view class="left">
          <view @tap="selectImg">
            <image mode="widthFix" src="@/assets/images/img.png"></image>
            <text>图片</text>
          </view>
          <view @tap="showAddress = true">
            <image mode="widthFix" src="@/assets/images/addr.png"></image>
            <text>位置</text>
          </view>
        </view>
        <view class="right" :class="{ submit: isSubmit() }" @tap="submitForm"
          >发送</view
        >
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
      showAddress: false, //显示位置
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

    // 选择图片
    function selectImg() {
      Taro.chooseImage({
        count: 1,
        sizeType: ["original", "compressed"],
        sourceType: ["album", "camera"],
        success: function (res) {
          console.log(res.tempFilePaths[0]);
          state.publishImg = res.tempFilePaths[0];
        },
      });
    }

    // 判断是否可以发送内容
    function isSubmit() {
      return state.inputValue || state.publishImg;
    }

    function submitForm() {
      if (!isSubmit()) {
        return false;
      } else {
        Taro.showToast({
          title: "开发人员正在摸鱼🐟",
          icon: "none",
        });
      }
    }

    function previewImg() {
      Taro.previewMedia({
        sources: [
          {
            url: state.publishImg,
          },
        ],
      });
    }

    return {
      ...toRefs(state),
      index,
      closePublish,
      selectImg,
      isSubmit,
      submitForm,
      previewImg,
    };
  },
};
</script>
<style lang="scss">
.publish {
  position: absolute;
  top: 0;
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
        max-height: 200px;
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
      align-items: flex-start;
      justify-content: space-between;
      border-radius: 8px;
      background-color: rgb(236, 236, 236);
      padding: 16px 20px;
      font-size: 26px;
      color: #222;

      .left {
        flex: auto;
        display: flex;
        align-items: flex-start;
        box-sizing: border-box;
        padding-right: 20px;
        image {
          height: 26px;
          width: 22px;
          margin-right: 12px;
          margin-top: 6px;
        }
        text {
          flex: auto;
          width: 440px;
          word-wrap: break-word;
        }
      }
      .right {
        flex: none;
        width: 20px;
        height: 20px;
        margin-top: 6px;
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
        view {
          display: flex;
          flex-direction: column;
          align-items: center;
          font-size: 24px;
          margin-right: 40px;
          image {
            width: 30px;
            margin-bottom: 8px;
          }
        }
      }

      .right {
        border-radius: 10px;
        height: 70px;
        line-height: 70px;
        width: 180px;
        text-align: center;
        font-size: 28px;
        color: #fff;
        background: rgb(196, 196, 196);
      }
      .submit {
        background-color: #222;
      }
    }
  }
}
</style>
