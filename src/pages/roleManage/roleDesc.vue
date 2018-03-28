<template>
  <div>
    <i-layout>
      <i-breadcrumb t2="菜单列表" t3="菜单详情">
        <Button class="fr vue-back-btn" @click="$router.go(-1)" shape="circle">返回</Button>
      </i-breadcrumb>
      <div class="vue-panel">
        <Row type="flex" justify="center">
          <Col span="12" :md="14" :lg="12" :xs="24" :sm="24">
          <Form ref="formValidate" :model="formValidate" :label-width="100">
            <FormItem label="用户名:" prop="menuId">
              <label>{{formValidate.menuId}}</label>
            </FormItem>
            <FormItem label="用户姓名:" prop="userName">
              <label>{{formValidate.userName}}</label>
            </FormItem>
            <FormItem label="创建时间:" prop="createTime">
              <label>{{formValidate.createTime | formatDate}}</label>
            </FormItem>
            <FormItem label="最近更新时间:" prop="updateTime">
              <label>{{formValidate.updateTime | formatDate}}</label>
            </FormItem>
            <FormItem label="手机号码:" prop="phonenum">
              <label>{{formValidate.phonenum}}</label>
            </FormItem>
            <FormItem label="身份证号:" prop="identifyNo">
              <label>{{formValidate.identifyNo}}</label>
            </FormItem>
            <FormItem label="用户类型:" prop="refUserRoleCode">
              <label>{{formValidate.refUserRoleCode | refUserRoleCode}}</label>
            </FormItem>
            <FormItem label="用户状态:" prop="status">
              <label>{{formValidate.status | status}}</label>
            </FormItem>
            <FormItem label="职务:">
              <label>{{formValidate.userDuty}}</label>
            </FormItem>
            <FormItem label="备注:" prop="desc">
              <label>{{formValidate.desc}}</label>
            </FormItem>

          </Form>
          </Col>
        </Row>
      </div>
    </i-layout>
  </div>
</template>

<script>
import iLayout from "../../components/layout.vue";
import iBreadcrumb from "../../components/breadcrumb.vue";
import { getMenuList } from "../../service/getData";
import filters from "../../filters";
export default {
  name: "userDesc",
  components: {
    iLayout,
    iBreadcrumb
  },
  filters: {
    formatDate(date) {
      return filters.formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
    status(name) {
      return filters.userStatus(name);
    },
    refUserRoleCode(name) {
      return filters.refUserRoleCode(name);
    }
  },
  data() {
    return {
      formValidate: {}
    };
  },
  created() {
    if (this.$route.query && this.$route.query.menuId) {
      this.findMenuInfo(this.$route.query.menuId);
    }
  },
  methods: {
    async findMenuInfo(menuId) {
      const res = await getMenuList({
        params: {
          menuId
        }
      });
      if (res.respCode === "000000" && res.values) {
        this.formValidate = res.values[0];
      }
    }
  }
};
</script>

<style>

</style>
