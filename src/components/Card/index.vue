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
            <image v-if="index % 2" mode="widthFix" src="@/assets/images/pexels-1.jpg" />
            <image v-else mode="aspectFill" src="@/assets/images/pexels-2.jpg" />
          </view>
          <view class="handle">
            <view class="handle-prod">
              <image class="share" src="@/assets/images/Right2.png" />
              <view class="right">
                <view class="love-or-comment">
                  <image src="@/assets/images/heart.png" />
                  <text>{{ index + 1 }}</text>
                </view>
                <view class="love-or-comment">
                  <image src="@/assets/images/message-circle.png" />
                  <text>{{ index + 1 }}</text>
                </view>
              </view>
            </view>
            <view class="desc">这是我喜欢的。</view>
            <view class="time">06月22日 厦门·世贸海峡大厦B座</view>
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
    onMounted(() => { });

    return {
      ...toRefs(state),
    };
  },
};
</script>
<style lang="scss">
.swiper-box {
  width: 100vw;

  .swiper {
    width: 100%;
    height: 100%;

    .card {
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      // box-sizing: border-box;
      // padding: 0 32px;
      font-size: 28px;
      color: #222;
      width: 100vw;

      .author {
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 0 20px;

        .left {
          display: flex;
          align-items: center;
          font-weight: 600;

          image {
            height: 66px;
            width: 66px;
            border-radius: 50%;
            margin-right: 10px;
          }
        }

        .right {
          width: 140px;
          height: 50px;
          line-height: 50px;
          text-align: center;
          border-radius: 8px;
          background-color: #5871f2;
          color: #fff;
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
        box-sizing: border-box;
        padding: 0 20px;

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

            .love-or-comment {
              display: flex;
              align-items: center;
              margin-right: 20px;
              color: #222;
              font-size: 22px;

              image {
                width: 40px;
                height: 40px;
                margin-right: 4px;
              }
            }
          }
        }

        .desc {
          margin: 12px 0;
          color: #000;
        }

        .time {
          font-size: 24px;
          color: #a0a0a0;
        }
      }
    }
  }
}
</style>
