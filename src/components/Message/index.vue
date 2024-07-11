<template>
  <div class="note">
    <div class="size-icon">
 <i class="el-icon-bell" @click="open"></i>
</div>

   
    <!-- <svg-icon :icon-class="'notice'" @click="open" /> -->
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  methods: {
    ...mapMutations(["Set_ShowNotice"]),
    open(){
        this.Set_ShowNotice()
    }
  },
};
</script>

<style lang="scss" scoped>
.notice-svg {
  display: inline-block;
  cursor: pointer;
  fill: #5a5e66;
  width: 30px;
  height: 30px;
  vertical-align: 10px;
}
.size-icon{
  font-size: 25px;
}
</style>
