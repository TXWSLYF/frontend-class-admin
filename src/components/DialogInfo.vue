<template>
  <el-dialog :title="title" :visible.sync="dialogInfoFlag" @close="close">
    <el-form :model="form">
      <el-form-item label="角色名称" :label-width="formLabelWidth">
        <el-input v-model="form.roleName" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="权限详情" :label-width="formLabelWidth">
        <el-select v-model="form.authorities" multiple placeholder="请选择" style="display: block">
          <el-option
            v-for="item in authorities"
            :key="item.id"
            :label="item.nameZh"
            :value="item.nameZh">
          </el-option>
        </el-select>
      </el-form-item>
      <!-- <slot></slot> -->
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogInfoFlag = false">取 消</el-button>
      <el-button type="primary" @click="dialogInfoFlag = false">确 定</el-button>
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
      // authorities: [{
      //   value: '选项1',
      //   label: '黄金糕',
      // }, {
      //   value: '选项2',
      //   label: '双皮奶',
      // }, {
      //   value: '选项3',
      //   label: '蚵仔煎',
      // }, {
      //   value: '选项4',
      //   label: '龙须面',
      // }, {
      //   value: '选项5',
      //   label: '北京烤鸭',
      // }],
      form: {
        roleName: '',
        authorities: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
      },
      formLabelWidth: '120px',
    };
  },
  methods: {
    close() {
      this.$emit('update:flag', false);
      // 回调时需要逻辑处理时用
      // this.$emit('close', false);
    },
  },
};
</script>

<style>
</style>
