import Taro from "@tarojs/taro";

// TODO:计算页面除去导航栏高度
export function countScrollHeight() {
  let systemInfo = Taro.getSystemInfoSync();
  let tmpPhoneSize = Taro.getMenuButtonBoundingClientRect();
  let tmpSystemInfo = Taro.getSystemInfoSync();
  //window height
  let ktxWindowHeight = systemInfo.windowHeight;
  //navbar height
  let navHeight =
    tmpSystemInfo.statusBarHeight +
    tmpPhoneSize.height +
    (tmpPhoneSize.top - tmpSystemInfo.statusBarHeight) * 2;
  //scroll-view height
  const scrollHeight = ktxWindowHeight - navHeight;
  return scrollHeight;
}

// TODO: 获取页面总高度
export function getPagesCountHeight() {
  let systemInfo = Taro.getSystemInfoSync();
  let height = systemInfo.windowHeight;
  return height;
}

// TODO: 获取dom的高度  id: dom的id值
export function getDomHeight(id) {
  const query = Taro.createSelectorQuery();
  query.select("#" + id).boundingClientRect();
  query.selectViewport().scrollOffset();
  return new Promise((resolve, reject) => {
    query.exec(function (res) {
      if (res && res.length && res[0]) {
        resolve(res[0].height);
      } else {
        resolve(0);
      }
    });
  });
}
