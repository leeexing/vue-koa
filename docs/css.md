# css

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