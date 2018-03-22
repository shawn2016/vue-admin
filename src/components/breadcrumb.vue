<template>
    <div class="vue-layout-breadcrumb">
        <Breadcrumb class="fl">
            <BreadcrumbItem to="/">
                <Icon :type="firstMenu | menuFilterIcon"></Icon> {{firstMenu | menuFilterName}}</BreadcrumbItem>
            <BreadcrumbItem v-for="x in router" :key="x.name" v-if="secondMenu==x.name">{{x.meta.title}}</BreadcrumbItem>
        </Breadcrumb>
        <slot></slot>
    </div>
</template>

<script>
import router, { menuGroup } from "../router";
export default {
  filters: {
    menuFilterName(name) {
      return menuGroup[name].name;
    },
    menuFilterIcon(name) {
      return menuGroup[name].icon;
    }
  },
  data() {
    return {
      firstMenu: "",
      secondMenu: "",
      router
    };
  },
  created() {
    this.firstMenu = this.$route.path.split("/")[1];
    this.secondMenu = this.$route.path.split("/")[2];
  }
};
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
