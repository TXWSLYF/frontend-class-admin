<template>
  <el-dialog :title="title" :visible.sync="dialogInfoFlag"
    @close="close" @opened="infoEdit" center>
    <el-form :model="form">
      <el-form-item label="角色名称" :label-width="formLabelWidth">
        <el-input v-model="form.roleName" auto-complete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="权限详情" :label-width="formLabelWidth">
        <el-select v-model="auth" multiple placeholder="请选择" style="display: block">
          <el-option
            v-for="item in authoritiy"
            :key="item.id"
            :label="item.nameZh"
            :value="item.name">
          </el-option>
        </el-select>
      </el-form-item>
      <!-- <slot></slot> -->
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="roleEdit">确 定</el-button>
      <el-button @click="dialogInfoFlag = false">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { editRole } from '@/api/role';

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
    authoritiy: {
      type: Array,
      default: () => [],
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
  // updated() {
  //   this.infoEdit();
  // },
  data() {
    return {
      dialogInfoFlag: false,
      form: {
        roleName: '',
        authorities: [],
      },
      formLabelWidth: '120px',
      auth: [],
    };
  },
  methods: {
    close() {
      this.$emit('update:flag', false);
      this.form.roleName = '';
      this.form.authorities = [];
      // 回调时需要逻辑处理时用
      // this.$emit('close', false);
    },

    // 渲染该弹窗数据
    infoEdit() {
      this.form.roleName = this.roleData.nameZh;
      for (let i = 0; i < this.roleData.roleAuthorities.length; i += 1) {
        this.form.authorities[i] = this.roleData.roleAuthorities[i].authorityInfo.name;
      }
      this.auth = this.form.authorities;
      // console.log(this.auth);
    },

    // 修改角色权限
    roleEdit() {
      this.dialogInfoFlag = false;

      const data = {
        roleName: this.roleData.name,
        authorityNames: this.auth,
      };

      // 调用修改接口
      editRole(data).then(() => {
        this.$message.success('修改成功!');

        // 调用父组件的列表显示方法
        this.$parent.getRoleList();
      }).catch((err) => {
        this.$message.error(err);
      });
    },
  },
};
</script>

<style>
</style>
