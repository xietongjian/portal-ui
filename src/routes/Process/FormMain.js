import React, { Component, Fragment } from 'react';
import { routerRedux, Route, Switch } from 'dva/router';
import { connect } from 'dva';
import { Tabs, Button, Icon, Modal } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { getRoutes } from '../../utils/utils';
import {Form} from "antd/lib/index";

const openPanel = () => {

};

// const action = (
//   <Fragment >
//     <Button type="primary" ><Icon type="plus" />{this.state.sendBtnShow}发起流程</Button>
//     <Button type="primary" onClick={openPanel()} ><Icon type="plus" />测试添加</Button>
//   </Fragment>
// );
class Action extends Component{
  render(){
    const toSend = "/process/list/processModel";
    return (
      <Fragment >
        <div style={this.props.btnStyle} >
          <Button type="primary" href={toSend} >提交</Button>
          <Button type="primary" href={toSend} >保存草稿</Button>
          <Button type="primary" href={toSend} >取消</Button>
        </div>
      </Fragment>
    );
  }
};


class TitleBtn extends Component{
  render(){
    return (
      <Fragment >
        <Button icon="arrow-up" />
        <Button icon="link" />
        <Button icon="printer" />
        <Button icon="api" />
      </Fragment>
    );
  }
};

class TitleAction extends Component{
  render(){
    return (
      <Fragment >
        {this.props.title}
        <TitleBtn />
      </Fragment>
    );
  }
};

@connect(({ process, loading }) => ({
  process,
  loading: loading.models.process,
}))
export default class FormMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      style: {visibility:"visible"},
      formTitle:props.formTitle
    }
  }
  handleTabChange = key => {
    const { dispatch, match } = this.props;
    this.setState({style:{visibility:"visible"}});
    switch (key) {
      case 'formInfo':
        dispatch(routerRedux.push(`${match.url}/launch`));
        break;
      case 'approveInfo':
        dispatch(routerRedux.push(`${match.url}/ProcessLaunch`));
        break;
      default:
        break;
    }
  };
  changeFormTitle(title){
    this.setState({formTitle:title})
  }
  componentDidMount() {
    const { match, location , process} = this.props;

  }
  render() {
    const tabList = [
      {
        key: 'formInfo',
        tab: '申请信息',
      },
      {
        key: 'recordInfo',
        tab: '处理记录',
      },
    ];

    const { match, routerData, location, process } = this.props;
    const routes = getRoutes(match.path, routerData);
    return (
      <PageHeaderLayout
        title={<TitleAction title={process.formTitle} />}
        logo={
          <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />
        }
        action={<Action btnStyle={this.state.style} />}
        tabList={tabList}
        tabActiveKey={location.pathname.replace(`${match.path}/`, '')}
        onTabChange={this.handleTabChange}
      >
        <div>
          <Switch>
            {routes.map(item => (
              // <Route key={item.key} path={item.path} component={item.component} exact={item.exact} changeTitle={this.changeFormTitle}  />
              <Route key={item.key} path={item.path} component={item.component} exact={item.exact} changeTitle={this.changeFormTitle}  />

            ))}
          </Switch>
        </div>
      </PageHeaderLayout>
    );
  }
}
