<template>
  <el-dialog
       title="编辑角色"
       center
      :visible.sync="editDialog"
      @close="close"
       width="50%">
       <el-form :model="value"  ref="editFormRef" label-width="100px">
          <el-form-item label="管理员姓名">
            <el-input v-model="value.nameZh" disabled></el-input>
          </el-form-item>
        <el-form-item label="管理员角色">
          <el-select v-model="changeR"
            style="width:400px"
            multiple placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.nameZh"
                :value="item.name">
              </el-option>
        </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialog = false">取 消</el-button>
        <el-button type="primary" @click="handleEdit" >确 定</el-button>
      </span>
    </el-dialog>
</template>

<script>
export default {
  name: 'EditManageDialog',
  // d单向数据流，父级到子级，不能反向修改
  props: {
    flag: {
      type: Boolean,
      default: true,
    },
    value: {
      type: Object,
    },
    changeRight: {
      type: Array,
    },
    options: {
      type: Array,
    },
  },
  watch: {
    flag: {
      handler(newValue) {
        this.editDialog = newValue;
        this.changeR = this.changeRight;
        console.log(this.value);
        console.log(this.changeRight);
        console.log(this.changeR);
        console.log(newValue);
      },
    },
  },
  data() {
    return {
      editDialog: false,
      changeR: [],
    };
  },
  methods: {
    close() {
      this.$emit('close');
      this.$emit('update:flag', false);
      // 回调时需要逻辑处理时用
      // this.$emit('close', false);
    },
    handleEdit() {
      this.$emit('edit', this.changeR);
      console.log('aaaaaaaaaaaaaaaaaa');
    },
  },
};
</script>

<style>
</style>
