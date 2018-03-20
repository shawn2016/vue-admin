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
    <Table :loading="loading" :data="tableData1" :columns="tableColumns1" stripe></Table>
    <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
            <Page :total="100" :current="1" @on-change="changePage"></Page>
        </div>
    </div>
      </div>
    </i-layout>
</template>
<script>
import iLayout from "../../components/layout.vue";
import iBreadcrumb from "../../components/breadcrumb.vue";
import formatDate from "../../filters/date";
export default {
  name: "userlist",
  components: {
    iLayout,
    iBreadcrumb
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm");
    }
  },
  data() {
    return {
      loading: false,
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
          title: "创建日期",
          key: "createTime",
          render: (h, params) => {
            const row = params.row;
            const time = row.createTime
              ? formatDate(row.createTime)
              : "";
            return h();
          }
        },
        {
          title: "用户名",
          key: "userCode"
        },
        {
          title: "用户姓名",
          key: "userName"
          //   render: (h, params) => {
          //     const row = params.row;
          //     const color =
          //       row.status === 1 ? "blue" : row.status === 2 ? "green" : "red";
          //     const text =
          //       row.status === 1
          //         ? "Working"
          //         : row.status === 2 ? "Success" : "Fail";

          //     return h(
          //       "Tag",
          //       {
          //         props: {
          //           type: "dot",
          //           color: color
          //         }
          //       },
          //       text
          //     );
          //   }
        },
        {
          title: "手机号码",
          key: "phonenum"
          //   render: (h, params) => {
          //     return h(
          //       "Poptip",
          //       {
          //         props: {
          //           trigger: "hover",
          //           title: params.row.portrayal.length + "portrayals",
          //           placement: "bottom"
          //         }
          //       },
          //       [
          //         h("Tag", params.row.portrayal.length),
          //         h(
          //           "div",
          //           {
          //             slot: "content"
          //           },
          //           [
          //             h(
          //               "ul",
          //               this.tableData1[params.index].portrayal.map(item => {
          //                 return h(
          //                   "li",
          //                   {
          //                     style: {
          //                       textAlign: "center",
          //                       padding: "4px"
          //                     }
          //                   },
          //                   item
          //                 );
          //               })
          //             )
          //           ]
          //         )
          //       ]
          //     );
          //   }
        },
        {
          title: "身份证号码",
          key: "identifyNo"
          //   render: (h, params) => {
          //     return h(
          //       "Poptip",
          //       {
          //         props: {
          //           trigger: "hover",
          //           title: params.row.people.length + "customers",
          //           placement: "bottom"
          //         }
          //       },
          //       [
          //         h("Tag", params.row.people.length),
          //         h(
          //           "div",
          //           {
          //             slot: "content"
          //           },
          //           [
          //             h(
          //               "ul",
          //               this.tableData1[params.index].people.map(item => {
          //                 return h(
          //                   "li",
          //                   {
          //                     style: {
          //                       textAlign: "center",
          //                       padding: "4px"
          //                     }
          //                   },
          //                   item.n + "：" + item.c + "People"
          //                 );
          //               })
          //             )
          //           ]
          //         )
          //       ]
          //     );
          //   }
        },
        {
          title: "职务",
          key: "userDuty"
          //   render: (h, params) => {
          //     return h("div", "Almost" + params.row.time + "days");
          //   }
        },
        {
          title: "用户类型",
          key: "refUserRoleCode"
          //   render: (h, params) => {
          //     return h(
          //       "div",
          //       this.formatDate(this.tableData1[params.index].update)
          //     );
          //   }
        },
        {
          title: "用户状态",
          key: "status"
        },
        {
          title: "操作",
          key: "edit"
          //   render: (h, params) => {
          //     return h(
          //       "div",
          //       this.formatDate(this.tableData1[params.index].update)
          //     );
          //   }
        }
      ]
    };
  },
  methods: {
    async getList() {
      const res = await this.$fetch({
        url: "/user/list",
        method: "get",
        data: {}
      });
      console.log(this.$router);
      if (res && res.respCode === "000000") {
        if (res.body && res.body.values) {
          this.tableData1 = res.body.values;
        }
      }
    },
    changePage() {}
  },
  created() {
    this.getList();
  }
};
</script>
