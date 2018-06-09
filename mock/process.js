import { parse } from 'url';

const titles = [
  'Alipay',
  'Angular',
  'Ant Design',
  'Ant Design Pro',
  'Bootstrap',
  'React',
  'Vue',
  'Webpack',
];
const avatars = [
  'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png', // Alipay
  'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png', // Angular
  'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png', // Ant Design
  'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png', // Ant Design Pro
  'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png', // Bootstrap
  'https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png', // React
  'https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png', // Vue
  'https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png', // Webpack
];

const avatars2 = [
  'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
  'https://gw.alipayobjects.com/zos/rmsportal/cnrhVkzwxjPwAaCfPbdc.png',
  'https://gw.alipayobjects.com/zos/rmsportal/gaOngJwsRYRaVAuXXcmB.png',
  'https://gw.alipayobjects.com/zos/rmsportal/ubnKSIfAJTxIgXOKlciN.png',
  'https://gw.alipayobjects.com/zos/rmsportal/WhxKECPNujWoWEFNdnJE.png',
  'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png',
  'https://gw.alipayobjects.com/zos/rmsportal/psOgztMplJMGpVEqfcgF.png',
  'https://gw.alipayobjects.com/zos/rmsportal/ZpBqSxLxVEXfcUNoPKrz.png',
  'https://gw.alipayobjects.com/zos/rmsportal/laiEnJdGHVOhJrUShBaJ.png',
  'https://gw.alipayobjects.com/zos/rmsportal/UrQsqscbKEpNuJcvBZBu.png',
];

const covers = [
  'https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png',
  'https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png',
  'https://gw.alipayobjects.com/zos/rmsportal/uVZonEtjWwmUZPBQfycs.png',
  'https://gw.alipayobjects.com/zos/rmsportal/gLaIAoVWTtLbBWZNYEMg.png',
];
const desc = [
  '那是一种内在的东西， 他们到达不了，也无法触及的',
  '希望是一个好东西，也许是最好的，好东西是不会消亡的',
  '生命就像一盒巧克力，结果往往出人意料',
  '城镇中有那么多的酒馆，她却偏偏走进了我的酒馆',
  '那时候我只会想自己想要什么，从不想自己拥有什么',
];

const user = [
  '付小小',
  '曲丽丽',
  '林东东',
  '周星星',
  '吴加好',
  '朱偏右',
  '鱼酱',
  '乐哥',
  '谭小仪',
  '仲尼',
];

export function fakeList(count) {
  const list = [];
  for (let i = 0; i < count; i += 1) {
    list.push({
      id: `fake-list-${i}`,
      owner: user[i % 10],
      title: titles[i % 8],
      avatar: avatars[i % 8],
      cover: parseInt(i / 4, 10) % 2 === 0 ? covers[i % 4] : covers[3 - i % 4],
      status: ['active', 'exception', 'normal'][i % 3],
      percent: Math.ceil(Math.random() * 50) + 50,
      logo: avatars[i % 8],
      href: 'https://ant.design',
      updatedAt: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * i),
      createdAt: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * i),
      subDescription: desc[i % 5],
      description:
        '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。',
      activeUser: Math.ceil(Math.random() * 100000) + 100000,
      newUser: Math.ceil(Math.random() * 1000) + 1000,
      star: Math.ceil(Math.random() * 100) + 100,
      like: Math.ceil(Math.random() * 100) + 100,
      message: Math.ceil(Math.random() * 10) + 10,
      content:
        '段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。',
      members: [
        {
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png',
          name: '曲丽丽',
        },
        {
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png',
          name: '王昭君',
        },
        {
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png',
          name: '董娜娜',
        },
      ],
    });
  }

  return list;
}

export function getFakeList(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = parse(url, true).query;

  const count = params.count * 1 || 20;

  const result = fakeList(count);

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}

export const getNotice = [
  {
    id: 'xxx1',
    title: titles[0],
    logo: avatars[0],
    description: '那是一种内在的东西，他们到达不了，也无法触及的',
    updatedAt: new Date(),
    member: '科学搬砖组',
    href: '',
    memberLink: '',
  },
  {
    id: 'xxx2',
    title: titles[1],
    logo: avatars[1],
    description: '希望是一个好东西，也许是最好的，好东西是不会消亡的',
    updatedAt: new Date('2017-07-24'),
    member: '全组都是吴彦祖',
    href: '',
    memberLink: '',
  },
  {
    id: 'xxx3',
    title: titles[2],
    logo: avatars[2],
    description: '城镇中有那么多的酒馆，她却偏偏走进了我的酒馆',
    updatedAt: new Date(),
    member: '中二少女团',
    href: '',
    memberLink: '',
  },
  {
    id: 'xxx4',
    title: titles[3],
    logo: avatars[3],
    description: '那时候我只会想自己想要什么，从不想自己拥有什么',
    updatedAt: new Date('2017-07-23'),
    member: '程序员日常',
    href: '',
    memberLink: '',
  },
  {
    id: 'xxx5',
    title: titles[4],
    logo: avatars[4],
    description: '凛冬将至',
    updatedAt: new Date('2017-07-23'),
    member: '高逼格设计天团',
    href: '',
    memberLink: '',
  },
  {
    id: 'xxx6',
    title: titles[5],
    logo: avatars[5],
    description: '生命就像一盒巧克力，结果往往出人意料',
    updatedAt: new Date('2017-07-23'),
    member: '骗你来学计算机',
    href: '',
    memberLink: '',
  },
];

export const getActivities = [
  {
    id: 'trend-1',
    updatedAt: new Date(),
    user: {
      name: '曲丽丽',
      avatar: avatars2[0],
    },
    group: {
      name: '高逼格设计天团',
      link: 'http://github.com/',
    },
    project: {
      name: '六月迭代',
      link: 'http://github.com/',
    },
    template: '在 @{group} 新建项目 @{project}',
  },
  {
    id: 'trend-2',
    updatedAt: new Date(),
    user: {
      name: '付小小',
      avatar: avatars2[1],
    },
    group: {
      name: '高逼格设计天团',
      link: 'http://github.com/',
    },
    project: {
      name: '六月迭代',
      link: 'http://github.com/',
    },
    template: '在 @{group} 新建项目 @{project}',
  },
  {
    id: 'trend-3',
    updatedAt: new Date(),
    user: {
      name: '林东东',
      avatar: avatars2[2],
    },
    group: {
      name: '中二少女团',
      link: 'http://github.com/',
    },
    project: {
      name: '六月迭代',
      link: 'http://github.com/',
    },
    template: '在 @{group} 新建项目 @{project}',
  },
  {
    id: 'trend-4',
    updatedAt: new Date(),
    user: {
      name: '周星星',
      avatar: avatars2[4],
    },
    project: {
      name: '5 月日常迭代',
      link: 'http://github.com/',
    },
    template: '将 @{project} 更新至已发布状态',
  },
  {
    id: 'trend-5',
    updatedAt: new Date(),
    user: {
      name: '朱偏右',
      avatar: avatars2[3],
    },
    project: {
      name: '工程效能',
      link: 'http://github.com/',
    },
    comment: {
      name: '留言',
      link: 'http://github.com/',
    },
    template: '在 @{project} 发布了 @{comment}',
  },
  {
    id: 'trend-6',
    updatedAt: new Date(),
    user: {
      name: '乐哥',
      avatar: avatars2[5],
    },
    group: {
      name: '程序员日常',
      link: 'http://github.com/',
    },
    project: {
      name: '品牌迭代',
      link: 'http://github.com/',
    },
    template: '在 @{group} 新建项目 @{project}',
  },
];

export const getAllProducts = [
  { name: 'dva', id: 1 },
  { name: 'antd', id: 2 },
];

export const getAllSystems = {code:1, datas:[
  { name: '所有', id: '' },
  { name: '权限系统', id: 'qxxt' },
  { name: '考勤系统', id: 'kqxt' },
  { name: '费用报销系统', id: 'fybxxt' },
  { name: '资产系统', id: 'zcxt' },
  { name: '人员主数据系统', id: 'ryzsj' },
  { name: 'PMS', id: 'pms' },
  { name: '流程中心', id: 'oa' },
]};

export function ajaxListApprovingTask(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = parse(url, true).query;

  let dataSource = [...getAlreadySend];

  if (params.sorter) {
    const s = params.sorter.split('_');
    dataSource = dataSource.sort((prev, next) => {
      if (s[1] === 'descend') {
        return next[s[0]] - prev[s[0]];
      }
      return prev[s[0]] - next[s[0]];
    });
  }

  if (params.status) {
    const status = params.status.split(',');
    let filterDataSource = [];
    status.forEach(s => {
      filterDataSource = filterDataSource.concat(
        [...dataSource].filter(data => parseInt(data.status, 10) === parseInt(s[0], 10))
      );
    });
    dataSource = filterDataSource;
  }

  if (params.no) {
    dataSource = dataSource.filter(data => data.no.indexOf(params.no) > -1);
  }

  let pageSize = 10;
  if (params.rows) {
    pageSize = params.rows * 1;
  }

  const result = {
    list: dataSource,
    pagination: {
      total: dataSource.length,
      pageSize,
      current: parseInt(params.page, 10) || 1,
    },
  };

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}


export const getAlreadySend = [{"processInstanceId":"8e828d11505611e89944005056baf411","processDefinitionId":"ems_expense_client_flow:2:542a3eee49d011e8b862005056badac4","processDefinitionName":"费用报销单","processDefinitionKey":"ems_expense_client_flow","processDefinitionType":2,"businessKey":"EBXD201805030002","systemSn":"ems","startedUserId":"00004845","finishFlag":false,"processType":"终止","fromName":"差旅报销单-EBXD201805030002","startPersonName":"谢桐见","startTime":"2018-05-05 19:22:12","endTime":"2018-05-20 10:27:37","systemName":"EMS系统","businessUrl":"/portal/form/expAccountPub/input.jhtml","totalTime":"14天15小时","currentAssignees":"","currentAssigneeNos":""},{"processInstanceId":"1fa0e09f4e7f11e8814a005056baf411","processDefinitionId":"GFHR0009:18:d71b99404dcb11e8adbf005056badac4","processDefinitionName":"人事证明申请流程","processDefinitionKey":"GFHR0009","processDefinitionType":5,"businessKey":"GFHR0009A0245","systemSn":"oa","startedUserId":"00004845","finishFlag":false,"processType":"终止","fromName":"人事证明申请流程-GFHR0009A0245","startPersonName":"谢桐见","startTime":"2018-05-03 11:07:33","endTime":"2018-05-20 10:27:34","systemName":"流程中心","totalTime":"16天23小时","currentAssignees":"","currentAssigneeNos":""},{"processInstanceId":"fba52dea4df611e8814a005056baf411","processDefinitionId":"GFHR0008:18:df4e29d74dae11e8adbf005056badac4","processDefinitionName":"福利补贴申请流程","processDefinitionKey":"GFHR0008","processDefinitionType":5,"businessKey":"GFHR0008A0086","systemSn":"oa","startedUserId":"00004845","finishFlag":false,"processType":"终止","fromName":"福利补贴申请流程-GFHR0008A0086","startPersonName":"谢桐见","startTime":"2018-05-02 18:53:01","endTime":"2018-05-19 13:42:02","systemName":"流程中心","totalTime":"16天18小时","currentAssignees":"","currentAssigneeNos":""},{"processInstanceId":"952dc3794ddf11e8814a005056baf411","processDefinitionId":"GFHR0007:17:007e0844479c11e8a3d9005056badac4","processDefinitionName":"离职证明申请流程","processDefinitionKey":"GFHR0007","processDefinitionType":5,"businessKey":"GFHR0007A0362","systemSn":"oa","startedUserId":"00004845","finishFlag":false,"processType":"终止","fromName":"离职证明申请流程-GFHR0007A0362","startPersonName":"谢桐见","startTime":"2018-05-02 16:05:31","endTime":"2018-05-19 13:42:00","systemName":"流程中心","totalTime":"16天21小时","currentAssignees":"","currentAssigneeNos":""},{"processInstanceId":"4a4db8cf4dca11e8814a005056baf411","processDefinitionId":"GFHR0009:16:1be09d1c486211e8a3d9005056badac4","processDefinitionName":"人事证明申请流程","processDefinitionKey":"GFHR0009","processDefinitionType":5,"businessKey":"GFHR0009A0231","systemSn":"oa","startedUserId":"00004845","finishFlag":false,"processType":"终止","fromName":"人事证明申请流程-GFHR0009A0231","startPersonName":"谢桐见","startTime":"2018-05-02 13:33:06","endTime":"2018-05-19 13:41:53","systemName":"流程中心","totalTime":"17天0小时","currentAssignees":"","currentAssigneeNos":""},{"processInstanceId":"95a0e9844a8011e8814a005056baf411","processDefinitionId":"GFHR0009:16:1be09d1c486211e8a3d9005056badac4","processDefinitionName":"人事证明申请流程","processDefinitionKey":"GFHR0009","processDefinitionType":5,"businessKey":"GFHR0009A0230","systemSn":"oa","startedUserId":"00004845","finishFlag":false,"processType":"终止","fromName":"人事证明申请流程-GFHR0009A0230","startPersonName":"谢桐见","startTime":"2018-04-28 09:07:56","endTime":"2018-05-19 13:41:57","systemName":"流程中心","totalTime":"21天4小时","currentAssignees":"","currentAssigneeNos":""},{"processInstanceId":"5cb97f6d4a8011e8814a005056baf411","processDefinitionId":"GFHR0007:17:007e0844479c11e8a3d9005056badac4","processDefinitionName":"离职证明申请流程","processDefinitionKey":"GFHR0007","processDefinitionType":5,"businessKey":"GFHR0007A0347","systemSn":"oa","startedUserId":"00004845","finishFlag":false,"processType":"终止","fromName":"离职证明申请流程-GFHR0007A0347","startPersonName":"谢桐见","startTime":"2018-04-28 09:06:20","endTime":"2018-05-19 13:45:57","systemName":"流程中心","totalTime":"21天4小时","currentAssignees":"","currentAssigneeNos":""},{"processInstanceId":"abc454aa443b11e8b1a1005056baf411","processDefinitionId":"ysportal_news_notice:7:f7d4257a30a611e8b8e4005056badac4","processDefinitionName":"发文申请流程","processDefinitionKey":"ysportal_news_notice","processDefinitionType":2,"businessKey":"XWGG201801310002","systemSn":"ys_portal","startedUserId":"00004845","finishFlag":false,"processType":"终止","fromName":"发文申请流程-XWGG201801310002","startPersonName":"谢桐见","startTime":"2018-04-20 09:39:31","endTime":"2018-04-26 19:41:59","systemName":"XXXX门户","businessUrl":"/portal/form/newsNotice/input.jhtml","totalTime":"6天10小时","currentAssignees":"","currentAssigneeNos":""},{"processInstanceId":"7034a10f443611e8b1a1005056baf411","processDefinitionId":"GFHR0007:15:95b9699f43c311e8a3d9005056badac4","processDefinitionName":"离职证明申请流程","processDefinitionKey":"GFHR0007","processDefinitionType":5,"businessKey":"GFHR0007A0298","systemSn":"oa","startedUserId":"00004845","finishFlag":false,"processType":"终止","fromName":"离职证明申请流程-GFHR0007A0298","startPersonName":"谢桐见","startTime":"2018-04-20 09:02:03","endTime":"2018-04-20 09:03:27","systemName":"流程中心","totalTime":"1分钟24秒","currentAssignees":"","currentAssigneeNos":""},{"processInstanceId":"cee0df803efa11e88dc4005056baf411","processDefinitionId":"GFHR0003:13:c491330837ad11e8be28005056badac4","processDefinitionName":"加班申请流程","processDefinitionKey":"GFHR0003","processDefinitionType":1,"businessKey":"GFHR0003A1709","systemSn":"oa","startedUserId":"00004845","finishFlag":false,"processType":"办结","fromName":"加班申请流程-GFHR0003A1709","startPersonName":"谢桐见","startTime":"2018-04-13 17:12:36","endTime":"2018-04-16 12:06:48","systemName":"流程中心","totalTime":"2天18小时","currentAssignees":"","currentAssigneeNos":""},{"processInstanceId":"bad2295c33c111e894b0005056baf411","processDefinitionId":"GFHR0004:26:c55eed820ecc11e8a087005056badac4","processDefinitionName":"请假/调休申请流程","processDefinitionKey":"GFHR0004","processDefinitionType":1,"businessKey":"GFHR0004A4005","systemSn":"oa","startedUserId":"00004845","finishFlag":false,"processType":"办结","fromName":"请假/调休申请流程-GFHR0004A4005","startPersonName":"谢桐见","startTime":"2018-03-30 10:26:19","endTime":"2018-03-30 19:08:38","systemName":"流程中心","totalTime":"0天8小时","currentAssignees":"","currentAssigneeNos":""},{"processInstanceId":"57c1e0a7325611e894b0005056baf411","processDefinitionId":"GFHR0004:26:c55eed820ecc11e8a087005056badac4","processDefinitionName":"请假/调休申请流程","processDefinitionKey":"GFHR0004","processDefinitionType":1,"businessKey":"GFHR0004A3981","systemSn":"oa","startedUserId":"00004845","finishFlag":false,"processType":"办结","fromName":"请假/调休申请流程-GFHR0004A3981","startPersonName":"谢桐见","startTime":"2018-03-28 15:05:05","endTime":"2018-03-29 12:27:25","systemName":"流程中心","totalTime":"0天21小时","currentAssignees":"","currentAssigneeNos":""},{"processInstanceId":"574ad65f2db611e894b0005056baf411","processDefinitionId":"GFIT0011:45:d9298ede2ccc11e8b600005056badac4","processDefinitionName":"IT相关申请流程","processDefinitionKey":"GFIT0011","processDefinitionType":1,"businessKey":"GFIT0011A0082","systemSn":"oa","startedUserId":"00004845","finishFlag":false,"processType":"终止","fromName":"IT相关申请流程-GFIT0011A0082","startPersonName":"谢桐见","startTime":"2018-03-22 17:49:40","endTime":"2018-03-26 08:36:35","systemName":"流程中心","totalTime":"3天14小时","currentAssignees":"","currentAssigneeNos":""},{"processInstanceId":"2156c0662b3311e8ab15005056baf411","processDefinitionId":"GFHR0003:11:d178764a0ecc11e8a087005056badac4","processDefinitionName":"加班申请流程","processDefinitionKey":"GFHR0003","processDefinitionType":1,"businessKey":"GFHR0003A1416","systemSn":"oa","startedUserId":"00004845","finishFlag":false,"processType":"办结","fromName":"加班申请流程-GFHR0003A1416","startPersonName":"谢桐见","startTime":"2018-03-19 13:05:23","endTime":"2018-03-20 14:19:02","systemName":"流程中心","totalTime":"1天1小时","currentAssignees":"","currentAssigneeNos":""},{"processInstanceId":"36b99b99258d11e8a1a7005056baf411","processDefinitionId":"GFHR0003:11:d178764a0ecc11e8a087005056badac4","processDefinitionName":"加班申请流程","processDefinitionKey":"GFHR0003","processDefinitionType":1,"businessKey":"GFHR0003A1267","systemSn":"oa","startedUserId":"00004845","finishFlag":false,"processType":"办结","fromName":"加班申请流程-GFHR0003A1267","startPersonName":"谢桐见","startTime":"2018-03-12 08:35:07","endTime":"2018-03-15 09:33:30","systemName":"流程中心","totalTime":"3天0小时","currentAssignees":"","currentAssigneeNos":""}];

export default {
  getNotice,
  getActivities,
  getFakeList,
  getAlreadySend,
  getAllProducts,
  getAllSystems,
};












export function getAllAlreadySend(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = parse(url, true).query;

  let dataSource = [...getAlreadySend];

  if (params.sorter) {
    const s = params.sorter.split('_');
    dataSource = dataSource.sort((prev, next) => {
      if (s[1] === 'descend') {
        return next[s[0]] - prev[s[0]];
      }
      return prev[s[0]] - next[s[0]];
    });
  }

  if (params.status) {
    const status = params.status.split(',');
    let filterDataSource = [];
    status.forEach(s => {
      filterDataSource = filterDataSource.concat(
        [...dataSource].filter(data => parseInt(data.status, 10) === parseInt(s[0], 10))
      );
    });
    dataSource = filterDataSource;
  }

  if (params.no) {
    dataSource = dataSource.filter(data => data.no.indexOf(params.no) > -1);
  }

  let pageSize = 10;
  if (params.rows) {
    pageSize = params.rows * 1;
  }

  const result = {
    list: dataSource,
    pagination: {
      total: dataSource.length,
      pageSize,
      current: parseInt(params.page, 10) || 1,
    },
  };

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}
