## 项目本地运行方式

### 1.安装依赖

```js
yarn install
```
### 2.构建&运行

```js
yarn build //构建之后会生成dist目录，内有ya.js和ya.css

yarn dev //运行
```

## js、css地址
[ya.js](https://dominiiiic.github.io/yzAnimate2022/dist/ya.js)

[animate.css](https://dominiiiic.github.io/yzAnimate2022/demo/css/animate.css)

[animate.min.css（压缩）](https://dominiiiic.github.io/yzAnimate2022/demo/css/animate.min.css)

<!-- [ya.css（已压缩）](https://dominiiiic.github.io/yzAnimate2022/dist/ya.css) -->

## Demo
[Demo](https://dominiiiic.github.io/yzAnimate2022/demo/)

<!-- [Demo(使用ya.css)](https://dominiiiic.github.io/yzAnimate2022/demo/ya.html) -->

## 一、使用模板动画（需要引入animate.css和ya.js）
如果想使用现成的模板动画，需要添加class：animateJs和动画名（如animateLoading1、animateLoading2）

js会识别class为animateJs的dom元素，并在动画库数组中匹配对应的动画名称，然后插入对应的动画html结构，例：
```html
<div class="animateJs animateLoading1"></div>
```
随后查看调试工具可发现dom结构会变成：
```html
<div class="animateJs animateLoading1">
  <div class="animateLoading1Dom"><div></div><div></div><div></div><div></div></div>
</div>
```

## 二、插件使用方式（需要引入animate.css和ya.js）
使用 animatedClassName 改变 YA 默认行为，将放置在 data-ya 中的 class 类名在页面滚动时生效

```html
<!-- data-ya中放入想使用的动画类名  -->
<div data-ya="fadeInUp"></div> 
```

### 初始化
```js
YA.init({
    useClassNames: true, // 值为 true，将添加滚动 `data-ya` 内容为 class
    initClassName: false, // 初始化后使用的 class 类
    animatedClassName: 'animated',// 动画 class

    offset: 120, // 从原始触发点的偏移量 (px)
    once: false, // 向下滑动时，动画只发生一次
    mirror: true, // 滚动到元素上方时是否应设置动画
});
```
上面的元素将获得两个类：animated和 fadeInUp。使用以上三个设置的不同搭配方式，能够集成任何外部 CSS 动画库。外部库在实际动画之前并不太在意动画状态，因此，若想这些元素在滚动前不可见，需要添加下面这样的样式:
```css
[data-ya] {
  visibility: hidden;
}
[data-ya].animated {
  visibility: visible;
}
```
### 额外添加功能性class

如果想让动画无限循环播放，可加class：infinite
```html
<div class="infinite" data-ya="fadeInUp"></div>
```

如果想让动画延迟播放，可加class：delay-1 delay-2 delay-3 delay-4 delay-5 delay-6 （0.5s的倍数）
```html
<div class="delay-1" data-ya="fadeInUp"></div>
```

如果想修改动画播放时长，可加class：faster（0.5s）、fast（0.8s）、slow（2s）、slower（3s）
```html
<div class="slower" data-ya="fadeInUp"></div>
```

如果想让动画播放完毕停留在第一帧，可加class：backwards
```html
<div class="backwards" data-ya="fadeInUp"></div>
```

<!-- ## 三、插件使用方式（使用ya.css，需要引入ya.js）

### 1. 初始化 YA:

```js
YA.init();

// 可以传一个可选的配置对象
// 下面列出了默认配置
YA.init({
    // 全局配置:
    disable: false, // 禁用。可取值: 'phone'、'tablet'、'mobile'、布尔值、表达式或函数
    startEvent: 'DOMContentLoaded', // YA 应初始化在 document 上绑定的事件名
    initClassName: 'ya-init', // 初始化后使用的 class 类
    animatedClassName: 'ya-animate', // 动画 class
    useClassNames: false, // 值为 true，将添加滚动 `data-ya` 内容为 class
    disableMutationObserver: false, // disables automatic mutations' detections (高级)
    debounceDelay: 50, // 调整窗口大小时使用的 (高级)
    throttleDelay: 99, // 滚动页面时使用的延迟 (高级)
  
    // 通过 'data-ya-*' 属性在每个元素上重写配置:
    offset: 120, // 从原始触发点的偏移量 (px)
    delay: 0, // 取值范围 0-3000, 每多 1 加 50ms
    duration: 400, // 取值范围 0-3000, 每多 1 加 50ms
    easing: 'ease', // YA 动画默认 easing
    once: false, // 向下滑动时，动画只发生一次
    mirror: false, // 滚动到元素上方时是否应设置动画
    anchorPlacement: 'top-bottom', // 定义与窗口有关的元素的哪个位置应触发动画
});
```

### 2. 使用 data-ya 属性设置动画:

```html
  <div data-ya="fade-in"></div>
```

使用 data-ya-* 来调整行为:
```html
  <div
    data-ya="fade-up"
    data-ya-offset="200"
    data-ya-delay="50"
    data-ya-duration="1000"
    data-ya-easing="ease-in-out"
    data-ya-mirror="true"
    data-ya-once="false"
    data-ya-anchor-placement="top-center"
  >
  </div>
```

#### 锚点

还有一个配置属性可以用，不过只能用在每个元素基础上:
* `data-ya-anchor` - 元素的偏移量 offset 将用来触发动画，代替实际的

举例:
```html
<div data-ya="fade-up" data-ya-anchor=".other-element"></div>
```

这样可以在滚动到另一元素时触发某一元素动画，对固定位置元素很有用。

---

### API

三种方式使 YA 对象成为全局变量:

  * `init` - 初始化
  * `refresh` - 重新计算元素的所有偏移量和位置（在窗口调整大小时调用）
  * `refreshHard` - 使用 YA 元素和触发器重新初始化数组 refresh（调用与 DOM 变化相关的 ya 元素）

Example execution:
```javascript
  YA.refresh();
```

---

### JS Events

元素在进行动画处理时，YA 可以在文档上调度两个事件：ya:in和ya:out 用来实现一些额外的功能:
```js
document.addEventListener('ya:in', ({ detail }) => {
  console.log('animated in', detail);
});

document.addEventListener('ya:out', ({ detail }) => {
  console.log('animated out', detail);
});
```

也可以设置 data-ya-id 属性来告诉 YA 触发自定义事件：
```html
<div data-ya="fade-in" data-ya-id="super-duper"></div>
```

此时可以监听两个自定义事件:
- `ya:in:super-duper`
- `ya:out:super-duper`

---

### 其他方法:

#### 添加自定义动画:
有时仅靠内置动画不能实现想要的功能，比如根据分辨率不同在一个盒子中需要两种不同的动画。这时就添加自定义动画，步骤如下，首先在 JS 中自定义动画:

```css
[data-ya="new-animation"] {
  opacity: 0;
  transition-property: transform, opacity;

  &.ya-animate {
    opacity: 1;
  }

  @media screen and (min-width: 768px) {
    transform: translateX(100px);

    &.ya-animate {
      transform: translateX(0);
    }
  }
}
```
然后在 HTML 使用:
```html
<div data-ya="new-animation"></div>
```
该元素将只为移动设备上的 opacity 设置动画，但是从768px宽度开始，该元素也会从右向左滑动.

#### 添加自定义 easing:
与添加自定义动画类似:
```css
[data-ya] {
  body[data-ya-easing="new-easing"] &,
  &[data-ya][data-ya-easing="new-easing"] {
    transition-timing-function: cubic-bezier(.250, .250, .750, .750);
  }
}
```

#### 自定义默认动画距离
内置动画的默认距离是100px，只要使用 SCSS 就可以重写默认距离:
```css
$ya-distance: 200px; // It has to be above import
@import 'node_modules/ya/src/sass/ya.scss';
```
必须配置构建过程以允许其 node_modules 预先导入样式

#### 设置：duration, delay

编写简单的 CSS 来增加另一个持续时间，如:

```css
  body[data-ya-duration='4000'] [data-ya],
  [data-ya][data-ya][data-ya-duration='4000'] {
    transition-duration: 4000ms;
  }
```
此代码将添加 4000ms 的 duration 时间，可供在 YA 元素上设置，或在初始化 YA 脚本时设置为全局 duration 时间。

注意 [data-ya][data-ya] 不是语法错误，而是一个技巧，可以使单个配置比全局配置更重要，这样就不需要标明 “!important”

用法示例:
```html
  <div data-ya="fade-in" data-ya-duration="4000"></div>
```

--- -->

## Predefined options

### Animations

  * Fade animations:
    * fade
    * fade-up
    * fade-down
    * fade-left
    * fade-right
    * fade-up-right
    * fade-up-left
    * fade-down-right
    * fade-down-left

  * Flip animations:
    * flip-up
    * flip-down
    * flip-left
    * flip-right

  * Slide animations:
    * slide-up
    * slide-down
    * slide-left
    * slide-right

  * Zoom animations:
    * zoom-in
    * zoom-in-up
    * zoom-in-down
    * zoom-in-left
    * zoom-in-right
    * zoom-out
    * zoom-out-up
    * zoom-out-down
    * zoom-out-left
    * zoom-out-right

### Anchor placements:

  * top-bottom
  * top-center
  * top-top
  * center-bottom
  * center-center
  * center-top
  * bottom-bottom
  * bottom-center
  * bottom-top

### Easing functions:

  * linear
  * ease
  * ease-in
  * ease-out
  * ease-in-out
  * ease-in-back
  * ease-out-back
  * ease-in-out-back
  * ease-in-sine
  * ease-out-sine
  * ease-in-out-sine
  * ease-in-quad
  * ease-out-quad
  * ease-in-out-quad
  * ease-in-cubic
  * ease-out-cubic
  * ease-in-out-cubic
  * ease-in-quart
  * ease-out-quart
  * ease-in-out-quart

---