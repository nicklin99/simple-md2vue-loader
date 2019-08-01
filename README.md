
# simple-md2vue-loader

将一个md文件转出一个vue组件的webpack loader
 
### 主要特点

1. 简单实现
2. . 支持代码演示，代码拷贝，发布到codepen,代码高亮
3. 默认使用demo作为演示代码组件，demo组件可以自己自定义， 可以参考默认实现demo

### 使用参考example webpack.config.js

演示

```vue:hello
// 这里的代码将作为vue组件,组件局部注册为 VueHello
```

```vue
// 这里的代码不会作为演示
```

###  演示demo组件需要组件实现，请参考 example/src/demo.vue