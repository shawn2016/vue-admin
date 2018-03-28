<template>
    <div>
        <i-layout>
            {{demo}}
        </i-layout>
    </div>
</template>

<script>
import iLayout from "../../components/layout.vue";

export default {
  name: "pageList",
  components: {
    iLayout
  },
  data() {
    return {
      demo: "222"
    };
  }
};
</script>

<style>

</style>
