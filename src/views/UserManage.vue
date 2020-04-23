<template>
  <div class="user-manage" >
    <p>用户管理</p>
    <div class="search-container">
      <div class="search-container_ID">
        <el-input
          placeholder="昵称"
          class="name_search"
          @change="handleName"
          v-model="inputName">
           <i slot="suffix" class="el-input__icon el-icon-search" @click="handleName"></i>
        </el-input>
      </div>
      <div class="search-container_time">
        <p>报名时间</p>
        <el-date-picker
          el-date-picker
          v-model="selectInfo"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['00:00:00', '23:59:59']"
          style="width:260px"
        ></el-date-picker>
      </div>
      <div class="search-container_info">
        <p>报名情况</p>
        <el-select popper-class="search-container_info_select"
          v-model="selectcours" multiple placeholder="请选择">
          <el-option
            v-for="item in inputName"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </div>
      <div class="search-container_remark">
        <p>备注</p>
        <el-input
          placeholder="输入备注"
          class="inline-input"
          @change="handleName"
          v-model="remark">
            <i slot="suffix" class="el-input__icon el-icon-search" @click="handleName"></i>
        </el-input>
      </div>
      <div class="search-btn_container">
        <el-button type="primary" @click="handleRoles">查询</el-button>
        <el-button type="primary" @click="resetTableList">重置</el-button>
      </div>
    </div>
    <div class="user-info_container">
      <el-table
        :header-cell-style="{padding:'4px',background:'#E3ECF7'}"
        :data="tableData"
        style="width: 100%">
        <el-table-column
          label="昵称"
          width="100">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.nickname }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="学员账号"
          width="100">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="报名情况"
          width="300">
          <template slot-scope="scope">
            <span style="margin-left: 10px">
            {{ scope.row.userClasses[0].classInfo.chapterInfo.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="上课进度"
          width="200">
          <template slot-scope="scope">
            <span style="margin-left: 10px">
            {{ scope.row.userClasses[0].progress }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="上课进度"
          width="200">
          <template slot-scope="scope">
            <span style="margin-left: 10px">
            {{ scope.row.userClasses[0].progress }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="备注"
          width="150">
          <template slot-scope="scope">
            <span style="margin-left: 10px">
            {{ scope.row.remark }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
              <el-button
              @click="showEditRightDialog(scope.row)"
              type="text" size="small"
              >编辑</el-button>
                <el-button
                @click="showDeleteRightDialog(scope.row)"
                type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- <div class="user-info_top-container">
        <p class="user-info_top_nickname">用户昵称</p>
        <p class="user-info_top_ID">学员账号</p>
        <p class="user-info_top_info">报名情况</p>
        <p class="user-info_top_curPro">当前上课进度</p>
        <p class="user-info_top_proOpe">当前作业进度</p>
        <p class="user-info_top_remark">备注</p>
        <p>操作</p>
      </div>
      <div class="user-info_list-container">
        <div class="user-info_list" v-for="(item, index) in data" :key="index">
          <p class="user-info_list_nickname">{{ item.nickname }}</p>
          <p class="user-info_list_id">{{ item.name }}</p>
          <div class="user-info_list_info">
            <p v-for="(courseInfo, index2) in item.userCourses" :key="index2">
              {{ courseInfo.courseInfo.name }}
              ({{ courseInfo.startAt }})
            </p>
          </div>
          <p class="user-info_list_curPro">{{ item.userCourses[2].courseInfo.name}}</p>
          <p class="user-info_list_proOpe">{{ item.userClasses[1].progress }}</p>
          <div class="user-info_list_remark">
            <p>
              {{ item.remark }}
            </p>
          </div>
          <div class="user-info_operation">
            <el-button class="user-info_operation_edit"
              type="text" @click="changeInfo">编辑</el-button>

            <el-dialog custom-class="user-info_operation_edit_top"
            title="编辑学员信息" center
            :visible.sync="dialogFormVisible">
              <el-form :model="userInfo">
                <el-form-item label="学员姓名" :label-width="formLabelWidth">
                  <el-input v-model="data.id" autocomplete="off"
                  :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="微信号" :label-width="formLabelWidth">
                  <el-input v-model="data.name" autocomplete="off"
                  :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="报名情况" :label-width="formLabelWidth">
                  <el-select v-model="value2" multiple placeholder="请选择"
                  style="width:100%">
                    <el-option
                      v-for="item in inputName"
                      :key="item"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="当前上课进度" :label-width="formLabelWidth" >
                  <el-input v-model="data.userCourses[0].name"
                    autocomplete="off" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="当前作业进度" :label-width="formLabelWidth">
                  <el-input v-model="data.userCourses[1].progress"
                    autocomplete="off" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="备注" :label-width="formLabelWidth">
                  <el-input v-model="data.remark" autocomplete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
              </div>
            </el-dialog>
            <el-button class="user-info_operation_delete" type="text"
              @click="deleteInfo">删除</el-button>
          </div>
        </div>
      </div>  -->
      <div class="user-info_pages" >
        <el-pagination background
          @current-change="handleCurrentChange"
          :page-size="pageSize"
          :current-page="page"
          :tatal="total"
          layout="prev, pager, next"
        ></el-pagination>
      </div>
    </div>
    </div>
</template>

<script>
// import { mapState, mapMutations } from 'vuex';
import { usersInfo } from '@/api/userInfo';

export default {
  name: 'UserManage',
  data() {
    return {
      inputName: '',
      startTime: '',
      endTime: '',
      selectcours: [],
      total: 20,
      page: 1,
      pageSize: 10,
      usersInfo: '',
      tableData: [],
      state1: '',
      selectInfo: '',
      value1: [],
      value2: ['小白营', '初级营', 'Vue营'],
      DetailRightDialogVisible: false,
      formLabelWidth: '120px',
      remarks: [{ value: '三全鲜食（北新泾店）', address: '长宁区新渔路144号' },
        { value: 'Hot honey 首尔炸鸡（仙霞路）', address: '上海市长宁区淞虹路661号' }],
      remark: '',
    };
  },

  mounted() {
    usersInfo();
  },
  created() {
    // this.getRoleOptions();
    this.getList();
  },
  methods: {
    async getList() {
      // const param = {
      //   currentPage: this.page,
      //   pageSize: this.pageSize,
      //   userNames: this.inputName,
      //   courseHashs: this.selectcours,
      // };
      // const {
      //   currentPage, pageSize, userNames, courseHashs,
      // } = param;
      const res = await usersInfo({
        // currentPage, pageSize, userNames, courseHashs,
      });
      this.tableData = res.rows;
      console.log(this.tableData);
    },
    // 根据姓名搜索
    handleName() {
      console.log(this.inputName);
      // 重新获取列表数据
      this.userInfo();
    },
    // 根据备注搜索
    handleRoles() {
      console.log(this.selectcours);
      // 重新获取列表数据
      // this.getTableList();
    },
    setDetail(data) {
      this.Detail.name = data.name;
      this.Detail.roleZh = data.userRoles[0].roleInfo.nameZh;
      this.Detail.role = data.userRoles[0].roleInfo.name;
      this.Detail.right = data.userRoles[0].roleInfo.desc;
    },

    // 详情对话框
    showDetailRightDialog(data1) {
      this.setDetail(data1);
      // this.Detail = data;
      console.log(this.Detail);
      this.DetailRightDialogVisible = true;
    },
    resetTableList() {
      this.inputName = '';
      this.selectcours = '';
      this.page = 1;
      this.pageSize = 10;
      // 重新获取列表数据
      // this.getTableList();
    },

    changeInfo() {
      this.dialogFormVisible = true;
    },
    deleteInfo() {},

    // 页码改变事件
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      // 保存页码
      this.page = val;
      // 重新获取数据
      // this.getTableList();
    },

    querySearch(queryString, cb) {
      const result = this.nickname.filter((singleData) => {
        if (singleData.value.indexOf(queryString) > -1) { return true; }
        return false;
      });
      cb(result);
    },
    handleSelect() {},
  },
};

</script>

<style lang="less" scoped></style>
