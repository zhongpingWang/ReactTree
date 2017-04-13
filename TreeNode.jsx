import React,{Component} from 'react';  
import {Icon,Checkbox} from 'antd' 
import cs from 'classnames'

export default class TreeTableItem extends Component {

  constructor(props) { 
    super(props);    
  }   

  //展开收起
  expandFn(){ 

    this.props.expandChild(this.props.data.fileId,!this.props.data.expand,!this.props.data.children);
  } 

  componentWillReceiveProps(nextProps,prevProps) {
       
  } 

  _onChange(e){ 
  
    var checked="checked";
    if (this.props.data.checked=="checked") {
      checked="unChecked";
    }

    this.props.onChange(this.props.data.fileId,checked);
  }


  //渲染
  render() {

    let {nodeIndex,data}=this.props,

        expand=data.expand, 

        style={paddingLeft: nodeIndex==0 && 10 || nodeIndex * 15},  

        classname=cs({
          treeUl:true,
          hide:!expand
        }),

        childern=data.children,

        expendCs=cs({
            visibilityHide:!data.folder
        }); 
     
    return ( 
    	<li key={data.fileId} className="item" data-fileId={data.fileId}>
          <div className="treeTr"> 
           
              <div className="gap" style={style}></div>
              <div className="fileTd">
                <Icon className={expendCs} type={expand  &&  "caret-down" || "caret-right" } onClick={this.expandFn.bind(this,data)} /> 
                <Checkbox onChange={this._onChange.bind(this)} className="myCk"   indeterminate={data.checked=="indeterminate"} checked={data.checked=="checked"} />  
                <span className="fileName">{data.name}</span>
              </div>
            </div> 
           <ul className={classname} key={data.fileId}> 
              { childern &&  childern.map((item)=>{ 
                 return (<TreeTableItem key={item.fileId} onChange={this.props.onChange} expandChild={this.props.expandChild} checked={data.checked}    nodeIndex={parseInt(nodeIndex)+1} data={item} />) 
              })} 
            </ul>
      </li>
    );

  }
}