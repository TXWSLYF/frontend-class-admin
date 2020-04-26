<template>
<el-dialog :title="title" center
      :visible.sync="detailEvalDialogFlag"
      @close="close"
      width="50%">
      <el-table
        :header-cell-style="{padding:'4px',background:'#E3ECF7'}"
        :data="value"
        style="width: 100%">
        <el-table-column
          label="学员昵称"
          width="200">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.userName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="评价"
          width="420">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.history.content }}</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器
      total 总条数
      current-page 当前页
      page-size 每页多少条数据
      current-change 页码改变事件
     -->
    <el-pagination
      @current-change="handleCurrentChange"
      background
      class="pagination"
      layout="prev, pager, next"
      :total="total"
      :current-page="page"
      :page-size="pageSize"
    ></el-pagination>
    </el-dialog>
</template>

<script>
export default {
  name: 'DetailEvaluationDialog',
  // d单向数据流，父级到子级，不能反向修改
  props: {
    flag: {
      type: Boolean,
      default: true,
    },
    value: {
      type: Array,
    },
    dialogCount: {
      type: Number,
    },
    title: {
      type: String,
    },
  },
  watch: {
    flag: {
      handler(newValue) {
        this.detailEvalDialogFlag = newValue;
        this.total = this.dialogCount;
      },
    },
  },
  data() {
    return {
      detailEvalDialogFlag: false,
      total: 20,
      page: 1,
      pageSize: 10,
    };
  },
  methods: {
    close() {
      this.$emit('close');
      this.$emit('update:flag', false);
      // 回调时需要逻辑处理时用
      // this.$emit('close', false);
    },
    // 页码改变事件
    handleCurrentChange(val) {
      // 保存页码
      this.page = val;
      // 重新获取数据
      this.$emit('nextPage', this.page);
    },
  },
};
</script>

<style>
</style>
