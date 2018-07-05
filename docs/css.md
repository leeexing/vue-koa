# css

## iconfont.scss

1. 先下载
2. 查看 iconfont.css 里面的 `src: url('iconfont.eot?t=1529572074808');` 重点是后面的几位数字
3. 进行替换
4. 将 iconfont 后面的 class 复制到 scss 文件中

## 换肤

> 主要还是思路

1. 首先明确，element-ui 是可以定制主题，但是，还没有能够实现切换主题。这一点需要明确
2. 换肤。当然是要首先定义好一套皮肤，然后通过 `class` 类名去控制页面的整体效果
3. vue里面实现换肤，需要借助 `vuex` 进行全局控制。
4. 要想下次登陆的时候仍旧记住上一次用户设置的主题，那么就必须数据库保存用户的主题设置，每次登陆的时候，再次获取用户主题
5. 由于 vuex 存在一刷新状态就消失（重置）的问题，所以需要每次刷新的时候，再次获取用户的相关设置信息。

## scss

> 有这么一个小坑

```js About.vue
<style lang="scss">
  @import url('./about.scss');
</style>
```

我说怎么就没有起作用呢？捣鼓了半天也没有效果

😂，原来是自己使用方式错误了。 `scss` 语法中，引入文件 `import` 后面不需要再跟 `url()`  ❗❗❗❗

##  给网站添加渐变背景[1]

```css
body {
  background: linear-gradient(#fffad0, #fff);
}
```

会存在一个背景色断层的问题

## getBoundingClientRect的用法

getBoundingClientRect用于获取某个元素相对于视窗的位置集合。集合中有top, right, bottom, left等属性。

1. 语法：这个方法没有参数。
rectObject = object.getBoundingClientRect();

2. 返回值类型：TextRectangle对象，每个矩形具有四个整数性质（ 上， 右 ， 下，和左 ）表示的坐标的矩形，以像素为单位。
  *除了 width 和 height 外的属性都是相对于视口的左上角位置而言的。*

rectObject.top：元素上边到视窗上边的距离;

rectObject.right：元素右边到视窗左边的距离;

rectObject.bottom：元素下边到视窗上边的距离;

rectObject.left：元素左边到视窗左边的距离;




## 参考

[1](https://juejin.im/post/5b0d52e5f265da092918d902)