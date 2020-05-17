<template lang="pug">
  el-dialog(
    title="提示"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose")
    el-form(label-width="80px")
      el-form-item(label="学员昵称")
        el-input(v-model="form.nickname" label="昵称")
      el-form-item(
        label="学员账号"
        )
        el-input(v-model="form.name" :disabled="true" label="账号")
      el-form-item(
        label="报名情况"
        )
        el-select(v-model="form.signDesc" :disabled="true"  multiple placeholder="请选择")
          el-option(
            v-for="item in signArray"
            :key="item.value"
            :label="item.label"
            :value="item.value")
      el-form-item(
        label="备注"
        )
        el-input(v-model="form.remark" label="备注")
    span(slot="footer" class="dialog-footer")
      el-button(@click="dialogVisible = false") 取 消
      el-button( type="primary" @click="save") 保存
</template>
<script>
import {
  updateUserInfo,
} from '@/api/userManage';

export default {
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
    signArray: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      dialogVisible: false,
      form: {
        nickname: '',
        name: '',
        signDesc: [],
        remark: '',
      },
    };
  },
  methods: {
    init() {
      this.dialogVisible = true;
      this.$nextTick(() => {
        this.form.nickname = this.data.nickname;
        this.form.name = this.data.name;
        this.form.signDesc = this.data.signDesc;
        this.form.remark = this.data.remark;
      });
    },
    async save() {
      await updateUserInfo({
        name: this.form.name,
        nickname: this.form.nickname,
        remark: this.form.remark,
      });
      this.$message.success('保存成功');
      this.$emit('save');
      this.dialogVisible = false;
    },
    handleClose() {
      this.dialogVisible = false;
    },
  },
};
</script>
<style lang="sass" scoped>

</style>
