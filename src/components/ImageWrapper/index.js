import React from 'react';
import styles from './index.less';    // 按照 CSS Modules 的方式引入样式文件。
import ImageBox from './ImageBox';


export default ({ src, desc, style }) => (
  <div style={style} className={styles.imageWrapper}>
    <ImageBox src={src} value="这是初始化值"/>
    {desc && <div className={styles.desc}>{desc}</div>}
    </div>
);
