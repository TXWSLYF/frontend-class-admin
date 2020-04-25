<template>
<el-dialog title="管理员详情" center
      :visible.sync="detailRoleDialogFlag"
      @close="close"
      width="70%">
      <el-form :model="value" ref="editFormRef" label-width="100px">
          <el-form-item label="管理员姓名">
            <el-input v-model="value.name" disabled></el-input>
          </el-form-item>
          <el-form-item label="管理员角色">
            <el-input v-model="value.roleZh" disabled></el-input>
          </el-form-item>
          <el-form-item label="权限详情">
            <el-input v-model="value.right" disabled></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="detailRoleDialogFlag = false" type="primary">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
  name: 'EditRoleDialog',
  // d单向数据流，父级到子级，不能反向修改
  props: {
    flag: {
      type: Boolean,
      default: true,
    },
    value: {
      type: Object,
    },
  },
  watch: {
    flag: {
      handler(newValue) {
        this.detailRoleDialogFlag = newValue;
        console.log(this.value);
        console.log(newValue);
      },
    },
  },
  data() {
    return {
      detailRoleDialogFlag: false,
    };
  },
  methods: {
    close() {
      this.$emit('close');
      this.$emit('update:flag', false);
      // 回调时需要逻辑处理时用
      // this.$emit('close', false);
    },
    handleDelet() {
      this.$emit('delete');
    },
  },
};
</script>

<style>
</style>
