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