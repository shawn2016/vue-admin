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
          <FormItem label="用户姓名:">
            <Input v-model="formItem.userName" placeholder="请输入用户姓名" clearable></Input>
          </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="8" :lg="8">
          <FormItem label="身份证号:">
            <Input v-model="formItem.identifyNo" placeholder="请输入身份证号" clearable></Input>
          </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="8" :lg="8">
          <FormItem label="用户类型:">
            <Select v-model="formItem.refUserRoleCode">
              <Option value="USER">普通用户</Option>
              <Option value="ADMIN">管理员</Option>
            </Select>
          </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="8" :lg="8">
          <FormItem label="用户状态:">
            <Select v-model="formItem.status">
              <Option value="500">禁用</Option>
              <Option value="100">启用</Option>
            </Select>
          </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="8" :lg="8">
          <FormItem label="用户名:">
            <Input v-model="formItem.userCode" placeholder="请输入用户名" clearable></Input>
          </FormItem>
          </Col>
        </Row>
        <FormItem>
          <Button type="primary" @click="getList" style="width:80px" long shape="circle">查询</Button>
          <Button type="ghost" style="width:80px;margin-left: 8px" @click="clearForm" shape="circle">清除</Button>
        </FormItem>
      </Form>
    </div>
    <div class="vue-panel-table">
      <nav-content>
        <router-link to="/systemManage/addUser">
          <Button class="fr vue-back-btn" shape="circle">新增用户</Button>
        </router-link>
      </nav-content>
      <Table :loading="tableLoading" :data="tableData1" :columns="tableColumns1" stripe></Table>
      <div class="vue-panel-page">
        <div style="float: right;">
          <Page :total="100" :current="1" @on-change="changePage"></Page>
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
import iLayout from "../../components/layout.vue";
import iBreadcrumb from "../../components/breadcrumb.vue";
import navContent from "../../components/navcontent.vue";
import filters from "../../filters";
export default {
  name: "userManage",
  components: {
    iLayout,
    iBreadcrumb,
    navContent
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return filters.formatDate(date, "yyyy-MM-dd hh:mm");
    }
  },
  data() {
    return {
      value2: "",
      value14: "",
      tableLoading: false,
      modal6: false,
      // 对话框
      modalLoading: true,
      modalContent: "",
      modalTitle: "",
      modalType: "",
      formItem: {},
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
          key: "createTime",
          render: (h, params) => {
            const row = params.row;
            const time = row.createTime
              ? filters.formatDate(row.createTime, "yyyy-MM-dd hh:mm")
              : "";
            return h("span", time);
          }
        },
        {
          title: "用户名",
          key: "userCode"
        },
        {
          title: "用户姓名",
          key: "userName"
        },
        {
          title: "手机号码",
          key: "phonenum"
        },
        {
          title: "身份证号码",
          width: 200,
          key: "identifyNo"
        },
        {
          title: "职务",
          key: "userDuty"
        },
        {
          title: "用户类型",
          key: "refUserRoleCode",
          render: (h, params) => {
            const row = params.row;
            const refUserRoleCode = row.refUserRoleCode
              ? filters.refUserRoleCode(row.refUserRoleCode)
              : row.refUserRoleCode;
            return h("span", refUserRoleCode);
          }
        },
        {
          title: "用户状态",
          key: "status",
          render: (h, params) => {
            const row = params.row;
            const status = row.status
              ? filters.status(row.status)
              : row.status;
            return h("span", status);
          }
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
                      this.addUser(params.row._id);
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
                        modalContent: "此操作将永久删除该文件, 是否继续?"
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
                      this.openModal({
                        id: params.row._id,
                        modalType: "delete",
                        modalTitle: "提示",
                        modalContent: "此操作将永久删除该文件, 是否继续?"
                      });
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
    // 获取表格数据
    async getList() {
      this.tableLoading = true;
      const res = await this.$fetch({
        url: "/user/list",
        method: "post",
        data: this.formItem
      });
      this.tableLoading = false;
      if (res && res.respCode === "000000") {
        if (res.values) {
          this.tableData1 = res.values;
        }
      }
    },
    clearForm() {
      this.formItem = {};
    },
    // 删除用户
    async deleteUser(id) {
      const res = await this.$fetch({
        url: `/user/list/${id}`,
        method: "delete",
        data: {}
      });
      this.modal6 = false;
      this.modalLoading = false;
      if (res && res.respCode === "000000") {
        this.$Message.success(res.respMsg);
        this.getList();
      } else {
        this.$Message.error(res.respMsg);
      }
    },
    // 分页
    changePage() {},
    // 打开对话框
    openModal(obj) {
      this.modal6 = true;
      this.modalTitle = obj.modalTitle;
      this.modalContent = obj.modalContent;
      this.modalType = obj.modalType;
      this.modalId = obj.id;
    },
    addUser(id) {
      this.$router.push({
        path:`/systemManage/addUser/${id}`
      });
    },
    //对话框 is-ok
    asyncOK() {
      this.modalLoading = true;
      if (this.modalType === "delete") {
        this.deleteUser(this.modalId);
      }
    }
  },
  created() {
    this.getList();
  }
};
</script>
