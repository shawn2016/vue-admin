<template>
  <div>
    <i-layout>
      <i-breadcrumb :t2="breadcrumbTitle">
        <Button class="fr vue-back-btn" @click="$router.go(-1)" shape="circle">返回</Button>
      </i-breadcrumb>
      <div class="vue-panel-desc">
        <Row type="flex" justify="center">
          <Col span="12" :md="14" :lg="12" :xs="24" :sm="24">
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="分类编码:" prop="categoryCode">
              <label v-if="!$route.query.categoryCode">{{formValidate.categoryCode}}
                <a style="margin-left:10px" @click="makeCode">换一个</a>
              </label>
              <label v-if="$route.query.categoryCode">{{formValidate.categoryCode}}</label>
            </FormItem>
            <FormItem label="分类名:" prop="categoryName">
              <Input v-model="formValidate.categoryName" placeholder="请输入分类名"></Input>
            </FormItem>
            <FormItem label="创建人:" prop="userCode">
              <Select v-model="formValidate.userCode" placeholder="请选择创建人">
                <Option value="USER">普通分类</Option>
                <Option value="ADMIN">管理员</Option>
              </Select>
            </FormItem>
            <FormItem label="所属平台:" prop="platType">
              <Select v-model="formValidate.platType" placeholder="请选择所属平台">
                <Option value="100">前台</Option>
                <Option value="200">后台</Option>
              </Select>
            </FormItem>
            <FormItem label="备注:" prop="desc">
              <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入备注"></Input>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="handleSubmit('formValidate')">保存</Button>
              <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">清空</Button>
            </FormItem>
          </Form>
          </Col>
        </Row>
      </div>
    </i-layout>
  </div>
</template>

<script>
import Vue from "vue";
import iLayout from "../../components/layout.vue";
import randomWord from "../../service/randomWord";
import iBreadcrumb from "../../components/breadcrumb.vue";
import {
  getCategoryList,
  updateCategory,
  createCategory
} from "../../service/getData";
import md5 from "js-md5";
export default {
  name: "addCategory",
  components: {
    iLayout,
    iBreadcrumb
  },
  data() {
    return {
      formValidate: {},
      ruleValidate: {
        categoryName: [
          {
            required: true,
            message: "请输入分类名",
            trigger: "blur"
          }
        ],
        userCode: [
          {
            required: true,
            message: "请选择分类类型",
            trigger: "change"
          }
        ],
        platType: [
          {
            required: true,
            message: "请选择所属平台",
            trigger: "change"
          }
        ],
        desc: [
          {
            type: "string",
            max: 100,
            message: "备注不能超过100个字",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    if (this.$route.query && this.$route.query.categoryCode) {
      this.formValidate.categoryCode = this.$route.query.categoryCode;
      this.findCategoryInfo();
      this.breadcrumbTitle = "修改分类";
    } else {
      // 新增分类时提示一下
      this.makeCode();
      this.breadcrumbTitle = "新增分类";
      this.message();
    }
  },
  methods: {
    makeCode() {
      this.formValidate.categoryCode = Vue.set(
        this.formValidate,
        "categoryCode",
        +new Date() + randomWord({ num: false })
      );
    },
    async findCategoryInfo() {
      const res = await getCategoryList({
        params: {
          categoryCode: this.formValidate.categoryCode
        }
      });
      if (res.respCode === "000000") {
        this.formValidate = res.values[0];
      }
    },
    message() {
      this.$Notice.open({
        title: "温馨提示",
        duration: 10,
        render: h => {
          return h("span", {}, [
            h("span", {}, "新增分类编码为:"),
            h(
              "span",
              {
                props: {
                  checkable: "true",
                  color: "green"
                },
                style: {
                  color: "#2d8cf0",
                  fontWeight: "800"
                }
              },
              "123456"
            )
          ]);
        }
      });
    },
    async register() {
      this.tableLoading = true;
      let res;
      if (this.$route.query && this.$route.query.categoryCode) {
        // 更新分类信息
        res = await updateCategory({
          categoryCode: this.formValidate.categoryCode,
          categoryName: this.formValidate.categoryName,
          userCode: this.formValidate.userCode,
          desc: this.formValidate.desc,
          platType: this.formValidate.platType,
          updateTime: +new Date()
        });
      } else {
        // 新增分类
        res = await createCategory({
          categoryCode: this.formValidate.categoryCode,
          categoryName: this.formValidate.categoryName,
          userCode: this.formValidate.userCode,
          desc: this.formValidate.desc,
          platType: this.formValidate.platType,
          createTime: +new Date(),
          updateTime: +new Date()
        });
      }
      this.tableLoading = false;
      if (res && res.respCode === "000000") {
        this.$Message.success(res.respMsg);
        setTimeout(() => {
          this.$router.push("/categoryManage/categoryList");
        }, 2000);
      } else {
        this.$Message.error(res.respMsg);
      }
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.register();
        } else {
          //   this.$Message.error("Fail!");
        }
      });
    },
    handleReset(name) {
      if (this.$route.query && this.$route.query.categoryCode) {
        this.formValidate.categoryCode = this.$route.query.categoryCode;
      } else {
        this.formValidate = {};
      }
      this.$refs[name].resetFields();
    }
  }
};
</script>

<style>

</style>
