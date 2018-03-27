<template>
  <div class="bg">
      <slot></slot>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less">
.bg{
    height: 50px;
    background: #f2f4f6;
    padding: 0 20px;
    border: 1px solid #e9eaec;
    border-bottom: none;
    line-height: 50px;
  
}

</style>
