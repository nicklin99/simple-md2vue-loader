<template>
  <div class="demo">
    <div class="view"><slot name="vue"></slot></div>
    <div class="highlight" ref="source"><slot name="highlight"></slot></div>
    <div class="topright">
      <div class="item" @click="onCopy"><svg viewBox="64 64 896 896" focusable="false" class="" data-icon="snippets" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M832 112H724V72c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v40H500V72c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v40H320c-17.7 0-32 14.3-32 32v120h-96c-17.7 0-32 14.3-32 32v632c0 17.7 14.3 32 32 32h512c17.7 0 32-14.3 32-32v-96h96c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zM664 888H232V336h218v174c0 22.1 17.9 40 40 40h174v338zm0-402H514V336h.2L664 485.8v.2zm128 274h-56V456L544 264H360v-80h68v32c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-32h152v32c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-32h68v576z"></path></svg></div>
      <div class="item codepen" @click="redirectCodepen"></div>
    </div>
    <slot></slot>
    <textarea ref="input" class="input" :value="source"></textarea>
    <form method="post" ref="codepen" action="https://codepen.io/pen/define" class="hidden" target="_blank" rel="noopener">
      <input type="hidden" name="data" :value="codepen">
      <input type="submit" />
    </form>
  </div>
</template>

<script>
export default {
  props:{
    code:Object
  },
  name: 'Demo',
  data(){
    return {
      source: '',
      codepen: ''
    }
  },
  mounted(){
    // 多行字符串用属性没办法传过来，这个办法解决比较方便
    this.source = this.$refs.source.innerText
    const script = this.code.script.replace('<script>','').replace('<\/script>','').replace('export default','');
    const css_pre_processor = this.code.style && this.code.style.replace(/<style[\s\w=]*["']?(\w*)["']?.*>/,'$1') || 'none'
    const style = this.code.style && this.code.style.replace(/[^>]*>([\S\s]*)<\/style>/,'$1') || ''
    this.codepen = JSON.stringify({
        title: 'vue组件演示',
        html: `${this.code.html.replace('<template>','<div id="root">').replace('</template>','</div>')}</div>` || '',
        css_pre_processor,
        css: style,
        js: `new Vue(${script}).$mount('#root')` || '',
        js_external: 'https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.10/vue.min.js'
    })
  },
  methods:{
    redirectCodepen(){
      this.$refs.codepen.submit()
    },
    onCopy(){
      this.$refs.input.select()
      const result = document.execCommand('Copy')
      if (result) {
        window.alert('复制成功')
      }
    }
  }
}
</script>

<style scoped>
.demo{
  display: flex;
  border:1px solid #eee;
  padding: 20px;
  position: relative;
}
.highlight{
  flex:1;
  border-left: 1px solid #eee;
  padding-left: 20px;
}
.view{
  flex:1;
}
.topright{
  position: absolute;
  right: 10px;
  top: 10px;
  display: flex;
}
.item{
  border:1px solid #000;
  padding: 2px;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
  cursor: pointer;
}
.codepen{
    overflow: hidden;
    background: transparent url(https://gw.alipayobjects.com/zos/rmsportal/OtZslpOjYXijshDERXwc.svg) center / 14px no-repeat;
    cursor: pointer;
    -webkit-transition: all .3s;
    transition: all .3s;
}
.input{
  left: -1000%;
  width: 1px;
  height: 1px;
  position: absolute;
  top: 50%;
  border: 1px solid #000;
}
.hidden{
  display: none
}
</style>



