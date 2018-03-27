<template>
  <div>
    <i-layout>
      <i-breadcrumb t2="所有文章" t3="文章详情">
        <Button class="fr vue-back-btn" @click="$router.go(-1)" shape="circle">返回</Button>
      </i-breadcrumb>
      <div class="vue-panel article-desc">
        <Row>
          <h1 class="text-center">{{formValidate.articleTitle}}</h1>
          <div class="text-center">
            <span class="span-title">发布时间：</span>
            <span class="desc">{{formValidate.updateTime | formatDate}}</span>
            <span class="span-title" style="margin-left:15px;">来源：</span>
            <span class="desc">{{formValidate.author}}</span>
          </div>

          <div class="category">
            <span class="span-title">文章分类：</span>
            <span v-for="(x,index) in formValidate.category">
              <Tag v-if="index%2===0" color="red">{{x}}</Tag>
              <Tag v-if="index%2!==0" color="blue">{{x}}</Tag>
            </span>
          </div>
          <div ref="content">

          </div>
          <div class="status">
            文章状态：
            <span class="span-title">文章状态：</span>
            <span>
              {{formValidate.status | status}}
            </span>
          </div>
          <div class="tags">
            <span class="span-title">文章标签：</span>
            <span :key="x" v-for="(x,index) in formValidate.tags">
              <Tag v-if="index%2===0" color="yellow">{{x}}</Tag>
              <Tag v-if="index%2!==0" color="green">{{x}}</Tag>
            </span>
          </div>

        </Row>
      </div>
    </i-layout>
  </div>
</template>

<script>
import Vue from "vue";
import iLayout from "../../components/layout.vue";
import iBreadcrumb from "../../components/breadcrumb.vue";
import { getArticleList } from "../../service/getData";
import filters from "../../filters";
export default {
  name: "articleDesc",
  components: {
    iLayout,
    iBreadcrumb
  },
  filters: {
    formatDate(date) {
      return filters.formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
    status(name) {
      return filters.articleStatus(name);
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
    if (this.$route.query && this.$route.query.id) {
      this.findArticleInfo(this.$route.query.id);
    }
  },
  mounted() {},
  methods: {
    compile(content) {
      const Component = Vue.extend({
        template: `<div>${content}</div>`
      });
      const markedComponent = new Component().$mount();
      this.$refs["content"].appendChild(markedComponent.$el);
    },
    async findArticleInfo(id) {
      const res = await getArticleList({
        params: {
          _id: id
        }
      });
      if (res.respCode === "000000" && res.values) {
        this.formValidate = res.values[0];
        this.compile(this.formValidate.content);
      }
    }
  }
};
</script>

<style>
.article-desc {
  font-size: 14px;
}
h1 {
  text-align: center;
  word-break: break-word !important;
  word-break: break-all;
  margin: 10px 0 20px;
  font-family: -apple-system, SF UI Display, Arial, PingFang SC,
    Hiragino Sans GB, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif;
  font-size: 34px;
  font-weight: 700;
  line-height: 1.3;
}
.span-title {
  font-size: 16px;
  color: #666;
}
.desc {
  font-size: 16px;
  color: #333;
}
.category {
  margin: 20px 0 10px;
}
</style>
