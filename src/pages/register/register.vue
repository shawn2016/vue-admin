<template>
    <div class="bg">
        <div class="title">
            注册
        </div>
        <div class="form-container">
            <Form ref="formInline" :model="formInline" :rules="ruleInline">
                <FormItem prop="user">
                    <Input type="text" v-model="formInline.user" placeholder="用户名">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="password">
                    <Input type="password" v-model="formInline.password" placeholder="密码">
                    <Icon type="ios-locked-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="passwdCheck">
                    <Input type="password" v-model="formInline.passwdCheck" placeholder="确认密码">
                    <Icon type="ios-locked-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem>
                    <Button long type="primary" @click="handleSubmit('formInline')">立即注册</Button>
                </FormItem>
                <div class="link">
                    <div class="fl">
                        有账号？
                        <router-link to="/login">去登录</router-link>
                    </div>
                    <div class="fr">
                        <router-link to="/login">忘记密码？</router-link>
                    </div>
                </div>
            </Form>
        </div>
        <div class="indexLizi" id="indexLizi"></div>
    </div>
</template>
<script>
import liziInit from "../../libs/tree/buildtree";
export default {
  data() {
    const password = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.formInline.passwdCheck !== "") {
          // 对第二个密码框单独验证
          this.$refs.formInline.validateField("passwdCheck");
        }
        callback();
      }
    };
    const validatePassCheck = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入确认密码"));
      } else if (value !== this.formInline.password) {
        callback(new Error("两次输入的密码不一致"));
      } else {
        callback();
      }
    };
    return {
      formInline: {
        user: "",
        password: "",
        passwdCheck: ""
      },
      ruleInline: {
        user: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        password: [
          {
            validator: password,
            trigger: "blur"
          },
          {
            type: "string",
            min: 6,
            message: "密码长度不少于6位",
            trigger: "blur"
          }
        ],
        passwdCheck: [
          {
            validator: validatePassCheck,
            trigger: "blur"
          },
          {
            type: "string",
            min: 6,
            message: "确认密码长度不少于6位",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    async register() {
      this.tableLoading = true;
      const res = await this.$fetch({
        url: "/user/create",
        method: "post",
        data: {
          userCode: this.formInline.user,
          password: this.formInline.password
        }
      });
      this.tableLoading = false;
      console.log(res);
      if (res && res.respCode === "000000") {
        if (res.values) {
          this.tableData1 = res.values;
        }
      }
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.register();
        } else {
          this.$Message.error("登录失败");
        }
      });
    }
  },
  mounted() {
    liziInit();
  }
};
</script>
<style lang="less" src="../login/index.less">

</style>

