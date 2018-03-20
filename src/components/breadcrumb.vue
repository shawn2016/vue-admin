<template>
  <div class="vue-layout-breadcrumb">
         <Breadcrumb class="fl">
        <BreadcrumbItem to="/">Home</BreadcrumbItem>
        <BreadcrumbItem to="/components/breadcrumb">Components</BreadcrumbItem>
        <BreadcrumbItem>Breadcrumb</BreadcrumbItem>
    </Breadcrumb>
    <slot></slot>
                </div>
</template>

<script>
export default {};
</script>

<style lang="less">
.vue-layout-breadcrumb {
    overflow: hidden;
    background: #f2f4f6;
    margin: 70px 10px 0px;
    padding: 0px 20px;
    line-height: 50px;
}
</style>
