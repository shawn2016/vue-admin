<template>
    <div>
        <div class="vue-layout-sider" style="flex: 0 0 256px;max-width: 256px;min-width: 256px;width: 256px;">
            <div class="vue-layout-logo">
                logo
            </div>
            <div class="vue-layout-menu">
                <Menu :theme="theme2" :open-names="['1']" accordion style="width:100%;">
                    <MenuItem name="home">
                    <router-link to="/home">
                    <Icon type="ios-home"></Icon>
                    首页</router-link>
                    </MenuItem>
                    <Submenu name="1">
                        <template slot="title">
                            <Icon type="ios-people"></Icon>
                            用户管理
                        </template>
                        <MenuItem name="1-1">
                        <router-link to="/user/list">
                        用户列表
                        </router-link>
                        </MenuItem>
                        <MenuItem name="1-2">评论管理</MenuItem>
                        <MenuItem name="1-3">举报管理</MenuItem>
                    </Submenu>
                </Menu>
            </div>
        </div>
        <div class="vue-layout-wapper">
            <div class="vue-layout-nav">
                <ul class="vue-layout-nav-fr fr">
                    <li class="vue-layout-nav-li">
                        <Tooltip content="Bottom Center 文字提示" placement="bottom">
                            <Icon type="ios-search"></Icon>
                        </Tooltip>
                    </li>
                    <li class="vue-layout-nav-li">
                        <Tooltip content="Bottom Center 文字提示" placement="bottom">
                            <Icon type="ios-help-outline"></Icon>
                        </Tooltip>
                    </li>
                    <li class="vue-layout-nav-li">
                        <Poptip trigger="hover"  placement="bottom-end" >
                            <Badge count="6">
                                <Icon type="ios-bell-outline"></Icon>
                            </Badge>
                            <div class="api" slot="content">
            <Tabs value="name1">
        <TabPane label="标签一" name="name1">标签一的内容</TabPane>
        <TabPane label="标签二" name="name2">标签二的内容</TabPane>
        <TabPane label="标签三" name="name3">标签三的内容</TabPane>
    </Tabs>
        </div>
                        </Poptip>
                    </li>
                    <li class="vue-layout-nav-li">
                        <Dropdown>
                            <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" />daizhixinaf
                            <DropdownMenu slot="list">
                                <DropdownItem>驴打滚</DropdownItem>
                                <DropdownItem>炸酱面</DropdownItem>
                                <DropdownItem>豆汁儿</DropdownItem>
                                <DropdownItem>冰糖葫芦</DropdownItem>
                                <DropdownItem>北京烤鸭</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </li>
                </ul>
            </div>
            <div class="vue-layout-body">
                    <slot></slot>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      theme2: "dark",
      theme1: "light"
    };
  }
};
</script>
<style lang="less" scoped src="../assets/styles/layout.less">

</style>