import React, { Component, Fragment } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Form,
  Alert, Card, Select, List, Tag, Icon,Input, Avatar, Row, Col, Button, Badge, Table,  DatePicker, } from 'antd';

import TagSelect from 'components/TagSelect';
import StandardFormRow from 'components/StandardFormRow';
import styles from '../List/Articles.less';

const { Option } = Select;
const FormItem = Form.Item;
const Search = Input.Search;
const pageSize = 5;

const onClose = function (e) {
  console.log(e, 'I was closed.');
};
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
class AdvancedSearchForm extends React.Component {
  state = {
    expand: false,
  };

  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
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
                  required: false,
                  message: 'Input something!',
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
              {getFieldDecorator(`system`, {
                rules: [{
                  required: false,
                  message: 'Input something!',
                }],
              })(
                <Select  placeholder="请选择系统" style={{ width: 120 }} >
                  <Option value="">全部</Option>
                  <Option value="jack">权限系统</Option>
                  <Option value="lucy">考勤系统</Option>
                  <Option value="disabled">MDM</Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>

              )}
            </FormItem>
          </Col>
          <Col span={6} >
            <FormItem {...formItemLayout} label="">
              {getFieldDecorator(`keyword`, {
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
              <Button type="primary" htmlType="submit">查询</Button><Button style={{ marginLeft: 8 }} onClick={this.handleReset}> 重置 </Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  }
}


const WrappedAdvancedSearchForm = Form.create()(AdvancedSearchForm);

@Form.create()
@connect(({ process, loading }) => ({
  process,
  loading: loading.models.process,
}))
export default class SearchList extends Component {
  componentDidMount() {
    this.fetchMore();
  }

  setOwner = () => {
    const { form } = this.props;
    form.setFieldsValue({
      owner: ['wzj'],
    });
  };

  fetchMore = () => {
    this.props.dispatch({
      type: 'process/appendFetch',
      payload: {
        count: pageSize,
      },
    });
  };

  render() {
    const { form, process: { process }, loading } = this.props;
    const { getFieldDecorator } = form;
    const owners = [
      {
        id: 'wzj',
        name: '我自己',
      },
      {
        id: 'wjh',
        name: '吴家豪',
      },
      {
        id: 'zxx',
        name: '周星星',
      },
      {
        id: 'zly',
        name: '赵丽颖',
      },
      {
        id: 'ym',
        name: '姚明',
      },
    ];

    const IconText = ({ type, text }) => (
      <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
      </span>
    );

    const ListContent = ({ data: { content, updatedAt, avatar, owner, href } }) => (
      <div className={styles.listContent}>
        <div className={styles.description}>{content}</div>
        <div className={styles.extra}>
          <Avatar src={avatar} size="small" />
          <a href={href}>{owner}</a> 发布在 <a href={href}>{href}</a>
          <em>{moment(updatedAt).format('YYYY-MM-DD HH:mm')}</em>
        </div>
      </div>
    );

    const formItemLayout = {
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 },
        md: { span: 12 },
      },
    };
    const loadMore =
      process.length > 0 ? (
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <Button onClick={this.fetchMore} style={{ paddingLeft: 48, paddingRight: 48 }}>
            {loading ? (
              <span>
                <Icon type="loading" /> 加载中...
              </span>
            ) : (
              '加载更多'
            )}
          </Button>
        </div>
      ) : null;


    const columns = [
      {
        title: '序号',
        dataIndex: 'num',
        key: 'num',
        render:(text, r , i) =>(<span>{i+1}</span>),
      },
      {
        title: '状态',
        dataIndex: 'processType',
        key: 'processType',
      },
      {
        title: '停留时间',
        dataIndex: 'waitTime',
        key: 'waitTime',
        render: this.opoverContent,
      },
      {
        title: '流程标题',
        dataIndex: 'fromName',
        key: 'fromName',
      },
      {
        title: '提交人',
        dataIndex: 'startPersonName',
        key: 'startPersonName',
      },
      {
        title: '提交时间',
        dataIndex: 'startTime',
        key: 'startTime',
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
      {
        title: '操作时间',
        dataIndex: 'endTime',
        key: 'endTime',
      },
      {
        title: '备注',
        dataIndex: 'memo',
        key: 'memo',
      },
    ];

    return (
      <Fragment>
        <Card bordered={false}>
          <WrappedAdvancedSearchForm />
          <Alert message="共筛选450条符合条件的事项。" type="info" style={{ margin: '0 0 10px' }} showIcon onClose={onClose} closable />
          <Table
            //pagination={pagination}
            loading={loading}
            dataSource={process}
            columns={columns}
          />
        </Card>
      </Fragment>
    );
  }
}
