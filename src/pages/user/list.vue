<template>
<i-layout>
      <i-breadcrumb>
          <Button class="fr vue-back-btn" shape="circle">返回</Button>
      </i-breadcrumb>
               
  <div class="vue-panel">
        <Form :model="formItem" :label-width="80">
           <Row>
           <Col span="8">
        <FormItem label="Input">
            <Input v-model="formItem.input" placeholder="Enter something..."></Input>
        </FormItem>
        </Col>
           <Col span="8">
        <FormItem label="Select">
            <Select v-model="formItem.select">
                <Option value="beijing">New York</Option>
                <Option value="shanghai">London</Option>
                <Option value="shenzhen">Sydney</Option>
            </Select>
        </FormItem>
        </Col>
        </Row>
        <Row>
        <FormItem>
            <Button type="primary">Submit</Button>
            <Button type="ghost" style="margin-left: 8px">Cancel</Button>
        </FormItem>
        </Row>
    </Form>
  </div>
  <div class="vue-panel">
    <Table :loading="tableLoading" :data="tableData1" :columns="tableColumns1" stripe></Table>
    <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
            <Page :total="100" :current="1" @on-change="changePage"></Page>
        </div>
    </div>
      </div>
        <!-- 对话框 -->
      
  <Modal
        v-model="modal6"
        :title="modalTitle"
        :loading="modalLoading"
        @on-ok="asyncOK">
        <p>{{modalContent}}</p>
    </Modal>
    </i-layout>
</template>
<script>
import iLayout from "../../components/layout.vue";
import iBreadcrumb from "../../components/breadcrumb.vue";
import filters from "../../filters";
export default {
  name: "userlist",
  components: {
    iLayout,
    iBreadcrumb
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return filters.formatDate(date, "yyyy-MM-dd hh:mm");
    }
  },
  data() {
    return {
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
                        id: params.row.id,
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
      if (res && res.respCode === "000000") {
        if (res.body && res.body.values) {
          this.tableData1 = res.body.values;
        }
      }
    },
    // 删除用户
    async deleteUser(id) {
      const res = await this.$fetch({
        url: `/user/list/${id}`,
        method: "delete",
        data: {}
      });
      this.modalLoading = false;
      this.$Message.success("删除成功");
      console.log(res);
    },
    // 分页
    changePage() {},
    // 打开对话框
    openModal(obj) {
      this.modal6 = true;
      this.modalTitle = obj.modalTitle;
      this.modalContent = obj.modalContent;
      this.modalType = obj.modalType;
      this.modalId = obj.modalType;
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
