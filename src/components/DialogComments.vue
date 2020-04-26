<template>
  <el-dialog :title="title" :visible.sync="dialogInfoFlag"
    @close="close" @opened="commentsDetails" center>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      :default-sort = "{prop: 'userName', order: 'descending'}"
      :header-cell-style="{background: '#e3ecf7', color: '#9c9c9c', fontWeight: '550'}">
      <el-table-column prop="userName" label="学员昵称"
        :resizable="false" width="120"></el-table-column>
      <el-table-column prop="history.content" label="评价" :resizable="false"></el-table-column>
    </el-table>

    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[5, 10, 20]"
      :page-size="5"
      layout="total, sizes, prev, pager, next"
      :total="count">
    </el-pagination>
  </el-dialog>
</template>

<script>
import { courseCommDetails } from '@/api/comments';

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
    paragraphHash: {
      type: String,
      default: '',
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
      tableData: [],
      formLabelWidth: '120px',

      // 课程数据条数
      count: 0,
      // 当前所在页
      pageNumber: 1,
      // 每页显示条数
      pageSize: 5,
    };
  },
  methods: {
    close() {
      this.$emit('update:flag', false);
      // 回调时需要逻辑处理时用
      // this.$emit('close', false);
    },

    // 每页显示条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.commentsDetails();
    },

    // 当前页
    handleCurrentChange(val) {
      this.pageNumber = val;
      this.commentsDetails();
    },

    // 评价详情
    commentsDetails() {
      const data = {
        paragraphHash: this.paragraphHash,
        currentPage: this.pageNumber,
        pageSize: this.pageSize,
      };

      courseCommDetails(data).then((response) => {
        // 更新数据
        this.tableData = response.rows;
        // 页面统计数据
        this.count = response.count;
      }).catch(() => {
      });
    },
  },
};
</script>

<style>
.el-pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>
