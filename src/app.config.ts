export default {
  pages: [
    'pages/index/index',
    'pages/publish/index',
    "pages/found/index",
    "pages/my/index"
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#000000',
    selectedColor: '#1296db',
    backgroundColor: '#ffffff',
    borderStyle: 'white',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '',
        iconPath: 'assets/images/home1.png',
        selectedIconPath: 'assets/images/home.png'
      },
      {
        pagePath: 'pages/found/index',
        text: '',
        iconPath: 'assets/images/love1.png',
        selectedIconPath: 'assets/images/love.png'
      },
      {
        pagePath: 'pages/publish/index',
        text: '',
        iconPath: 'assets/images/fabu1.png',
        selectedIconPath: 'assets/images/fabu.png'
      },
      {
        pagePath: 'pages/my/index',
        text: '',
        iconPath: 'assets/images/my1.png',
        selectedIconPath: 'assets/images/my.png'
      },
    ]
  }
}
