import React, { Component, Fragment } from 'react';
import { routerRedux, Route, Switch } from 'dva/router';
import { connect } from 'dva';
import { Tabs, Button, Icon, Modal, Card } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { getRoutes } from '../../utils/utils';
import styles from './FormMain.less';
import FormWrapper from '../../components/FormWrapper';

const openPanel = () => {

};

class Action extends Component{
  render(){
    const toSend = "http://www.baidu.com";
    return (
      <Fragment >
        <div style={this.props.btnStyle} >
          <Button type="primary" href={toSend} target="_blank"><Icon type="plus" />发起流程</Button>
          <Button type="primary" onClick={openPanel()} ><Icon type="plus" />测试添加</Button>
        </div>
      </Fragment>
    );
  }
};


@connect()
export default class ProcessLaunch extends Component {
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
    console.log(decodeURIComponent(this.props.match.params.data));
    console.log(this.props.match.params + '###########');

    const { match, location } = this.props;
    if(location.pathname.replace(`${match.path}/`, '') === "processModel"){
      this.setState({style:{visibility:"hidden"}});
    }else{
      this.setState({style:{visibility:"visible"}});
    }
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
      <Fragment>
        <Card bordered={false}>
          aaaaaaaaaaaaaaaaa
        </Card>
        <Card style={{marginTop:'10px', padding:'0px'}} bordered={false}>
          <FormWrapper src="http://www.baidu.com" />
        </Card>
      </Fragment>
    );
  }
}
