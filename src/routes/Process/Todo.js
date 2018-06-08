import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
  Row,
  Col,
  Card,
  Alert,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Dropdown,
  Menu,
  InputNumber,
  DatePicker,
  Modal,
  message,
  Badge,
  Divider,
} from 'antd';
import ProcessTable from 'components/StandardTable/ProcessTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from '../List/TableList.less';
const Search = Input.Search;
const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
const statusMap = ['default', 'processing', 'success', 'error', 'warning'];
const status = ['关闭', '运行中', '已上线', '异常'];

const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleAdd, handleModalVisible } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };
  return (
    <Modal
      title="新建规则"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="描述">
        {form.getFieldDecorator('desc', {
          rules: [{ required: true, message: 'Please input some description...' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
    </Modal>
  );
});
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const dateLayout =  {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

@connect(({process, loading }) => ({
  process,
  loading: loading.models.process,
}))
class AdvancedSearchForm extends React.Component {
  state = {
    expand: false,
  };
  componentDidMount(){
    const { dispatch } = this.props;

    dispatch({
      type: 'process/fetchAllSystems',
    });
  }

  handleSearch = (e) => {
    e.preventDefault();
    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'process/fetchApprovingTasks',
        payload: values,
      });
    });
  }

  handleReset = () => {
    this.props.form.resetFields();
  }

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    const userNameError = isFieldTouched('userName') && getFieldError('userName');
    const passwordError = isFieldTouched('password') && getFieldError('password');
    const RangePicker = DatePicker.RangePicker;

    const { process:{systems}, loading } = this.props;

    const systemOpts = systems.map(system => <Option key={system.sn?system.sn:'all'}>{system.name}</Option>);


    return (
      <Form
        className="ant-advanced-search-form"
        onSubmit={this.handleSearch}
      >
        <Row gutter={24}>
          <Col span={7} >
            <FormItem {...dateLayout} label="提交日期">
              {getFieldDecorator(`date`, {
                initialValue:'',
                rules: [{
                  required: false
                }],
              })(
                <RangePicker
                  ranges={{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }}
                />
              )}
            </FormItem>
          </Col>
          <Col span={5} >
            <FormItem {...formItemLayout} label="所属系统">
              {getFieldDecorator(`systemSn`, {
                rules: [{
                  required: false,
                  message: '请选择系统!',
                }],
              })(
                <Select  placeholder="请选择系统" style={{ width: 120 }} >
                  {systemOpts}
                </Select>

              )}
            </FormItem>
          </Col>
          <Col span={6} >
            <FormItem {...formItemLayout} label="">
              {getFieldDecorator(`formName`, {
                initialValue:'',
                rules: [{
                  required: false,
                }],
              })(
                <Search
                  placeholder="标题/发起人"
                  onSearch={value => console.log(value)}
                  style={{ width: 200 }}
                />
              )}
            </FormItem>
          </Col>
          <Col span={6} >
            <FormItem {...formItemLayout} label="">
              <Button type="primary" htmlType="submit" onClick={this.handleSearch}>查询</Button><Button style={{ marginLeft: 8 }} onClick={this.handleReset}> 重置 </Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  }
}


const WrappedAdvancedSearchForm = Form.create()(AdvancedSearchForm);

@connect(({ process, loading }) => ({
  process,
  loading: loading.models.process,
}))
export default class TableList extends PureComponent {
  state = {
    modalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
  };

  componentDidMount() {
    const { dispatch, process } = this.props;

    dispatch({
      type: 'process/fetchApprovingTasks',
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {

    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      page: pagination.current,
      rows: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'process/fetchApprovingTasks',
      payload: params,
    });
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'process/fetchApprovingTasks',
      payload: {},
    });
  };

  toggleForm = () => {
    this.setState({
      expandForm: !this.state.expandForm,
    });
  };

  handleMenuClick = e => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;

    if (!selectedRows) return;

    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'rule/remove',
          payload: {
            no: selectedRows.map(row => row.no).join(','),
          },
          callback: () => {
            this.setState({
              selectedRows: [],
            });
          },
        });
        break;
      default:
        break;
    }
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleSearch = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'process/fetchApprovingTasks',
        payload: values,
      });
    });
  };

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleAdd = fields => {
    this.props.dispatch({
      type: 'rule/add',
      payload: {
        description: fields.desc,
      },
    });

    message.success('添加成功');
    this.setState({
      modalVisible: false,
    });
  };

  renderSimpleForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="规则编号">
              {getFieldDecorator('no')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="使用状态">
              {getFieldDecorator('status')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                展开 <Icon type="down" />
              </a>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderAdvancedForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="规则编号">
              {getFieldDecorator('no')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="使用状态">
              {getFieldDecorator('status')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="调用次数">
              {getFieldDecorator('number')(<InputNumber style={{ width: '100%' }} />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="更新日期">
              {getFieldDecorator('date')(
                <DatePicker style={{ width: '100%' }} placeholder="请输入更新日期" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="使用状态">
              {getFieldDecorator('status3')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="使用状态">
              {getFieldDecorator('status4')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <div style={{ overflow: 'hidden' }}>
          <span style={{ float: 'right', marginBottom: 24 }}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
              重置
            </Button>
            <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
              收起 <Icon type="up" />
            </a>
          </span>
        </div>
      </Form>
    );
  }

  renderForm() {
    return this.state.expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  formatterName(val, row, index){
    var ZC = "1",ZH="2",BH="3",ZY="4",BSP = "5",XT="6",PS="7";
    var UNKNOW = -1, ZDYBD=1, YWXTMH=2, YWXTYW=3,XTLC=4,ZDYBDYW=5;
    var basePath = "http://test.domain.com";

    var preMsg="";
    if(row.processType!="" && row.processType!="审批中"){
      preMsg="【"+row.processType+"】";
    }
    var html = <a target="_blank" href="'+basePath+'/portal/flow/flowFormSp.jhtml?processInstanceId='+row.processInstanceId+'&taskId='+row.taskId+'&type='+row.type+'&businessKey='+row.businessKey+'&businessUrl='+row.businessUrl+'">{preMsg+val}</a>;
    if(row.taskType==ZH || row.taskType==ZY){//如果是知会和转阅跳转查看页面
      html = <a target="_blank" href="'+basePath+'/portal/process/view.jhtml?'+(row.businessUrl==undefined?'':('url='+row.businessUrl+'&'))+'bizId='+row.businessKey+'&processInstId='+row.processInstanceId+'&taskId='+row.taskId+'&taskType='+row.taskType+'">+preMsg+val+</a>;
    }else if(row.taskType==BSP){
      html = <span style="cursor:pointer;color: #0E65AF;" onclick="flowCenter.approvingTask.info()" >{val}</span>;
    }else{
      if(row.processDefinitionType==YWXTMH){
        if(row.taskType==BH){
          html = <a target="_blank" href="'+basePath+'/portal/process/launch.jhtml?url='+row.businessUrl+'&bizId='+row.businessKey+'&processInstId='+row.processInstanceId+'&taskId='+row.taskId+'">{preMsg+val}</a>;
        }else{
          html = <a target="_blank" href="'+basePath+'/portal/process/approve.jhtml?url='+row.businessUrl+'&bizId='+row.businessKey+'&processInstId='+row.processInstanceId+'&taskId='+row.taskId+'">{preMsg+val}</a>;
        }
      }else if(row.processDefinitionType==YWXTYW){
        if(row.taskType==BH){
          html = <span style="cursor:pointer;color: #0E65AF;" onclick="flowCenter.approvingTask.info()" >{preMsg+val}</span>;
        }else{
          html = <a target="_blank" href="'+basePath+'/portal/process/approve.jhtml?url='+row.businessUrl+'&bizId='+row.businessKey+'&processInstId='+row.processInstanceId+'&taskId='+row.taskId+'">{preMsg+val}</a>;
        }
      }else if(row.processDefinitionType==ZDYBD||row.processDefinitionType==ZDYBDYW){
        if(row.taskType==BH){
          html = <a target="_blank" href="'+basePath+'/portal/process/launch.jhtml?modelKey='+row.processDefinitionKey+'&bizId='+row.businessKey+'&processInstId='+row.processInstanceId+'&taskId='+row.taskId+'">{preMsg+val}</a>;
        }else{
          html = <a target="_blank" href="'+basePath+'/portal/process/approve.jhtml?bizId='+row.businessKey+'&processInstId='+row.processInstanceId+'&taskId='+row.taskId+'">{preMsg+val}</a>;
        }
      }
    }
    return html;
  }

  delayTime(val, record, index) {
    let html = '';
    let level = 0;
    if(val < 24){
      html =  val +'小时';
      level = 1;
    }else if( val >=24 && val<=99){
      html = (Math.floor(val/24) + "天" + (val%24) + "小时" );
      level = 4;
    }else{
      html = (Math.floor(val/24) + "天" + (val%24) + "小时" );
      level = 3;
    }
    return <Badge status={statusMap[level]} text={html} />;
  }

  render() {
    const { process: { data }, loading } = this.props;
    const { selectedRows, modalVisible } = this.state;
    const columns = [
      {
        title: '序号',
        dataIndex: 'num',
        key: 'processInstanceId',
        render:(text, r , i) =>(<span>{i+1}</span>),
      },
      {
        title: '状态',
        dataIndex: 'processType',
        key: 'processType',
        render(val, record) {
          return val + record.taskType;
        },
      },
      {
        title: '停留时间',
        dataIndex: 'stayHour',
        key: 'stayHour',
        render: this.delayTime,
      },
      {
        title: '流程标题',
        dataIndex: 'fromName',
        key: 'fromName',
        render :this.formatterName
      },
      {
        title: '提交人',
        dataIndex: 'creator',
        key: 'creator',
      },
      {
        title: '提交时间',
        sorter: true,
        dataIndex: 'createTime',
        key: 'createTime',
      },
      {
        title: '总耗时',
        dataIndex: 'totalTime',
        key: 'totalTime',
      },
      {
        title: '所属系统',
        dataIndex: 'systemName',
        key: 'systemName'
      },
    ];
    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };

    return (
      <Fragment>
        <Card bordered={false}>
          <WrappedAdvancedSearchForm />
          <ProcessTable
            rowKey="taskId"
            loading={loading}
            data={data}
            columns={columns}
            onChange={this.handleStandardTableChange}
          />
        </Card>
        <CreateForm {...parentMethods} modalVisible={modalVisible} />
      </Fragment>
    );
  }
}
