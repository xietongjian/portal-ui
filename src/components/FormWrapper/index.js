import React from 'react';
import { Button, notification, Card } from 'antd';
import styles from './index.less';

export default class FormBox extends React.Component{

  constructor(props) {
    super(props);
    this.state = {iframeHeight:'500px'};
  }

  setIframeHeight (iframe) {
    if (iframe) {
      var iframeWin = iframe.target.contentWindow || iframe.target.contentDocument.parentWindow;
      try{
        if (iframeWin.document.body) {
          const height = iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight;
          debugger;
          this.setState({iframeHeight: height});
        }
      }catch(e){
        console.error('跨域请求，加载出错！');
      }
    }
  }
  render() {
    console.log(this.state.iframeHeight+"======================================");
    return (
      <div>
        <iframe src={this.props.src} style={{height:this.state.iframeHeight}} className={styles.formContentBox} onLoad={this.setIframeHeight}></iframe>
      </div>
    );
  }
}

