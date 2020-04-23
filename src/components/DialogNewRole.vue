<template>
  <el-dialog :title="title" :visible.sync="dialogInfoFlag" @close="close" center>
    <el-form :model="form" ref="form">
      <el-form-item label="角色名称" :label-width="formLabelWidth" prop="roleName">
        <el-input v-model="form.roleName" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="权限详情" :label-width="formLabelWidth" prop="authorities">
        <el-select v-model="form.authorities" multiple placeholder="请选择" style="display: block">
          <el-option
            v-for="item in authorities"
            :key="item.id"
            :label="item.nameZh"
            :value="item.name">
          </el-option>
        </el-select>
      </el-form-item>
      <!-- <slot></slot> -->
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="createRole" :loading="submitLoading">确 定</el-button>
      <el-button @click="cancleCreateRole">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { newRole } from '@/api/role';

export default {
  name: 'DialogNewRole',
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
    authorities: {
      type: Array,
      default: () => [],
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
      form: {
        roleName: '',
        authorities: '',
      },
      formLabelWidth: '120px',
      submitLoading: false,
    };
  },
  methods: {
    // 关闭弹窗
    close() {
      this.$emit('update:flag', false);
      this.$refs.form.resetFields();
      // 回调时需要逻辑处理时用
      // this.$emit('close', false);
    },

    // 新建角色
    createRole() {
      const data = {
        name: this.form.roleName,
        nameZh: this.form.roleName,
        desc: this.form.roleName,
        authorities: this.form.authorities,
      };
      console.log(data.authorities);
      if (!this.form.roleName) {
        this.$message.error('角色名称不能为空');
        return false;
      }
      this.submitLoading = true;
      // console.log(data);
      newRole(data).then(() => {
        this.$message({
          message: '添加成功',
          type: 'success',
        });
        this.submitLoading = false;
        // 调用父组件的列表显示方法
        this.$parent.getRoleList();
        // 清空表单
        this.$refs.form.resetFields();
      }).catch(() => {
        this.submitLoading = false;
        this.$refs.form.resetFields();
      });

      return false;
    },

    // 取消新建角色
    cancleCreateRole() {
      this.dialogInfoFlag = false;
      this.$refs.form.resetFields();
    },
  },
};
</script>

<style>
</style>
