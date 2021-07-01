<template>
  <view class="swiper-box">
    <swiper class="swiper" vertical="true">
      <swiper-item v-for="(item, index) in 5" :key="item">
        <view class="card">
          <view class="author">
            <view class="left">
              <image src="@/assets/images/avatar.jpeg" />
              <text>吴想要雨</text>
            </view>
            <view class="right">关注</view>
          </view>
          <view class="prod">
            <image
              v-if="index % 2"
              mode="widthFix"
              src="@/assets/images/pord.png"
            ></image>
            <image
              v-else
              mode="aspectFill"
              src="@/assets/images/IMG_0019.jpeg"
            ></image>
          </view>
          <view class="handle">
            <view class="handle-prod">
              <image class="share" src="@/assets/images/share.png"></image>
              <view class="right">
                <view class="love">
                  <image src="@/assets/images/love1.png"></image>
                  <text>{{ index + 1 }}</text>
                </view>
                <image class="pinlun" src="@/assets/images/pinlun.png"></image>
              </view>
            </view>
            <view class="desc">这是我喜欢的。</view>
            <view class="time">06月22日 00:12</view>
          </view>
        </view>
      </swiper-item>
    </swiper>
  </view>
</template>
<script>
import { getPagesCountHeight, getDomHeight } from "@/utils/common.js";
import { onMounted, reactive, toRefs, computed, watch, ref } from "vue";
import { useStore } from "vuex";
import NavBar from "@/components/NavBar/index";
import Card from "@/components/Card/index";
import TabBar from "@/components/TabBar/index";
export default {
  name: "card",
  setup() {
    const store = useStore();
    const state = reactive({});
    onMounted(() => {});

    return {
      ...toRefs(state),
    };
  },
};
</script>
<style lang="scss">
.swiper-box {
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;

  .swiper {
    width: 100%;
    height: 100%;

    .card {
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      box-sizing: border-box;
      padding: 0 32px;
      font-size: 28px;
      color: #222;
      width: 100vw;

      .author {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .left {
          display: flex;
          align-items: center;
          font-weight: 600;

          image {
            height: 60px;
            width: 60px;
            border-radius: 50%;
            margin-right: 10px;
          }
        }

        .right {
          color: rgb(11, 121, 185);
        }
      }

      .prod {
        width: 100%;
        margin: 20px 0 12px;

        image {
          width: 100%;
          height: 55vh;
        }
      }

      .handle {
        .handle-prod {
          display: flex;
          align-items: center;
          justify-content: space-between;

          .share {
            width: 40px;
            height: 40px;
          }
          .right {
            display: flex;
            align-items: center;

            .love {
              display: flex;
              align-items: center;
              margin-right: 20px;
              color: #222;
              font-size: 22px;

              image {
                width: 50px;
                height: 50px;
                margin-right: 4px;
              }
            }

            .pinlun {
              width: 40px;
              height: 40px;
            }
          }
        }

        .desc {
          margin: 12px 0;
        }
        .time {
          font-size: 22px;
        }
      }
    }
  }
}
</style>
