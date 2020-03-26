// 错误类型
export const errorCodeType = {
  // 未登录
  USER_NOT_LOGIN: 3,
};

// 用户角色
export const userRole = {
  // 管理员
  ADMIN: 1,
  // 普通用户
  COMMON: 2,
};

// 菜单列表
export const menuList = [
  { title: '用户管理', path: '/userManage', icon: 'el-icon-location' },
  {
    title: '数据统计',
    icon: 'el-icon-location',
    children: [
      {
        title: '课程进度',
        path: '/courseProgress',
      },
    ],
  },
];
