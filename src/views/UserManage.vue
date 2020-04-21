<template>
  <div class="user-manage" style='min-width:1280px'>
    <p>用户管理</p>
    <div class="search-container">
      <div class="search-container_ID">
        <el-autocomplete
          placeholder="昵称、账号"
          suffix-icon="el-icon-search"
          v-model="state1"
          :fetch-suggestions="querySearch"
          @blur="handleSelect"
          style="width:150px"
        ></el-autocomplete>
      </div>
      <div class="search-container_time">
        <p>报名时间</p>
        <el-date-picker
        el-date-picker
        v-model="selectinfo"
        type="daterange"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :default-time="['00:00:00', '23:59:59']"
        style="width:250px"
        ></el-date-picker>
      </div>
      <div class="search-container_info">
        <p>报名情况</p>
        <el-select popper-class="search-container_info_select"
        v-model="value1" multiple placeholder="请选择">
          <el-option
            v-for="item in userNames"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </div>
      <div class="search-container_remark">
        <p>备注</p>
        <el-input  placeholder="输入备注"></el-input>
      </div>
      <div class="search-btn_container">
        <el-button type="info">查询</el-button>
        <el-button type="info">重置</el-button>
      </div>
    </div>
    <div class="user-info_container">
      <div class="user-info_top-container">
        <p class="user-info_top_nickname">用户昵称</p>
        <p class="user-info_top_ID">学员账号</p>
        <p class="user-info_top_info">报名情况</p>
        <p class="user-info_top_curPro">当前上课进度</p>
        <p class="user-info_top_proOpe">当前作业进度</p>
        <p class="user-info_top_remark">备注</p>
        <p>操作</p>
      </div>
      <div class="user-info_list-container">
        <div class="user-info_list" v-for="(item, index) in userInfo.rows" :key="index">
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
            <!-- <p class="user-info_operation_edit"
            v-model="userInfo.rows[0].id @click="handleClick">编辑</p> -->
            <el-button class="user-info_operation_edit"
              type="text" @click="changeInfo">编辑</el-button>

            <el-dialog custom-class="user-info_operation_edit_top"
            title="编辑学员信息" :center="true"
            :visible.sync="dialogFormVisible">
              <el-form :model="userInfo">
                <el-form-item label="学员姓名" :label-width="formLabelWidth">
                  <el-input v-model="userInfo.rows[0].id" autocomplete="off"
                  :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="微信号" :label-width="formLabelWidth">
                  <el-input v-model="userInfo.rows[0].name" autocomplete="off"
                  :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="报名情况" :label-width="formLabelWidth">
                  <el-select v-model="value2" multiple placeholder="请选择"
                  style="width:100%">
                    <el-option
                      v-for="item in userNames"
                      :key="item"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="当前上课进度" :label-width="formLabelWidth" >
                  <el-input v-model="userInfo.rows[0].userCourses[0].name"
                    autocomplete="off" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="当前作业进度" :label-width="formLabelWidth">
                  <el-input v-model="userInfo.rows[0].userCourses[1].progress"
                    autocomplete="off" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="备注" :label-width="formLabelWidth">
                  <el-input v-model="userInfo.rows[0].remark" autocomplete="off"></el-input>
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
      </div>
      <div class="user-info_pages" >
        <!-- <el-button icon="el-icon-arrow-left" plain></el-button> -->
        <el-pagination background
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
          :current-page="pageNumber"
          :page-size="pageSize"
          :page-sizes="[1, 2, 3,]"
          :total="5"
        layout="total, sizes, prev, pager, next, jumper"
        ></el-pagination>
        <!-- <el-button icon="el-icon-arrow-right" plain></el-button> -->
      </div>
    </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { usersInfo } from '@/api/userInfo';

export default {
  name: 'UserManage',
  data() {
    return {
      userInfo: {
        // usersInfo() {},
        count: 1, // 总条数
        rows: [
          {
            id: 21,
            name: '183575', // 用户账号
            avatar: 'http://s2.ax1x.com/2020/01/12/loQx9x.jpg', // 用户头像
            nickname: '昵称', // 用户昵称
            remark: null, // 用户备注
            createdAt: '2020-02-15T11:38:18.000Z', // 账号创建时间
            updatedAt: '2020-02-15T11:38:18.000Z',
            // 用户报名的课程列表
            userCourses: [
              {
                startAt: '2020-02-15', // 课程开始时间
                createdAt: '2020-02-15', // 报名时间
                courseInfo: {
                  id: '1',
                  name: '前端小白训练营', // 课程名称
                },
              },
              {
                startAt: '2020-02-21',
                createdAt: '2020-02-21T12:44:38.000Z',
                courseInfo: {
                  id: '2',
                  name: '前端初级训练营',
                },
              },
              {
                startAt: '2020-04-01',
                createdAt: '2020-04-01T12:24:37.000Z',
                courseInfo: {
                  id: '3',
                  name: 'Vue训练营',
                },
              },
            ],
            // 用户课堂列表，后台会筛选出来最多两条，一条是type=1的授课课堂，一条是type=2的练习课堂，需要前端自己做逻辑处理。
            userClasses: [
              {
                progress: 100, // 课堂进度
                createdAt: '2020-04-10T12:41:16.000Z', // 课堂开始时间
                classInfo: {
                  name: '大作业', // 课堂名称
                  type: 1, // 课堂类型，type=1为授课课堂，type=2为练习课堂
                  chapterInfo: {
                    name: '九、项目迁移——在本地搭建自己的vue工程', // 课堂所属章节信息
                  },
                },
              },
              {
                progress: 100,
                createdAt: '2020-04-09T09:07:23.000Z',
                classInfo: {
                  name: '课后练习',
                  type: 2,
                  chapterInfo: {
                    name: '八、组件实战——实现自己的button组件和input组件',
                  },
                },
              },
            ],
          },
        ],
        currentPage: 1,
        pageSize: 10,
      },
      userName: [{ name: 'a' }, { name: 'b' }, { name: 'c' }],
      state1: '',
      userNames: ['小白营', '初级营', 'Vue营'],
      selectinfo: '',
      value1: [],
      value2: ['小白营', '初级营', 'Vue营'],
      dialogFormVisible: false,
      formLabelWidth: '120px',
    };
  },

  computed: {
    ...mapState({
      pageNumber: (state) => state.pageNumber,
      pageSize: (state) => state.pageSize,
    }),
  },

  mounted() {
    usersInfo();
    // .then((currentPage) => {
    //   // post 成功，抄response.data 为返回的数据
    //   console.log(currentPage.data);
    //   // this.userName = currentPage.data;
    // });
  },
  methods: {
    ...mapMutations(['SET_PAGE']),

    changeInfo() {
      this.dialogFormVisible = true;
    },
    deleteInfo() {},

    // 1.更新分页参数
    setPageNum(nextPage) {
      const pageParams = {
        pageNumber: nextPage,
        pageSize: this.pageSize,
      };
      this.SET_PAGE(pageParams);
    },
    setPageSize(nextSize) {
      const pageParams = {
        pageNumber: this.pageNumber,
        pageSize: nextSize,
      };
      this.SET_PAGE(pageParams);
    },

    // 2.获取分页数据
    handleCurrentChange(currentPage) {
      console.log(`当前页: ${currentPage}`);
      this.setPageNum(currentPage);
      // this.getDataApi(pageNumber,pageSize)
    },
    handleSizeChange(currentSize) {
      console.log(`每页 ${currentSize} 条`);
      this.setPageSize(currentSize);
      // this.getDataApi(pageNumber,pageSize)
    },

    querySearch(queryString, cb) {
      const result = this.userName.filter((singleData) => {
        if (singleData.name.indexOf(queryString) > -1) {
          return true;
        }
        return false;
      });
      cb(result);
    },
    handleSelect() {},
  },
};
</script>

<style lang="less" scoped></style>
