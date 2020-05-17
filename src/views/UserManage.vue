<template lang="pug">
  .user-manage
    .search-top-bar
      h2.top-bar-title  用户管理
      .top-bar-content
      el-form(label-width="80px" :inline="true" @change="query")
          el-form-item(label="学员昵称" )
            el-input(v-model="searchFormData.nickname" label="昵称" @change="query")
          el-form-item(label="报名日期" )
            el-date-picker(
              @change="query"
              v-model="searchFormData.time"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期")
          el-form-item(label="备注")
            el-input(v-model="searchFormData.remark" label="备注" @change="query")
          el-form-item(label="报名情况")
            el-select(v-model="searchFormData.signDesc" multiple placeholder="请选择"
            @change="query")
              el-option(
                v-for="item in signArray"
                :key="item.value"
                :label="item.label"
                :value="item.value")
          el-form-item
            el-button(type="primary"  @click="query") 查询
          el-form-item
            el-button(type="primary"  @click = "clearData") 重置
    .search-content
      el-table(:data="tableData" stripe style="width: 100%")
        el-table-column(
          prop="nickname"
          label="学员昵称"
          )
        el-table-column(
          prop="name"
          label="学员账号"
          )
        el-table-column(
          prop="signDesc"
          label="报名情况"
          )
          template(slot-scope="scope")
            el-tag(v-for="item in scope.row.signDesc" :key="item.value") {{item.label}}
        el-table-column(
          prop="class_progress"
          label="当前上课进度"
          )
          template(slot-scope="scope")
            div {{`${scope.row.class_progress.classInfo.name}:${scope.row.class_progress.progress}%`}}
        el-table-column(
          prop="homework_progress"
          label="当前作业进度"
          )
          template(slot-scope="scope")
            div {{`${scope.row.class_progress.classInfo.name}:${scope.row.class_progress.progress}%`}}
        el-table-column(
          prop="remark"
          label="备注"
          )
        el-table-column(
          prop="operate"
          label="操作"
          )
          template(slot-scope="scope")
            el-button(@click="handleRowData(scope.row)" type="text" size="small") 编辑
    UserManageModal(:data="curRowData" ref="infoModal" :signArray="signArray" @save="handleSave")

</template>
<script>
import {
  getUserInfo, getWholeCourseList,
} from '@/api/userManage';
import UserManageModal from '@/components/userManage/userManageModal.vue';

export default {
  name: 'UserManage',
  components: {
    UserManageModal,
  },
  data() {
    return {
      curRowData: {},
      signArray: [
        {
          value: '小白营',
          label: '小白营',
        },
        {
          value: '初级营',
          label: '初级营',
        },
        {
          value: 'vue营',
          label: 'vue营',
        },
      ],
      searchFormData: {
        nickname: '',
        time: [],
        remark: '',
        signDesc: [],
      },
      tableData: [],
      pageSize: 20,
      currentPage: 1,
    };
  },
  methods: {
    handleChange() {
      console.log(this.searchFormData);
    },
    handleRowData(data) {
      this.curRowData = data;
      this.$refs.infoModal.init();
    },
    query() {
      const data = {
        pageSize: this.pageSize,
        currentPage: this.currentPage,
        nickname: this.searchFormData.nickname,
        name: this.searchFormData.name,
        remark: this.searchFormData.remark,
      };
      // if (this.searchFormData.remark) {
      //   data.remark = this.searchFormData.remark;
      // }
      if (this.searchFormData.time && this.searchFormData.time.length > 1) {
        data.startTime = Number(this.searchFormData.time[0]);
        data.endTime = Number(this.searchFormData.time[1]);
      }

      if (this.searchFormData.signDesc.length > 0) {
        data.courseHashs = this.searchFormData.signDesc;
      }

      getUserInfo(data).then((res) => {
        this.tableData = this.userDataTransform(res.rows);
      });
    },
    clearData() {
      this.searchFormData = {
        nickname: '',
        time: [],
        remark: '',
        signDesc: [],
      };
      this.query();
    },
    handleSave() {
      this.query();
    },
    userDataTransform(data) {
      return data.map((userInfo) => {
        const obj = {};
        obj.nickname = userInfo.nickname;
        obj.name = userInfo.name;
        obj.remark = userInfo.remark;
        obj.signDesc = userInfo.userCourses
          .map((course) => ({ label: course.courseInfo.name, value: course.courseInfo.hash }));
        const classList = userInfo.userClasses.filter((ele) => ele.classInfo.type === 1);
        const homeworkList = userInfo.userClasses.filter((ele) => ele.classInfo.type === 2);
        obj.class_progress = classList[0] || {
          progress: 0, // 课堂进度
          classInfo: {
            name: '暂无',
            type: 1, // 课堂类型，type=1为授课课堂，type=2为练习课堂
          },
        };
        obj.homework_progress = homeworkList[0] || {
          progress: 0, // 课堂进度
          classInfo: {
            name: '暂无',
            type: 2, // 课堂类型，type=1为授课课堂，type=2为练习课堂
          },
        };
        return obj;
      });
    },
  },
  mounted() {
    getWholeCourseList().then((res) => {
      this.signArray = res.map((course) => ({
        label: course.name,
        value: course.hash,
      }));
    });
    this.query();
  },
};
</script>

<style lang="less" scoped>
.user-manage {
      color: #7c7d7e;
  width: 100%;
  .search-top-bar {
    width: 100%;
    margin: 10px;
  }
}
</style>
