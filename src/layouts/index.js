import styles from './index.css';
import DetailModal from '@/components/CommonModal';
import React, {Component} from 'react';
import { connect } from 'dva'
class BasicLayout extends Component {
  constructor(props) {
    super(props)
  }

  render() {

    return ([<div className={styles.normal}>
      {this.props.children}
    </div>,
      <div>
        {
          this.props.genModels.arrs
            ? this.props.genModels.arrs.map((item, i) => {
              return <div><DetailModal key={'model-' + i}  {...item}>

              </DetailModal></div>
            })

            : null
        }
      </div>]);

  }
}

export default connect(({genModels})=>({genModels}))(BasicLayout);

