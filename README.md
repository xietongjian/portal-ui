English | [简体中文](./README.zh-CN.md)

# 门户网站UI架构

### dva测试用例
http://www.mamicode.com/info-detail-2277803.html

### 参考网站
https://gitee.com/teambp/ScaffoldClient

### ant design Iframe
```js
<Tabs onChange={this.onChange} activeKey={this.getActiveKey()} type="editable-card" onEdit={this.onEdit}>
    {this.state.panes.map(pane => <TabPane tab={pane.title} key={pane.key}><iframe onLoad={this.onload} src={pane.url}></iframe></TabPane>)}
</Tabs>
```



### 后台管理系统参考
http://dva.sosout.com/form/basic-form
