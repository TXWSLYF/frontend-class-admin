<template>
  <div class="course-evaluation">

   <el-row class="demo-autocomplete">
     <el-col :span="4">
       <el-autocomplete
         class="inline-input"
         v-model="state1"
         :fetch-suggestions="querySearch"
         placeholder="请输入内容"
         @select="handleSelect"
       ></el-autocomplete>
     </el-col>
     <el-col :span="12">
       <span class="demonstration">带快捷选项</span>
       <el-date-picker
         v-model="value2"
         type="daterange"
         align="right"
         unlink-panels
         range-separator="至"
         start-placeholder="开始日期"
         end-placeholder="结束日期"
         :picker-options="pickerOptions">
       </el-date-picker>
     </el-col>
   </el-row>

  </div>
</template>

<script>
export default {
  name: 'CourseEvaluation',
  data() {
    return {
      restaurants: [],
      state1: '',

      pickerOptions: {
        shortcuts: [{
          text: '最近7天',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          },
        }, {
          text: '最近15天',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 15);
            picker.$emit('pick', [start, end]);
          },
        }, {
          text: '最近30天',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          },
        }],
      },
      value1: '',
      value2: '',
    };
  },
  methods: {
    querySearch(queryString, cb) {
      const { restaurants } = this;
      // eslint-disable-next-line max-len
      const results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      // eslint-disable-next-line max-len
      return (restaurant) => (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
    },
    loadAll() {
      return [
        { value: '最近7天' },
        { value: '最近15天' },
        { value: '最近30天' },
        { value: '全部' },
      ];
    },
    handleSelect(item) {
      console.log(item);
    },
  },
  mounted() {
    this.restaurants = this.loadAll();
  },
};
</script>

<style lang="less" scoped>
.course-evaluation{
}
.demo-autocomplete{
  margin-top: 20px;
  margin-left: 20px;
}
</style>
