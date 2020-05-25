<template>
  <div class="user-manage">
    <div class="search-top-bar">
      <h2 class="top-bar-title">用户管理</h2>
      <div class="top-bar-content"></div>
      <el-form label-width="80px" :inline="true" @change="query">
        <el-form-item label="学员昵称">
          <el-input v-model="searchFormData.nickname" label="昵称" @change="query"></el-input>
        </el-form-item>
        <el-form-item label="报名日期">
          <el-date-picker
            @change="query"
            v-model="searchFormData.time"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="searchFormData.remark" label="备注" @change="query"></el-input>
        </el-form-item>
        <el-form-item label="报名情况">
          <el-select
            v-model="searchFormData.signDesc"
            multiple="multiple"
            placeholder="请选择"
            @change="query"
          >
            <el-option
              v-for="item in signArray"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="query">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="clearData">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="search-content">
      <el-table :data="tableData" stripe="stripe" style="width: 100%">
        <el-table-column prop="nickname" label="学员昵称" width="110"></el-table-column>
        <el-table-column prop="name" label="学员账号" width="110"></el-table-column>
        <el-table-column prop="signDesc" label="报名情况"
          ><template slot-scope="scope"
            ><el-tag v-for="item in scope.row.signDesc" :key="item.value">{{
              item.label + ":" + item.time.toLocaleString()
            }}</el-tag></template
          ></el-table-column
        >
        <el-table-column prop="class_progress" label="当前上课进度" width="190"
          ><template slot-scope="scope"
            ><div>
              {{
                `${scope.row.class_progress.classInfo.name}:${scope.row.class_progress.progress}%`
              }}
            </div></template
          ></el-table-column
        >
        <el-table-column prop="homework_progress" label="当前作业进度" width="190"
          ><template slot-scope="scope"
            ><div>
              {{
                `${scope.row.class_progress.classInfo.name}:${scope.row.class_progress.progress}%`
              }}
            </div></template
          ></el-table-column
        >
        <el-table-column prop="userCoupons" label="优惠券">
          <template slot-scope="scope">
            <el-tag
              v-for="coupon in scope.row.userCoupons"
              :key="coupon.id"
              :style="`color:white;background:${getCouponStatusStyle(coupon.status)}`"
            >
              {{ coupon.couponInfo.title }}：
              {{ getCouponStatusName(coupon.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column prop="operate" label="操作" width="200">
          <template slot-scope="scope">
            <el-button @click="handleRowData(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="handleAddUserCoupon(scope.row)" type="text" size="small"
              >发放优惠券</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      class="pagenation"
      background="background"
      :page-size="pageSize"
      :current-page="currentPage"
      layout="total, prev, pager, next"
      @current-change="handlePageChange"
      @prev-click="handlePageChange"
      @next-click="handlePageChange"
      :total="total"
    ></el-pagination>
    <UserManageModal
      :data="curRowData"
      ref="infoModal"
      :signArray="signArray"
      @save="handleSave"
    ></UserManageModal>
    <el-dialog :visible.sync="couponDialogVisible" title="发放优惠券">
      <el-form>
        <el-form-item label="优惠券">
          <el-select v-model="selectedCouponId">
            <el-option
              v-for="coupon in couponList"
              :key="coupon.id"
              :value="coupon.id"
              :label="coupon.title"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="addUserCoupon" type="primary">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getUserInfo, getWholeCourseList } from '@/api/userManage';
import UserManageModal from '@/components/userManage/userManageModal.vue';
import { USER_COUPON_STATUSES, getCouponStatusName } from '@/common/constant';
import { getCouponList, userAddCoupon } from '@/api/coupon';

const userCouponStyles = {
  [USER_COUPON_STATUSES.UN_USED.value]: '#67C23A',
  [USER_COUPON_STATUSES.USED.value]: '#F56C6C',
};

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
      total: 0,
      pageSize: 20,
      currentPage: 1,
      USER_COUPON_STATUSES,
      // 优惠券列表
      couponList: [],
      couponDialogVisible: false,
      selectedCouponId: '',
    };
  },
  methods: {
    async addUserCoupon() {
      const { name } = this.curRowData;
      const { selectedCouponId } = this;
      await userAddCoupon({ userName: name, couponId: selectedCouponId });
      this.couponDialogVisible = false;
      this.selectedCouponId = '';
      this.query();
    },
    getCouponStatusStyle(status) {
      return userCouponStyles[status];
    },
    getCouponStatusName(status) {
      return getCouponStatusName(status);
    },
    handleChange() {},
    handleAddUserCoupon(data) {
      this.curRowData = data;
      this.couponDialogVisible = true;
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
        this.total = res.count;
      });
    },
    handlePageChange(page) {
      this.currentPage = page;
      this.query();
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
        obj.signDesc = userInfo.userCourses.map((course) => ({
          label: course.courseInfo.name,
          value: course.courseInfo.hash,
          time: new Date(course.createdAt),
        }));
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
        obj.userCoupons = userInfo.userCoupons;
        return obj;
      });
    },
  },
  mounted() {
    // 获取优惠券列表
    getCouponList().then((data) => {
      this.couponList = data;
    });

    getWholeCourseList().then((res) => {
      this.signArray = res.map((course) => ({
        label: course.name,
        value: course.hash,
      }));
    });
    this.currentPage = 1;
    this.query();
  },
};
</script>

<style lang="less" scoped>
.user-manage {
  color: #7c7d7e;
  width: 100%;
  padding: 36px;
  box-sizing: border-box;

  .search-content {
    margin-bottom: 20px;
  }

  .search-top-bar {
    width: 100%;
    margin: 10px;
  }

  .pagenation {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
