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
  {
    title: '管理',
    icon: 'el-icon-location',
    children: [
      {
        title: '用户管理',
        path: '/userManage',
      },
      {
        title: '项目权限管理',
        path: '/authorityManage',
      },
      {
        title: '角色管理',
        path: '/roleManage',
      },
    ],
  },
  {
    title: '数据分析',
    icon: 'el-icon-location',
    children: [
      {
        title: '课程评价',
        path: '/courseEvaluation',
      },
    ],
  },
];
