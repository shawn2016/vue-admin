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
  name: "addRole",
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
