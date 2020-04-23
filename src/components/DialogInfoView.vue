<template>
  <el-dialog :title="title" :visible.sync="dialogInfoFlag"
    @close="close" @opened="infoDetails" center>
    <el-form>
      <el-form-item label="角色名称" :label-width="formLabelWidth">
        <el-input v-model="roleName" auto-complete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="权限详情" :label-width="formLabelWidth">
        <el-input v-model="authorities" auto-complete="off"
          :disabled="true"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}">
        </el-input>
      </el-form-item>
      <!-- <slot></slot> -->
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="close">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'DialogInfo',
  // d单向数据流，父级到子级，不能反向修改
  props: {
    flag: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      default: '222',
    },
    roleData: {
      type: Object,
      default: () => {},
    },
  },
  watch: {
    flag: {
      handler(newValue) {
        this.dialogInfoFlag = newValue;
      },
    },
  },
  data() {
    return {
      dialogInfoFlag: false,
      formLabelWidth: '120px',
      roleName: '',
      authorities: '',
    };
  },
  methods: {
    close() {
      this.$emit('update:flag', false);
      this.roleName = '';
      this.authorities = '';
      // 回调时需要逻辑处理时用
      // this.$emit('close', false);
    },

    infoDetails() {
      console.log(this.roleData);
      this.roleName = this.roleData.nameZh;

      // for (const auth of this.roleData.roleAuthorities) {
      //   this.authorities += auth.authorityInfo.nameZh;
      // }

      for (let i = 0; i < this.roleData.roleAuthorities.length; i += 1) {
        this.authorities += `${this.roleData.roleAuthorities[i].authorityInfo.nameZh}、`;
      }
    },
  },
};
</script>

<style>
</style>
