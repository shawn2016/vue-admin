<template>
  <div class="bg">
    <div class="title">
      登录
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
        <FormItem>
          <Button long type="primary" :loading="loading" @click="handleSubmit('formInline')">登录</Button>
        </FormItem>
        <div class="link">
          <div class="fl">
            没有账号？
            <router-link to="/register">去注册</router-link>
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
import md5 from 'js-md5';
export default {
  data() {
    return {
      loading: false,
      formInline: {
        user: "",
        password: ""
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
            required: true,
            message: "请输入密码",
            trigger: "blur"
          },
          {
            type: "string",
            min: 6,
            message: "密码长度不少于6位",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    async login() {
      const res = await this.$fetch({
        url: "/user/login",
        method: "post",
        data: {
          userCode: this.formInline.user,
          password: md5(this.formInline.password)
        }
      });
      this.loading = false;
      console.log(res);
      if (res && res.respCode === "000000") {
        this.$Message.success(res.respMsg);
        setTimeout(() => {
          this.$router.push("/home");
        }, 2000);
      } else {
        this.$Message.error(res.respMsg);
      }
    },
    handleSubmit(name) {
      this.loading = true;
      this.$refs[name].validate(valid => {
        if (valid) {
          this.login();
        } else {
          this.loading = false;
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
<style lang="less" src="./index.less">

</style>

