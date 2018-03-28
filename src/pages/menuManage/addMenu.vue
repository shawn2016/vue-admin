<template>
    <div>
        <i-layout>
            <i-breadcrumb :t2="breadcrumbTitle">
                <Button class="fr vue-back-btn" @click="$router.go(-1)" shape="circle">返回</Button>
            </i-breadcrumb>
            <div class="vue-panel-desc">
                <Row type="flex" justify="center">
                    <Col span="12" :md="14" :lg="12" :xs="24" :sm="24">
                    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
                        <FormItem label="菜单编码:" prop="menuId">
                            <label v-if="!$route.query.menuId" placeholder="请输入菜单编码">{{formValidate.menuId}}
                                <a style="margin-left:10px" @click="makeCode">换一个</a>
                            </label>
                            <label v-if="$route.query.menuId">{{formValidate.menuId}}</label>
                        </FormItem>
                        <FormItem label="创建人:" prop="userCode">
                            <Select v-model="formValidate.userCode" placeholder="请选择创建人">
                                <Option value="100">前台</Option>
                                <Option value="200">后台</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="菜单名称:" prop="menuName">
                            <Input v-model="formValidate.menuName" placeholder="请输入菜单名称"></Input>
                        </FormItem>
                        <FormItem label="所属平台:" prop="platType">
                            <Select v-model="formValidate.platType" placeholder="请选择所属平台">
                                <Option value="100">前台</Option>
                                <Option value="200">后台</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="菜单级别:" prop="menuLevel">
                            <Select v-model="formValidate.menuLevel" placeholder="请选择菜单级别">
                                <Option value="100">一级</Option>
                                <Option value="200">二级</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="上级菜单:" prop="pmenuId">
                            <Select v-model="formValidate.pmenuId" placeholder="请选择上级菜单">
                                <Option value="100">前台</Option>
                                <Option value="200">后台</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="菜单描述:" prop="remark">
                            <Input v-model="formValidate.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入菜单描述"></Input>
                        </FormItem>
                        <FormItem label="菜单图标编码:" prop="icon">
                            <Input v-model="formValidate.icon" placeholder="请输入菜单图标编码"></Input>
                        </FormItem>
                        <FormItem label="菜单地址:" prop="url">
                            <Input v-model="formValidate.url" placeholder="请输入菜单地址"></Input>
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
import iBreadcrumb from "../../components/breadcrumb.vue";
import randomWord from "../../service/randomWord";
import { getMenuList, updateMenu, createMenu } from "../../service/getData";
import md5 from "js-md5";
export default {
  name: "addMenu",
  components: {
    iLayout,
    iBreadcrumb
  },
  data() {
    return {
      formValidate: {
        platType: "200",
        menuLevel: "100"
      },
      ruleValidate: {
        menuName: [
          {
            required: true,
            message: "请输入菜单名称",
            trigger: "blur"
          },
          {
            pattern: /^[\u4E00-\u9FA5]{2,5}$/,
            message: "请输入2-5个中文菜单名称",
            trigger: "blur"
          }
        ],
        url: [
          {
            required: true,
            message: "请输入菜单地址",
            trigger: "blur"
          }
        ],
        platType: [
          {
            required: true,
            message: "请选择所属平台",
            trigger: "blur"
          }
        ],
        menuLevel: [
          {
            required: true,
            message: "请选择菜单级别",
            trigger: "blur"
          }
        ],
        icon: [
          {
            required: true,
            message: "请输入菜单图标编码",
            trigger: "blur"
          }
        ],
        pmenuId: [
          {
            required: true,
            message: "请选择上级菜单",
            trigger: "change"
          }
        ],
        remark: [
          {
            type: "string",
            max: 100,
            message: "菜单描述不能超过100个字",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    if (this.$route.query && this.$route.query.menuId) {
      this.formValidate.menuId = this.$route.query.menuId;
      this.findMenuInfo();
      this.breadcrumbTitle = "修改菜单";
    } else {
      // 新增菜单时提示一下
      this.breadcrumbTitle = "新增菜单";
      this.message();
    }
  },
  methods: {
    async findMenuInfo() {
      const res = await getMenuList({
        params: {
          userCode: this.formValidate.userCode
        }
      });
      if (res.respCode === "000000") {
        this.formValidate = res.values[0];
      }
    },
    makeCode() {
      this.formValidate.menuId = Vue.set(
        this.formValidate,
        "menuId",
        +new Date() + randomWord({ num: false })
      );
    },
    message() {
      this.makeCode();
      this.$Notice.open({
        title: "温馨提示",
        duration: 10,
        render: h => {
          return h("span", {}, [
            h("span", {}, "新增菜单编码为:"),
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
              "当前时间戳和随机字母组成"
            )
          ]);
        }
      });
    },
    async register() {
      this.tableLoading = true;
      let res;
      if (this.$route.query && this.$route.query.menuId) {
        // 更新菜单信息
        res = await updateMenu({
          icon: this.formValidate.icon,
          menuId: this.formValidate.menuId,
          menuLevel: this.formValidate.menuLevel,
          menuName: this.formValidate.menuName,
          platType: this.formValidate.platType,
          pmenuId: this.formValidate.pmenuId,
          remark: this.formValidate.remark,
          url: this.formValidate.url,
          userCode: this.formValidate.userCode,
          updateTime: +new Date()
        });
      } else {
        // 新增菜单
        res = await createMenu({
          icon: this.formValidate.icon,
          menuId: this.formValidate.menuId,
          menuLevel: this.formValidate.menuLevel,
          menuName: this.formValidate.menuName,
          platType: this.formValidate.platType,
          pmenuId: this.formValidate.pmenuId,
          remark: this.formValidate.remark,
          url: this.formValidate.url,
          userCode: this.formValidate.userCode,
          createTime: +new Date(),
          updateTime: +new Date()
        });
      }
      this.tableLoading = false;
      if (res && res.respCode === "000000") {
        this.$Message.success(res.respMsg);
        setTimeout(() => {
          this.$router.push("/menuManage/menuList");
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
      if (this.$route.query && this.$route.query.userCode) {
        this.formValidate.userCode = this.$route.query.userCode;
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
