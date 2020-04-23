<template>
    <div class="course-evaluation">
      <div class="authority-manage_title">
      <span>课程评价</span>
    </div>
    <div class="authority-manage_search">
      <!-- 选择时间 -->
      <div>
            <el-select class="name_search"
            v-model="value1"
            @change="setDate"
            placeholder="请选择">
              <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
              </el-option>
            </el-select>
            <span class="role">时间段</span>
            <el-date-picker
            class="roles_search"
              v-model="value2"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="getDate">
            </el-date-picker>
      </div>
        <div>
          <el-button
          class="authority-manage_button"
          type="primary"
          @click="handleTime">查询</el-button>
          <el-button
          class="authority-manage_button"
          type="primary"
          @click="resetTableList">重置</el-button>
        </div>
    </div>
    <!-- 索引目录 -->
    <div class="authority-manage_item">
      <el-table
        :header-cell-style="{padding:'4px',background:'#E3ECF7'}"
        :data="tableData"
        style="width: 100%">
        <el-table-column
          label="课程"
          width="240">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.classInfo.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="课程难度平均分"
          width="220">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.classDifficultyAvg }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="课程质量平均分"
          width="220">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.classQualityAvg }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="作业难度平均分"
          width="220">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.exerciseDifficultyAvg }}</span>
          </template>
        </el-table-column>
        <el-table-column label="意见建议">
          <template slot-scope="scope">
            <el-button
            style="margin-left: 10px"
            @click="showdetEvalDialog(scope.row)"
            type="text" size="small">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 查看详情 -->
    <DetailEvaluationDialog
      :flag.sync="evaluationVisible"
      :value="detail"
      :dialogCount="dialogCount"
      :title="title"
      @nextPage="getTableListDetail"
      @close="clearDetail"></DetailEvaluationDialog>
    <!-- 分页  -->
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
  </div>
</template>

<script>
import { getClassFeedbackList, getClassFeedbackDetail } from '@/api/courseElvaluation';
import DetailEvaluationDialog from '@/components/DetailEvaluationDialog.vue';

export default {
  name: 'CourseEvaluation',
  components: {
    DetailEvaluationDialog,
  },
  data() {
    return {
      options: [{
        value: '选项1',
        label: '最近7天',
      }, {
        value: '选项2',
        label: '最近15天',
      }, {
        value: '选项3',
        label: '最近30天',
      }, {
        value: '选项4',
        label: '全部',
      }],
      value1: '',
      value2: [],
      end: '',
      start: '',
      total: 20,
      page: 1,
      pageSize: 10,
      evaluationVisible: false,
      detail: [],
      tableData: [],
      paragraphHash: '',
      dialogCount: 10,
      title: '',
    };
  },
  created() {
    this.getTableList();
  },
  methods: {
    getDate() {
      console.log(this.value2);
    },
    setDate() {
      switch (this.value1) {
        case '选项1':
          this.end = new Date();
          this.start = new Date();
          this.start.setTime(this.start.getTime() - 3600 * 1000 * 24 * 7);
          this.value2 = [this.start, this.end];
          break;
        case '选项2':
          this.end = new Date();
          this.start = new Date();
          this.start.setTime(this.start.getTime() - 3600 * 1000 * 24 * 15);
          this.value2 = [this.start, this.end];
          break;
        case '选项3':
          this.end = new Date();
          this.start = new Date();
          this.start.setTime(this.start.getTime() - 3600 * 1000 * 24 * 30);
          this.value2 = [this.start, this.end];
          break;
        case '选项4':
          this.end = new Date();
          this.start = new Date();
          this.start.setTime(this.start.getTime() - 3600 * 1000 * 24 * 100);
          this.value2 = [this.start, this.end];
          break;
        default:
          break;
      }
    },
    // 清空查看详情中的数据
    clearDetail() {
      console.log('aaaaaaaa');
      this.detail = [];
    },
    // 查询对应日期的表格数据
    handleTime() {
      this.getTableList();
    },
    // 重置页面
    resetTableList() {
      console.log('bbbb');
      this.value1 = '';
      this.value2 = [];
      this.getTableList();
    },
    // 获取表格数据
    async getTableList() {
      const param = {
        currentPage: this.page,
        pageSize: this.pageSize,
        startTime: Date.parse(new Date(this.value2[0])),
        endTime: Date.parse(new Date(this.value2[1])),
      };
      const {
        currentPage, pageSize, startTime, endTime,
      } = param;
      const res = await getClassFeedbackList({
        currentPage, pageSize, startTime, endTime,
      });
      this.tableData = res.rows;
      this.total = res.count;
      console.log(res);
    },
    // 获取查看详情数据
    async getTableListDetail(page) {
      const param = {
        currentPage: page,
        paragraphHash: this.paragraphHash,
      };
      console.log(param);
      const {
        currentPage, paragraphHash,
      } = param;
      const res = await getClassFeedbackDetail({
        currentPage, paragraphHash,
      });
      this.detail = res.rows;
      this.dialogCount = res.count;
      console.log(res);
    },
    // 评价详情对话框显示
    showdetEvalDialog(row) {
      // this.editDetail = row;
      console.log(row);
      this.paragraphHash = row.hash;
      this.title = row.classInfo.name;
      const param = {
        currentPage: 1,
        paragraphHash: this.paragraphHash,
      };
      const {
        currentPage, paragraphHash,
      } = param;
      getClassFeedbackDetail({
        currentPage, paragraphHash,
      }).then((res) => {
        this.detail = res.rows;
        this.dialogCount = res.count;
        // 显示页面，在数据获取完成后显示页面
        this.evaluationVisible = true;
      });
    },
    // 页码改变事件
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      // 保存页码
      this.page = val;
      // 重新获取数据
      this.getTableList();
    },
  },
};
</script>

<style lang="less" scoped>
.course-evaluation{
}
.authority-manage_title{
  margin: 5px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.authority-manage_button{
  border-radius: 10px;
  margin: 5px 20px 5px;
}
.authority-manage_search{
  background-color: white;
  margin: 5px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.name_search{
  margin: 5px 20px;
  width: 150px;
}
.role{
  margin: 5px 0 5px 20px;
}
.roles_search{
  margin: 5px;
  width: 400px;
}
.pointer{
  cursor: pointer;
}
.pagination{
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
