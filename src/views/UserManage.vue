<template>
  <div class="user-manage">
    <p>用户管理</p>
    <div class="search-container">
      <div class="search-container_ID">
        <el-input
          placeholder="昵称、账号"
          suffix-icon="el-icon-search"
          v-model="inputID"
        ></el-input>
      </div>
      <div class="search-container_time">
        <p>报名时间</p>
        <el-input
          placeholder="开始时间~结束时间"
          suffix-icon="el-icon-date"
          v-model="selectTime"
        ></el-input>
      </div>
      <div class="search-container_info">
        <p>报名情况</p>
        <el-input v-model="selectinfo"></el-input>
      </div>
      <div class="search-container_remark" >
        <p>备注</p>
        <el-input v-model="remark" placeholder="输入备注"></el-input>
      </div>
      <div class="search-btn_container">
      <el-button type="info" >查询</el-button>
      <el-button type="info" >重置</el-button>
      </div>
    </div>
    <div class="user-info_container">
      <div class="user-info_top-container">
        <p>用户昵称</p>
        <p class="user-info_top_ID">学员账号</p>
        <p class="user-info_top_info">报名情况</p>
        <p>当前上课进度</p>
        <p>当前作业进度</p>
        <p>备注</p>
        <p>操作</p>
      </div>
      <div class="user-info_list-container">
      <div class="user-info_list">
        <div>guihanhan</div>
        <div>123456</div>
        <div class="user-info_list_info">
          <p>小白营(2020.4.1)</p>
          <p>初级营(2020.4.10)</p>
          <p>Vue营(2020.4.20)</p>
        </div>
        <div>小白营第五课</div>
        <div>100%</div>
        <div>
          <p>小白营一期</p>
          <p>初级营一期</p>
          <p>Vue营二期</p>
        </div>
        <div class="user-info_operation">
          <p>编辑、</p>
          <p>删除</p>
        </div>
      </div>
       <div class="user-info_list">
        <div>guihanhan</div>
        <div>123456</div>
        <div class="user-info_list_info">
          <p>小白营(2020.4.1)</p>
          <p>初级营(2020.4.10)</p>
          <p>Vue营(2020.4.20)</p>
        </div>
        <div>小白营第五课</div>
        <div>100%</div>
        <div>
          <p>小白营一期</p>
          <p>初级营一期</p>
          <p>Vue营二期</p>
        </div>
        <div class="user-info_operation">
          <p>编辑、</p>
          <p>删除</p>
        </div>
      </div>
      </div>
    </div>
    <div class="user-info_pages">
      <el-button icon="el-icon-arrow-left" plain></el-button>
      <el-button plain>1</el-button>
      <el-button icon="el-icon-arrow-right" plain></el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserManage',
};
</script>

<style lang="less" scoped>
.user-manage {
  min-width:1280px;
  height:100%;
  padding:0;
  margin:0;
  margin-left:10px;
  color:#464646;
}

.search-container{
  height:50px;
  background-color: white;
  font-size: 15px;
  display: flex;
  justify-content: start;
  align-items:center;
}
.search-container_ID{
  width:150px;
  margin:0 30px;
}
.search-container_time,
.search-container_info,
.search-container_remark{
  display:flex;
  align-items:center;
}

.search-container_info{
  width:350px;
  margin:0 25px;
}

.search-container_remark{
  width:150px;
  margin:0 20px 0 0;
}

.search-container_time p,
.search-container_info p{
  width:80px;
  margin-right: 5px;
}

.search-container_remark p{
  width:40px;
  margin-right: 5px;
}
.user-info_container{
  min-width:1280px;
  min-height: 720px;
  font-family:  Microsoft YaHei;
}
.user-info_top-container{
  height:40px;
  background-color: #E3ECF7;
  font-size: 18px;
  display: flex;
  justify-content: space-around;
  align-items:center;
}
.user-info_top-container>p{
  width:180px;
  margin-left:30px;
}

.user-info_top_info,
.user-info_list_info{
  width:300px !important ;
}
.user-info_list{
  // width: 1280px;
  font-size: 18px;
  background-color: white;
  border-bottom: 1px solid #F5F8FC;
  display: flex;
  justify-content: space-around;
  align-items:center;
}
.user-info_list>div{
  width:200px;
  margin-left:30px;
}
.user-info_operation>p{
  width:60px;
  color:#5090E5;
  display:inline-block;
}
.user-info_list div>p{
  height:10px;
}
.user-info_pages{
  position: fixed;
  right:0;
}
</style>
