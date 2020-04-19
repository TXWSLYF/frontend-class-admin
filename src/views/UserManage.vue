<template>
  <div class="user-manage">
    <p>用户管理</p>
    <div class="search-container">
      <div class="search-container_ID">
        <el-input
          placeholder="昵称、账号"
          suffix-icon="el-icon-search"
          :fetch-suggestions="querySearch"
          v-model="selectinfo"
          @select="handleSelect"
        ></el-input>
      </div>
      <div class="search-container_time">
        <p>报名时间</p>
        <el-input
          placeholder="开始时间~结束时间"
          suffix-icon="el-icon-date"
          v-model="selectinfo"
        ></el-input>
      </div>
      <div class="search-container_info">
        <p>报名情况</p>
        <el-autocomplete
          v-model="selectinfo"
          :fetch-suggestions="querySearch"
          @select="handleSelect"
        ></el-autocomplete>
      </div>
      <div class="search-container_remark">
        <p>备注</p>
        <el-input v-model="selectinfo" placeholder="输入备注"></el-input>
      </div>
      <div class="search-btn_container">
        <el-button type="info">查询</el-button>
        <el-button type="info">重置</el-button>
      </div>
    </div>
    <div class="user-info_container">
      <ul class="user-info_top-container">
        <li>用户昵称</li>
        <li class="user-info_top_ID">学员账号</li>
        <li class="user-info_top_info">报名情况</li>
        <li class="user-info_top_curPro">当前上课进度</li>
        <li class="user-info_top_proOpe">当前作业进度</li>
        <li class="user-info_top_remark">备注</li>
        <li>操作</li>
      </ul>
      <div class="user-info_list-container">
        <ul class="user-info_list" v-for="(item, index) in userInfo.rows" :key="index">
          <li>{{ item.nickname }}</li>
          <li class="user-info_list_id">{{ item.name }}</li>
          <li class="user-info_list_info">
            <p v-for="(courseInfo, index2) in item.userCourses" :key="index2">
              {{ courseInfo.courseInfo.name }}
              ({{ courseInfo.startAt }})
            </p>
          </li>
          <li>{{ item.userCourses[2].courseInfo.name}}</li>
          <li >{{ item.userClasses[1].progress }}</li>
          <li>
            <p>
              {{ item.remark }}
            </p>
          </li>
          <li class="user-info_operation">
            <!-- <p class="user-info_operation_edit" @click="handleClick">编辑、</p> -->
            <el-button type="primary" plain>编辑</el-button>
            <el-button type="warning" plain>删除</el-button>
          </li>
        </ul>
      </div>
      <div class="user-info_pages">
        <el-button icon="el-icon-arrow-left" plain></el-button>
        <el-button plain
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
          :current-page="pageNumber"
          :page-size="pageSize"
          :page-sizes="[1, 2, 3,]"
          :total="5"
        layout="total, sizes, prev, pager, next, jumper"
        ></el-button>
        <el-button icon="el-icon-arrow-right" plain></el-button>
      </div>
    </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'UserManage',
  data() {
    return {
      userInfo: {
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
                  name: '前端小白训练营', // 课程名称
                },
              },
              {
                startAt: '2020-02-21',
                createdAt: '2020-02-21T12:44:38.000Z',
                courseInfo: {
                  name: '前端初级训练营',
                },
              },
              {
                startAt: '2020-04-01',
                createdAt: '2020-04-01T12:24:37.000Z',
                courseInfo: {
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
        selectinfo: '',
        currentPage: 1,
        pageSize: 10,
      },
    };
  },

  computed: {
    ...mapState({
      pageNumber: (state) => state.pageNumber,
      pageSize: (state) => state.pageSize,
    }),
  },

  methods: {
    ...mapMutations(['SET_PAGE']),

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
      const result = this.userInfo.rows.filter((singleData) => {
        if (singleData.userCourses.name.indexOf(queryString) > -1) {
          return true;
        }
        return false;
      });
      cb(result);
    },
    handleSelect() {},
  },

  // handleClick() {
  //   const h = this.$createElement;
  //   this.$msgbox({
  //     title: '消息',
  //     message: h('p', null, [
  //       h('span', null, '内容可以是 '),
  //       h('i', { style: 'color: teal' }, 'VNode'),
  //     ]),
  //     showCancelButton: true,
  //     confirmButtonText: '确定',
  //     cancelButtonText: '取消',
  //     beforeClose: (action, instance, done) => {
  //       if (action === 'confirm') {
  //         instance.confirmButtonLoading = true;
  //         instance.confirmButtonText = '执行中...';
  //         setTimeout(() => {
  //           done();
  //           setTimeout(() => {
  //             instance.confirmButtonLoading = false;
  //           }, 300);
  //         }, 3000);
  //       } else {
  //         done();
  //       }
  //     },
  //   }).then(action => {
  //     this.$message({
  //       type: 'info',
  //       message: 'action:' + action,
  //     });
  //   });
  // },
};
</script>

<style lang="less" scoped></style>
