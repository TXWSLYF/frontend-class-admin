<template>
  <el-dialog
       title="添加角色"
       center
      :visible.sync="editDialog"
      @close="close"
       width="50%">
       <el-form :model="addRole"  ref="editFormRef" label-width="100px">
          <el-form-item label="角色中文名称">
            <el-input v-model="addRole.nameZh"></el-input>
          </el-form-item>
          <el-form-item label="角色英文名称">
            <el-input v-model="addRole.name"></el-input>
          </el-form-item>
          <el-form-item label="角色描述">
            <el-input v-model="addRole.desc"></el-input>
          </el-form-item>
        <el-form-item label="角色权限">
          <el-select v-model="addRole.authorities"
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
  name: 'AddRoleDialog',
  // d单向数据流，父级到子级，不能反向修改
  props: {
    flag: {
      type: Boolean,
      default: true,
    },
    addForm: {
      type: Object,
    },
    options: {
      type: Array,
    },
  },
  watch: {
    flag: {
      handler(newValue) {
        this.editDialog = newValue;
        this.addRole = this.addForm;
      },
    },
  },
  data() {
    return {
      editDialog: false,
      addRole: {},
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
      this.$emit('edit', this.addRole);
    },
  },
};
</script>

<style>
</style>
