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
    icon: 'el-icon-setting',
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
    icon: 'el-icon-picture-outline-round',
    children: [
      {
        title: '课程评价',
        path: '/courseEvaluation',
      },
    ],
  },
];

// 用户优惠券状态
export const USER_COUPON_STATUSES = {
  UN_USED: {
    name: '未使用',
    value: 0,
  },
  USED: {
    name: '已使用',
    value: 1,
  },
  EXPIRED: {
    name: '已过期',
    value: -1,
  },
};

// 获取优惠券状态名称
export function getCouponStatusName(status) {
  const keys = Object.keys(USER_COUPON_STATUSES);

  for (let i = 0; i < keys.length; i += 1) {
    if (USER_COUPON_STATUSES[keys[i]].value === status) {
      return USER_COUPON_STATUSES[keys[i]].name;
    }
  }
  return null;
}
