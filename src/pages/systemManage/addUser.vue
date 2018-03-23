<template>
    <div>
        <i-layout>
            <i-breadcrumb>
                <Button class="fr vue-back-btn" @click="$router.go(-1)" shape="circle">返回</Button>
            </i-breadcrumb>
            <div class="vue-panel-desc">
                <Row type="flex" justify="center">
                    <Col span="12" :md="14" :lg="12" :xs="24" :sm="24">
                    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                        <FormItem label="用户名:" prop="userCode">
                            <Input v-model="formValidate.userCode" placeholder="请输入用户名"></Input>
                        </FormItem>
                        <FormItem label="用户姓名:" prop="userName">
                            <Input v-model="formValidate.userName" placeholder="请输入用户姓名"></Input>
                        </FormItem>
                        <FormItem label="手机号码:" prop="phonenum">
                            <Input v-model="formValidate.phonenum" placeholder="请输入手机号码"></Input>
                        </FormItem>
                        <FormItem label="身份证号:" prop="identifyNo">
                            <Input v-model="formValidate.identifyNo" placeholder="请输入身份证号"></Input>
                        </FormItem>
                        <FormItem label="用户类型:" prop="refUserRoleCode">
                            <Select v-model="formValidate.refUserRoleCode" placeholder="请选择用户类型">
                                <Option value="USER">普通用户</Option>
                                <Option value="ADMIN">管理员</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="用户状态:" prop="status">
                            <RadioGroup v-model="formValidate.status">
                                <Radio label="100">启用</Radio>
                                <Radio label="500">禁用</Radio>
                            </RadioGroup>
                        </FormItem>
                        <FormItem label="职务:" prop="userDuty">
                            <Select v-model="formValidate.userDuty" placeholder="请选择职务">
                                <Option value="qianduan">前端开发</Option>
                                <Option value="php">php开发</Option>
                                <Option value="java">java开发</Option>
                                <Option value="python">python开发</Option>

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
import iLayout from "../../components/layout.vue";
import iBreadcrumb from "../../components/breadcrumb.vue";
import md5 from "js-md5";
export default {
  name: "addUser",
  components: {
    iLayout,
    iBreadcrumb
  },
  data() {
    return {
      formValidate: {},
      ruleValidate: {
        userCode: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        userName: [
          {
            required: true,
            message: "请输入用户姓名",
            trigger: "blur"
          },
          {
            pattern: /^[\u4E00-\u9FA5]{2,4}$/,
            message: "用户姓名格式输入错误",
            trigger: "blur"
          }
        ],
        phonenum: [
          {
            required: true,
            message: "请输入手机号码",
            trigger: "blur"
          },
          {
            pattern: /^1[34578]\d{9}$/,
            message: "手机号码格式输入错误",
            trigger: "blur"
          }
        ],
        identifyNo: [
          { required: true, message: "请输入身份证号", trigger: "blur" },
          {
            pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
            message: "身份证号格式输入错误",
            trigger: "blur"
          }
        ],
        refUserRoleCode: [
          {
            required: true,
            message: "请选择用户类型",
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
        ],
        status: [
          {
            required: true,
            message: "请选择用户状态",
            trigger: "change"
          }
        ]
      }
    };
  },
  mounted() {
    this.message();
  },
  methods: {
    message() {
      this.$Notice.open({
        title: "温馨提示",
        duration: 10,
        render: h => {
          return h("span", {}, [
            h("span", {}, "新增用户密码为:"),
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
      const res = await this.$fetch({
        url: "/user/create",
        method: "post",
        data: {
          userCode: this.formValidate.userCode,
          status: this.formValidate.status,
          userDuty: this.formValidate.userDuty,
          userName: this.formValidate.userName,
          phonenum: this.formValidate.phonenum,
          identifyNo: this.formValidate.identifyNo,
          desc: this.formValidate.desc,
          refUserRoleCode: this.formValidate.refUserRoleCode,
          createTime: +new Date(),
          updateTime: +new Date(),
          password: md5("123456")
        }
      });
      this.tableLoading = false;
      console.log(res);
      if (res && res.respCode === "000000") {
        this.$Message.success(res.respMsg);
        setTimeout(() => {
          this.$router.push("/systemManage/userManage");
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
      this.formValidate = {};
      this.$refs[name].resetFields();
    }
  }
};
</script>

<style>

</style>
