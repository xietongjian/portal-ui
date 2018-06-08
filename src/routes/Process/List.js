import React, { Component, Fragment } from 'react';
import { routerRedux, Route, Switch } from 'dva/router';
import { Link } from 'react-router';
import { connect } from 'dva';
import { Tabs, Button, Icon, Modal } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { getRoutes } from '../../utils/utils';

const openPanel = () => {

};

// const action = (
//   <Fragment >
//     <Button type="primary" ><Icon type="plus" />{this.state.sendBtnShow}发起流程</Button>
//     <Button type="primary" onClick={openPanel()} ><Icon type="plus" />测试添加</Button>
//   </Fragment>
// );
class Action extends React.PureComponent{
  render(){
    const toSend = "/process/list/processModel";
    return (
      <Fragment >
        <div style={this.props.btnStyle} >
          <Button  type="primary" href={toSend} ><Icon type="plus" />发起流程</Button>
        </div>
      </Fragment>
    );
  }
};


@connect()
export default class ProcessList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      style: {visibility:"visible"}
    }
  }
  handleTabChange = key => {
    const { dispatch, match } = this.props;
    this.setState({style:{visibility:"visible"}});
    switch (key) {
      case 'todo':
        dispatch(routerRedux.push(`${match.url}/todo`));
        break;
      case 'alreadyDo':
        dispatch(routerRedux.push(`${match.url}/alreadyDo`));
        break;
      case 'alreadySend':
        dispatch(routerRedux.push(`${match.url}/alreadySend`));
        break;
      case 'draft':
        dispatch(routerRedux.push(`${match.url}/draft`));
        break;
      case 'processModel':
        this.setState({style:{visibility:"hidden"}});
        dispatch(routerRedux.push(`${match.url}/processModel`));
        break;
      default:
        break;
    }
  };
  componentDidMount() {
    const { match, location, dispatch } = this.props;
    if(location.pathname.replace(`${match.path}/`, '') === "processModel"){
      this.setState({style:{visibility:"hidden"}});
    }else{
      this.setState({style:{visibility:"visible"}});
    }

    dispatch({
      type: 'process/getProcessEnums',
    });
  }
  // 设置发起按钮显示隐藏

  render() {

    const tabList = [
      {
        key: 'todo',
        tab: '待办',
      },
      {

        key: 'alreadyDo',
        tab: '已办',
      },
      {
        key: 'alreadySend',
        tab: '已发',
      },
      {
        key: 'draft',
        tab: '草稿',
      },
      {
        key: 'processModel',
        tab: '流程模板',
      },
    ];

    const { match, routerData, location } = this.props;
    const routes = getRoutes(match.path, routerData);
    return (
      <PageHeaderLayout
        title="流程中心"
        action={<Action btnStyle={this.state.style} />}
        tabList={tabList}
        tabActiveKey={location.pathname.replace(`${match.path}/`, '')}
        onTabChange={this.handleTabChange}
      >
        <div>
          <Switch>
            {routes.map(item => (
              <Route key={item.key} path={item.path} component={item.component} exact={item.exact} />
            ))}
          </Switch>
        </div>
      </PageHeaderLayout>
    );
  }
}
