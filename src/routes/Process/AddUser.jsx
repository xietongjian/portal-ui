import React from 'react';
import {Form,Input,Button,Select,Modal} from 'antd'
const FormItem = Form.Item;
const Option = Select.Option;

class  AddUser extends React.Component{//在es6中定义一个AddUser类
  constructor(props){//构造函数
    super(props);
    this.state = {
      visible:false
    };
    this.handleAdd = this.handleAdd.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOk = this.handleOk.bind(this)
    this.handleClear = this.handleClear.bind(this)
  }
  handleAdd() {
    this.setState({
      visible: true
    });
  }
  handleSubmit(e){//提交表单
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err,values)=>{
      if(!err){
        //console.log('接收的值：',values);
        this.setState({
          visible:false
        })
        this.props.form.resetFields();//清空提交的表单
        //当值传递到父元素后，通过回调函数触发appendPerson方法将参数values带到父元素
        this.props.callback(values);
      }
    })
  }

  handleClear(){
    this.props.form.resetFields();
  }

  handleOk() {
    this.setState({
      visible: false
    });
  }
  render(){

    const {getFieldDecorator} = this.props.form;
    const formItemLayout = {
      labelCol:{span : 6},
      wrapperCol:{span: 14}
    };
    const tailFormItemLayout = {
      wrapperCol: {
        span: 14,
        offset: 8
      }
    };
    return(
      <div>
        <Button type="primary" onClick={this.handleAdd}>添加用户</Button>
        <Modal title="新建用户" visible={this.state.visible} onCancel={this.handleOk} onOk={this.handleOk}>
          <Form onSubmit={this.handleSubmit}>
            <FormItem {...formItemLayout} label = "用户名"  hasFeedback>
              {getFieldDecorator('name', {
                rules:[{
                  required:true,message:'请输入您的 name！'
                }]
              })(
                <Input placeholder="请输入您的用户名！"/>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="性别" hasFeedback>
              {getFieldDecorator('gender',{
                rules:[{
                  required:true,message:'请输入您的 gender！'
                }]
              })(
                <Select placeholder="请选择您的性别">
                  <Option value="男">男</Option>
                  <Option value="女">女</Option>
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="年龄" hasFeedback>
              {getFieldDecorator('age',{
                rules:[{required:true,message:'请选择您的 Age'
                }]
              })(
                <Select placeholder="请选择你您的年龄">
                  <Option value="26">26</Option>
                  <Option value="27">27</Option>
                  <Option value="28">28</Option>
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="就读学校" hasFeedback>
              {getFieldDecorator('schoolname',{
                rules:[{required:true,message:'请输入您的就读学校'}]
              })(
                <Input placeholder="请输入您的就读学校！"/>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="在校表现" hasFeedback>
              {getFieldDecorator('description',{
                rules:[{required:true,message:'请输入您的在校表现'}]
              })(
                <Input type="textarea" rows={3} placeholder="请输入您的在校表现!"/>
              )}
            </FormItem>
            <FormItem {...tailFormItemLayout} style={{padding:10}}>
              <Button type="primary" htmlType="submit" size="large">提交</Button>
              <Button type="primary" size="large" onClick={this.handleClear}>重置</Button>
            </FormItem>
          </Form>
        </Modal>
      </div>
    )
  }
}
AddUser = Form.create()(AddUser); //解决了getFieldDecorator无法定义;

export default AddUser;
