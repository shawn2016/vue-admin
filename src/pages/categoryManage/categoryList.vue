<template>
  <i-layout>
    <i-breadcrumb>
    </i-breadcrumb>

    <div class="vue-panel">
      <Form :model="formItem" :label-width="80">
        <Row>
          <Col :xs="24" :sm="24" :md="8" :lg="8">
          <FormItem label="创建日期:">
            <DatePicker style="width:100%" v-model="formItem.createTime" format="yyyy-MM-dd" type="daterange" placement="bottom-start" placeholder="请选择日期"></DatePicker>
          </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="8" :lg="8">
          <FormItem label="分类名:">
            <Input v-model="formItem.categoryName" placeholder="请输入分类名" clearable></Input>
          </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="8" :lg="8">
          <FormItem label="分类编码:">
            <Input v-model="formItem.categoryCode" placeholder="请输入分类编码" clearable></Input>
          </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="8" :lg="8">
          <FormItem label="创建人:" prop="userCode">
            <Select placeholder="请选择创建人" clearable v-model="formItem.userCode">
              <Option :key="x.userCode" v-for="x in userList" :value="x.userCode">{{x.userName}}</Option>
            </Select>
          </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="8" :lg="8">
          <FormItem>
            <Button type="primary" @click="getList" style="width:80px" long shape="circle">查询</Button>
            <Button type="ghost" style="width:80px;margin-left: 8px" @click="clearForm" shape="circle">清除</Button>
          </FormItem>
          </Col>

        </Row>

      </Form>
    </div>
    <div class="vue-panel-table">
      <nav-content>
        <router-link to="/categoryManage/addCategory">
          <Button class="fr vue-back-btn" shape="circle">新增分类</Button>
        </router-link>
      </nav-content>
      <Table :loading="tableLoading" :data="tableData1" :columns="tableColumns1" stripe></Table>
      <div class="vue-panel-page" v-if="tableData1.length>10">
        <div style="float: right;">
          <Page :total="total" show-total show-elevator show-sizer :page-size="pageSize" :current="pageNo" @on-page-size-change="changeSize" @on-change="changePage"></Page>
        </div>
      </div>
    </div>
    <!-- 对话框 -->

    <Modal v-model="modal6" :title="modalTitle" :loading="modalLoading" @on-ok="asyncOK">
      <p>{{modalContent}}</p>
    </Modal>
  </i-layout>
</template>
<script>
import Vue from "vue";
import iLayout from "../../components/layout.vue";
import iBreadcrumb from "../../components/breadcrumb.vue";
import navContent from "../../components/navcontent.vue";
import filters from "../../filters";
import {
  getCategoryList,
  deleteCategoryList,
  getUserList
} from "../../service/getData";
export default {
  name: "categoryManage",
  components: {
    iLayout,
    iBreadcrumb,
    navContent
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return filters.formatDate(date, "yyyy-MM-dd hh:mm:ss");
    }
  },
  data() {
    return {
      userList: [],
      pageSize: 10,
      total: 0,
      pageNo: 1,
      value2: "",
      value14: "",
      tableLoading: false,
      modal6: false,
      // 对话框
      modalLoading: true,
      modalContent: "",
      modalTitle: "",
      modalType: "",
      formItem: {
        createTime: []
      },
      tableData1: [],
      tableColumns1: [
        {
          title: "序号",
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "创建日期",
          width: 150,
          sortable: true,
          key: "createTime",
          render: (h, params) => {
            const row = params.row;
            const time = row.createTime
              ? filters.formatDate(row.createTime, "yyyy-MM-dd hh:mm:ss")
              : "";
            return h("span", time);
          }
        },
        {
          title: "分类编码",
          key: "categoryCode",
          sortable: true
        },
        {
          title: "分类名",
          key: "categoryName"
        },
        {
          title: "创建人",
          key: "userCode"
        },
        {
          title: "操作",
          width: 180,
          key: "edit",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.editCategory(params.row.categoryCode);
                    }
                  }
                },
                "修改"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.openModal({
                        id: params.row._id,
                        modalType: "delete",
                        modalTitle: "提示",
                        modalContent: "此操作将永久删除该项, 是否继续?"
                      });
                    }
                  }
                },
                "删除"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "default",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.goDesc(params.row.categoryCode);
                    }
                  }
                },
                "详情"
              )
            ]);
          }
        }
      ]
    };
  },
  methods: {
    // 获取用户列表
    async getUserList() {
      const res = await getUserList({
        params: {}
      });
      if (res && res.respCode === "000000") {
        if (res.values) {
          this.userList = res.values;
        } else {
          this.userList = [];
        }
      }
    },
    changePage(pageNo) {
      this.pageNo = pageNo;
      this.getList();
    },
    changeSize(pageSize) {
      this.pageSize = pageSize;
      this.getList();
    },
    // 获取表格数据
    async getList() {
      this.tableLoading = true;
      const res = await getCategoryList({
        params: this.formItem,
        pagenation: {
          pageNo: this.pageNo,
          pageSize: this.pageSize
        }
      });
      this.tableLoading = false;
      if (res && res.respCode === "000000") {
        if (res.values) {
          this.tableData1 = res.values;
          this.total = res.pagenation.itemCount;
          this.pageNo = res.pagenation.pageNo;
        } else {
          this.tableData1 = [];
          this.total = 0;
          this.pageNo = 1;
        }
      }
    },
    clearForm() {
      this.formItem = {};
    },
    // 删除分类
    async deleteCategory(id) {
      const res = await deleteCategoryList(id);
      this.modal6 = false;
      this.modalLoading = false;
      if (res && res.respCode === "000000") {
        this.$Message.success(res.respMsg);
        this.getList();
      } else {
        this.$Message.error(res.respMsg);
      }
    },
    // 打开对话框
    openModal(obj) {
      this.modal6 = true;
      this.modalTitle = obj.modalTitle;
      this.modalContent = obj.modalContent;
      this.modalType = obj.modalType;
      this.modalId = obj.id;
    },
    editCategory(categoryCode) {
      this.$router.push({
        name: "addCategory",
        path: "/categoryManage/addCategory",
        query: { categoryCode }
      });
    },
    goDesc(categoryCode) {
      this.$router.push({
        name: "categoryDesc",
        path: "/categoryManage/categoryList/categoryDesc",
        query: { categoryCode }
      });
    },
    //对话框 is-ok
    asyncOK() {
      this.modalLoading = true;
      if (this.modalType === "delete") {
        this.deleteCategory(this.modalId);
      }
    }
  },
  created() {
    this.getUserList();
    this.getList();
  }
};
</script>
