<template>
  <el-dialog
      title="提示"
      :visible.sync="deleteDialogFlag"
      width="30%"
      @close="close"
      center>
      <span>确认要删除管理员{{ value.name }}的角色信息吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialogFlag = false">取 消</el-button>
        <el-button type="primary" @click="handleDelet">确 定</el-button>
      </span>
    </el-dialog>
</template>

<script>
export default {
  name: 'DeleteDialog',
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
        this.deleteDialogFlag = newValue;
      },
    },
  },
  data() {
    return {
      deleteDialogFlag: false,
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
