//npm
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TreeNode from './TreeNode' 
import { Checkbox } from 'antd'; 
import "antd/dist/antd.less"
import "./less/index.less"
window.$=require("jquery");
	

let data=[{
	name:"全部文件",fileId:1,
	folder:true,
	children:[{
		name:"建筑",fileId:2,
		folder:true,
		children:[{
			folder:false,
			name:"们",
			fileId:4
			
		},{
			folder:true,
			name:"偶",
			fileId:7,
			show:false,
			expand:false,
			checked:"unChecked"			 
		}]
	},{
		name:"楼层",fileId:3,
		folder:false	 
	}]
}]

let TreeRoot = React.createClass({

	getInitialState() {

		var data=this.props.data;

		this.commData(data); 

		return {
			data:data
		} 
	},


	commData(items){

		let that=this;

		$.each(items,function(i,item){

			var children=item.children; 
			item.show=false;
			item.expand=false;
			item.checked="unChecked"; 
			if (children && children.length>0) {
				that.commData(children);
			} 

		}); 
	}, 

	expandChild(fileId,status,isFetch){

		let data=this.state.data; 

		this.loopChild(data,"expand",status,fileId,true); 

		isFetch &&  this.fetchChild(data,fileId);

		this.setState({data:data}); 

	},  

	fetchChild(items,fileId,parent){

		var isFined=false,
			that=this;

		$.each(items,function(i,item){

			if (item.fileId==fileId) {

				var children={
					folder:false,
					name:"偶",
					fileId:9,
					show:false,
					expand:false,
					checked:"unChecked"		
				};

				if (parent.checked=="checked") {
					children.checked="checked";
				}

				item.children=[children];

				isFined=true;

				if (isFined) {
					return false;
				}
			}else{
				var children=item.children;
				if (children && children.length>0) {
					return that.fetchChild(children,fileId,item);
				}
			}


		});

		return isFined;
	},



	loopChild(items,key,status,fileId,isNotSetChildren){
		 
		var isFind=false,
			that=this;

		$.each(items,function(i,item){
			 
			if (isFind && isNotSetChildren) {
				return false;
			}

			if (item.fileId==fileId || !isNotSetChildren) {
				item[key]=status;
				isFind=true;
				if (isNotSetChildren) {
					return false;
				} 
			}

			var children=item.children;
			if (children &&　children.length>0) {
				that.loopChild(children,key,status,fileId,isNotSetChildren);
			} 
		}); 
		if (isNotSetChildren) {
			return isFind;
		}

	},

	_onChange(fileId,checked){ 
		 

		let data=this.state.data,
		 	 currentData=this.findDataByFileId(data,fileId); 
	 
		this.loopChild([currentData],"checked",checked,fileId,false); 
		 
		//父级改变状态
		this.loopParent(data,fileId,checked);

		this.setState({data:data});
		 
	},



	findDataByFileId(items,fileId){

		var data=false,
			that=this;

		$.each(items,function(i,item){
			 
			if (data) {
				return data;
			}

			if (item.fileId==fileId) {
				data=item; 
				return false;
			}

			var children=item.children;

			if (children &&　children.length>0) {
				data = that.findDataByFileId(children,fileId);
			} 

		});  
		 
		return data;
		
	},


	loopParent(items,fileId,checked){
		
		var isFind=false,
			that=this; 

		$.each(items,function(i,item){ 

			
			if (item.fileId==fileId) { 
				isFind=true;
				return false;
			}

			var children=item.children;
			if (children &&　children.length>0) {
				isFind = that.loopParent(children,fileId);
			}  

			if (isFind) {
			 
				let Counts={allCount:0,selCount:0};
				that.loopChildSelCount(item.children,Counts); 
				if (Counts.selCount==0) {
					item.checked="unChecked";
				}else if(Counts.selCount==Counts.allCount){
					item.checked="checked";
				}else{
					item.checked="indeterminate";
				} 
			 
				return false;
			} 

		});  
		 
		return isFind;
	},


	loopChildSelCount(items,Counts){

		let that=this;

		$.each(items,function(i,item){

			Counts.allCount+=1; 
			if (item.checked=="checked") {
				Counts.selCount+=1;
			} 

			var children=item.children;
			if (children &&　children.length>0) {
				 that.loopChildSelCount(children,Counts);
			}  

		});

		return Counts;

	},



	render(){

	  let {data}=this.state;  

	    var item= data.length>0 && data.map((item)=>{ 
	        return (<TreeNode onChange={this._onChange} expandChild={this.expandChild} key={item.fileId} nodeIndex="0" data={item} /> ) 
	    }); 

	    return ( 
	    	<ul  className="rootTreeUl">
	        	{item} 
	       </ul>
	    );
	}

});



ReactDOM.render(<TreeRoot data={data} />,document.getElementById("app"));