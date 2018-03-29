<template>
  <div>
    <i-layout>
      <i-breadcrumb t2="分类列表" t3="分类详情">
        <Button class="fr vue-back-btn" @click="$router.go(-1)" shape="circle">返回</Button>
      </i-breadcrumb>
      <div class="vue-panel">
        <Row type="flex" justify="center">
          <Col span="12" :md="14" :lg="12" :xs="24" :sm="24">
          <Form ref="formValidate" :model="formValidate" :label-width="100">
            <FormItem label="分类名:" prop="categoryCode">
              <label>{{formValidate.categoryCode}}</label>
            </FormItem>
            <FormItem label="分类名:" prop="categoryName">
              <label>{{formValidate.categoryName}}</label>
            </FormItem>
            <FormItem label="创建时间:" prop="createTime">
              <label>{{formValidate.createTime | formatDate}}</label>
            </FormItem>
            <FormItem label="最近更新时间:" prop="updateTime">
              <label>{{formValidate.updateTime | formatDate}}</label>
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
import { getCategoryList } from "../../service/getData";
import filters from "../../filters";
export default {
  name: "categoryDesc",
  components: {
    iLayout,
    iBreadcrumb
  },
  filters: {
    formatDate(date) {
      return filters.formatDate(date, "yyyy-MM-dd hh:mm:ss");
    }
  },
  data() {
    return {
      formValidate: {}
    };
  },
  created() {
    if (this.$route.query && this.$route.query.categoryCode) {
      this.findCategoryInfo(this.$route.query.categoryCode);
    }
  },
  methods: {
    async findCategoryInfo(categoryCode) {
      const res = await getCategoryList({
        params: {
          categoryCode
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
