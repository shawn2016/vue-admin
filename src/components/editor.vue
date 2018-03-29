<template>
    <textarea  placeholder="9999" :id="id" :value="value"></textarea>
</template>  
  
<script>
// Import TinyMCE
//tinymce的配置信息 参考官方文档 https://www.tinymce.com/docs/configure/integration-and-setup/
import tinymce from "tinymce/tinymce";
import "tinymce/themes/modern/theme";
import "tinymce/plugins/paste";
import "tinymce/plugins/link";
import "../langs/zh_CN";
import "../skins/lightgray/skin.min.css";
const INIT = 0;
const CHANGED = 2;
var EDITOR = null;
export default {
  props: {
    value: {
      type: String,
      required: true
    },
    setting: {}
  },
  watch: {
    value: function(val) {
      if (this.status == INIT || tinymce.activeEditor.getContent() != val) {
        tinymce.activeEditor.setContent(val);
      }
      this.status = CHANGED;
    }
  },
  data: function() {
    return {
      status: INIT,
      id: "editor-" + new Date().getMilliseconds()
    };
  },
  methods: {},
  mounted: function() {
    const _this = this;
    const setting = {
      selector: "#" + _this.id,
      language: "zh_CN",
      init_instance_callback: function(editor) {
        EDITOR = editor;
        editor.on("input change undo redo", () => {
          var content = editor.getContent();
          _this.$emit("input", content);
        });
      },
      plugins: []
    };
    Object.assign(setting, _this.setting);

    tinymce.init(setting);
  },
  beforeDestroy: function() {
    tinymce.get(this.id).destroy();
  }
};
</script> 
<style>
#mceu_27{
  display: none;
}
</style>
