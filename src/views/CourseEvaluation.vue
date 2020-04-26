<template>
  <div class="course-evaluation">
    <main>
        <header>
          <h2 class="fontColor">课程评价</h2>
          <el-form>
            <el-row :gutter="50" type="flex" justify="start">
              <el-col :span="20" :xs="20" :sm="13" :md="12" :lg="11" :xl="5">
                <!-- <div class="label-wrap">
                  <label for="">时间段</label>
                  <div class="wrap-content">
                    <el-date-picker
                      v-model="form.date"
                      type="daterange"
                      align="right"
                      unlink-panels
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      :picker-options="form.pickerOptions">
                    </el-date-picker>
                  </div>
                </div> -->
                <el-form-item label="时间段">
                  <div class="block">
                    <el-date-picker
                      v-model="form.date"
                      type="daterange"
                      align="right"
                      unlink-panels
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      :picker-options="form.pickerOptions">
                    </el-date-picker>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-button type="primary" @click="search" :loading="searchLoading">查询</el-button>
              </el-col>
              <el-col :span="2">
                <el-button type="primary" @click="reset">重置</el-button>
              </el-col>
            </el-row>
          </el-form>
        </header>
        <!-- 角色管理表格 -->
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          :default-sort = "{prop: 'classInfo.name', order: 'descending'}"
          :header-cell-style="{background: '#e3ecf7', color: '#9c9c9c', fontWeight: '550'}">
          <el-table-column prop="classInfo.name" sortable
            label="课程" :resizable="false"></el-table-column>
          <el-table-column prop="classDifficultyAvg" label="课程难度平均分"
            :resizable="false"></el-table-column>
          <el-table-column prop="classQualityAvg" label="课程质量平均分"
            :resizable="false"></el-table-column>
          <el-table-column prop="exerciseDifficultyAvg" label="作业难度平均分"
            :resizable="false"></el-table-column>
          <el-table-column label="意见建议" width="180" :resizable="false">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                @click="classCommentsDetails(scope.row)">查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          background
          :page-sizes="[10, 20, 50]"
          layout="total, sizes, prev, pager, next"
          :total="count">
        </el-pagination>

        <!-- 查看详情弹窗 -->
        <DialogComments :flag.sync="dialogInfoView" :paragraphHash="paragraphHash" :title="title"/>
      </main>
  </div>
</template>

<script>
import DialogComments from '@/components/DialogComments.vue';
// import { courseComments } from '@/api/comments';
import { courseComments } from '@/api/comments';

export default {
  name: 'CourseEvaluation',
  components: {
    DialogComments,
  },
  data() {
    return {
      // 日期选择器
      form: {
        pickerOptions: {
          shortcuts: [
            {
              text: '最近7天',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', [start, end]);
              },
            },
            {
              text: '最近15天',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 15);
                picker.$emit('pick', [start, end]);
              },
            },
            {
              text: '最近30天',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit('pick', [start, end]);
              },
            },
            {
              text: '全部',
              onClick(picker) {
                const end = new Date();
                const start = new Date('2020-01-01');
                picker.$emit('pick', [start, end]);
              },
            },
          ],
        },
        date: '',
      },
      // 表格数据
      tableData: [],
      // 查询等待
      searchLoading: false,

      // 查看详情弹窗
      dialogInfoView: false,
      title: '',
      // 评论段落hash
      paragraphHash: '',

      // 课程数据条数
      count: 0,
      // 当前所在页
      pageNumber: 1,
      // 每页显示条数
      pageSize: 10,
    };
  },
  methods: {
    // 重置
    reset() {
      this.form.date = '';
    },

    // 每页显示条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.search();
    },

    // 当前页
    handleCurrentChange(val) {
      this.pageNumber = val;
      this.search();
    },

    // 查询
    search() {
      if (!this.form.date) {
        this.$message.error('时间段不能为空');
        return false;
      }
      this.searchLoading = true;
      const data = {
        currentPage: this.pageNumber,
        pageSize: this.pageSize,
        startTime: this.form.date[0].getTime(),
        endTime: this.form.date[1].getTime(),
      };
      courseComments(data).then((response) => {
        // 更新数据
        this.tableData = response.rows;
        // 页面统计数据
        this.count = response.count;
        this.searchLoading = false;
      }).catch(() => {
        this.searchLoading = false;
      });

      return true;
    },

    // 课程评价详情
    classCommentsDetails(data) {
      this.dialogInfoView = true;
      this.paragraphHash = data.hash;
      this.title = `${data.classInfo.name}评价详情`;
    },
  },
};
</script>

<style lang="less" scoped>
.course-evaluation{
  > main {
      padding: 10px;
        > header {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding-right: 20px;
        }
    }
}

.label-wrap {
  // background: #000;
  lable {
    float: left;
    line-height: 40px;
    width: 50px;
    background: red;
  }
  .wrap-content {
    margin-left: 50px;
    height: 40px;
  }
}

.fontColor {
  color: #7c7d7e;
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
