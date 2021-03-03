Page({
  data: {
    items: [{
        id: 1,
        zIndex: 5,
        scaleY: 1, 
        opacity: 1,
        right: 136,
        animation: null,
        url: '/images/1.jpeg'
      },
      {
        id: 2,
        zIndex: 4,
        scaleY: .84, 
        opacity: .9,
        right: 20, 
        animation: null,
        url: '/images/2.jpeg'
      },
      {
        id: 3,
        zIndex: 3,
        scaleY: .67, 
        opacity: .8,
        right:-90,
        animation: null,
        url: '/images/3.jpeg'
      },
      {
        id: 4,
        zIndex: 2,
        scaleY: 0, 
        opacity: .8,
        right: 0,
        animation: null,
        url: '/images/4.jpeg'
      },
      {
        id: 5,
        zIndex: 1,
        scaleY: 0, 
        opacity: .8,
        right: 0,
        animation: null,
        url: '/images/5.jpeg'
      }
    ],
    startX: '',
    endX: ''
  },
  onLoad: function (options) {
    this.move()
  },
  /**
   * 移动方向
   */
  left: function () {
    var last = this.data.items.pop(); //获取数组的最后一个
    this.data.items.unshift(last); //放到数组的第一个 
    this.move();
  },
  right: function () {
    var first = this.data.items.shift(); //获取数组的第一个
    this.data.items.push(first); //放到数组的最后一个位置 
    this.move();
  },
  //手指触发开始移动
  moveStart: function (e) {
    var startX = e.changedTouches[0].pageX;
    this.setData({
      startX: startX
    });
  },
  //手指触摸后移动完成触发事件
  moveItem: function (e) {
    var endX = e.changedTouches[0].pageX;
    this.setData({
      endX: endX
    });
    //计算手指触摸偏移剧距离
    var moveX = this.data.startX - this.data.endX;
    //向左移动
    if (moveX > 20) {
      this.left();
    }
    if (moveX < -20) {
      this.right();
    }
  },
  move() {
    let items = this.data.items
    for (let i = 0; i < items.length; i++) {
      let item = items[i]
      var animation = wx.createAnimation({
        duration: 200,
        timingFunction: 'ease-in-out'
      });
      animation.scale(item.scaleY).step(); 
      this.setData({
        ["items[" + i + "].animation"]: animation.export(),
        ["items[" + i + "].zIndex"]: item.zIndex,
        ["items[" + i + "].opacity"]: item.opacity,
        ["items[" + i + "].scaleY"]: item.scaleY,
        ["items[" + i + "].right"]: item.right
      })
    }
  }
})