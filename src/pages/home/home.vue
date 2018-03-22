<template>
  <i-layout>
    <!-- <chart :options="polar"></chart> -->
     <!-- <chart 
        :options="bar"
        :init-options="initOptions"
        ref="bar"
        theme="ovilia-green"
        auto-resize
      /> -->
    <div class="vue-dashboard-panel">
      <Row :gutter="16">
        <Col :md="6">
        <Card bordered="false" dis-hover :bordered="false">
          <p slot="title">账户余额</p>
          <p slot="extra">单位:(元)</p>
          <p class="money">¥ 126,560</p>
          <p>
            <div class="content___2bOfA" style="height: 46px;">
              <div class="contentFixed___nL801">
                <div class="trendItem___2r2dT" title="" style="margin-right: 16px;">
                  <span>周同比
                    <span class="trendText___HsrVC">12%</span>
                  </span>
                  <span class="up___2EwY8">
                    <i class="anticon anticon-caret-up"></i>
                  </span>
                </div>
                <div class="trendItem___2r2dT" title="">
                  <span>日环比
                    <span class="trendText___HsrVC">11%</span>
                  </span>
                  <span class="down___35xDq">
                    <i class="anticon anticon-caret-down"></i>
                  </span>
                </div>
              </div>
            </div>
          </p>
        </Card>
        </Col>
        <Col :md="6">
        <Card dis-hover :bordered="false">
          <p slot="title">可用授信额度</p>
          <p>Content of no border type. Content of no border type. Content of no border type. Content of no border type. </p>
        </Card>
        </Col>
        <Col :md="6">
        <Card dis-hover :bordered="false">
          <p slot="title">总销售额</p>
          <p slot="extra">总销售额</p>
          <p>Content of no border type. Content of no border type. Content of no border type. Content of no border type. </p>
        </Card>
        </Col>
        <Col dis-hover :md="6">
        <Card :bordered="false">
          <p slot="title">No border title</p>
          <p>Content of no border type. Content of no border type. Content of no border type. Content of no border type. </p>
        </Card>
        </Col>
      </Row>
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
    let data = [];

    for (let i = 0; i <= 360; i++) {
      let t = i / 180 * Math.PI;
      let r = Math.sin(2 * t) * Math.cos(2 * t);
      data.push([r, i]);
    }

    return {
      polar: {
        title: {
          text: "极坐标双数值轴"
        },
        legend: {
          data: ["line"]
        },
        polar: {
          center: ["50%", "54%"]
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross"
          }
        },
        angleAxis: {
          type: "value",
          startAngle: 0
        },
        radiusAxis: {
          min: 0
        },
        series: [
          {
            coordinateSystem: "polar",
            name: "line",
            type: "line",
            showSymbol: false,
            data: data
          }
        ],
        animationDuration: 2000
      },
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
      if (res && res.respCode === "000000") {
        if (res.values) {
          this.tableData1 = res.values;
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
