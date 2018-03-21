<template>
  <i-layout>
    <i-breadcrumb>
      <Button class="fr vue-back-btn" shape="circle">返回</Button>
    </i-breadcrumb>

    <div class="vue-panel">
      <Form :model="formItem" :label-width="80">
        <Row>
          <Col :xs="24" :sm="24" :md="8" :lg="8">
          <FormItem label="创建日期:">
            <DatePicker style="width:100%" :value="value2" format="yyyy-MM-dd" type="daterange" placement="bottom-end" placeholder="请选择日期"></DatePicker>
          </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="8" :lg="8">
          <FormItem label="用户姓名:">
            <Input v-model="value14" placeholder="请输入用户姓名" clearable></Input>
          </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="8" :lg="8">
          <FormItem label="身份证号:">
            <Input v-model="value14" placeholder="请输入身份证号" clearable></Input>
          </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="8" :lg="8">
          <FormItem label="用户类型:">
            <Select v-model="formItem.select">
              <Option value="beijing">New York</Option>
              <Option value="shanghai">London</Option>
              <Option value="shenzhen">Sydney</Option>
            </Select>
          </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="8" :lg="8">
          <FormItem label="用户状态:">
            <Select v-model="formItem.select">
              <Option value="beijing">New York</Option>
              <Option value="shanghai">London</Option>
              <Option value="shenzhen">Sydney</Option>
            </Select>
          </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="8" :lg="8">
          <FormItem label="职务:">
            <Input v-model="value14" placeholder="请输入职务" clearable></Input>
          </FormItem>
          </Col>
        </Row>
        <FormItem>
          <Button type="primary" style="width:80px" long shape="circle">查询</Button>
          <Button type="ghost" style="width:80px;margin-left: 8px" shape="circle">清除</Button>
        </FormItem>
      </Form>
    </div>
    <div class="vue-panel-table">
      <nav-content>
        <Button class="fr vue-back-btn" shape="circle">返回</Button>
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
  name: "userlist",
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
      formItem: {
        input: "",
        select: "",
        radio: "male",
        checkbox: [],
        switch: true,
        date: "",
        time: "",
        slider: [20, 50],
        textarea: ""
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
          key: "status"
        },
        {
          title: "操作",
          key: "edit",
          render: (h, params) => {
            console.log(params);
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
                      this.openModal({
                        modalType: "edit",
                        modalTitle: "提示",
                        modalContent: "此操作将永久删除该文件, 是否继续?"
                      });
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
        method: "get",
        data: {}
      });
      this.tableLoading = false;
      console.log(res);
      if (res && res.respCode === "000000") {
        if (res.values) {
          this.tableData1 = res.values;
        }
      }
    },
    // 删除用户
    async deleteUser(id) {
      console.log(id)
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
