# h1

## h2


## h3

## list

- 1
- 2
- 3

## link

## image

## 在线代码演示

```vue:hello
<template>
    <div class="root">hello world</div>
</template>
<script>
export default {}
</script>
```

## 带css样式

> demo标题
```vue:
<template>
    <div class="root">hello world222</div>
</template>
<script>
export default {}
</script>
<style scoped>
.root{
    font-size:30px;
    color: blue;
}
</style>
```

## 真实组件

```vue:hello3
<template>
    <div class="root" @click="onClick">{{msg}}</div>
</template>

<script>
export default {
    data(){
        return {
            msg: 'hello world'
        }
    },
    methods:{
        onClick(){
            window.alert('你好,世界')
        }
    }
}
</script>
<style scoped>
.root{
    font-size:30px;
    color: green;
}
</style>
```

```vue
<template>
    <div class="root">不作为演示</div>
</template>
```