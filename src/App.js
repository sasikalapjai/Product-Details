import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'antd/dist/antd.less';
import { Form, Input } from 'antd';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import TableData from './TableData';
const { TextArea } = Input;

const customStyle = {
 textAlign: 'left',
 display: 'block'
}

const tableStyle = {
  border: '1px solid #900'
}
 
const inputStyle = {
   width: "80%"
}

const leftDiv = {
  width: "60%",
  float: "left",
  marginLeft: "10px",
  marginTop: "10px"
}

const rightDiv = {
  width: "30%",
  float: "right",
  marginTop: "45px",
  marginLeft: "5px"
}
 class App extends Component {
 constructor(props) {
 super(props);
 this.state = {
   isDisabled: false,
   name: "",
   shopName: "",
   status: "",
   shopValues: {},
   taskList: []
 }
 }
 
  componentDidMount() {
   this.fetchList();
  }
  
  fetchList(name) {
    axios.get('http://localhost:4000/task/')
      .then(res => {
        this.setState({
          taskList: res.data
        });
      })
     .catch((error) => {
        console.log(error);
     })
  }
  
  
  handleName(e) {
  console.log("test");
    this.setState({name: e.target.value});
  }
  
  handleShopName(e) {
    this.setState({shopName: e.target.value});
  }
  
  handleStatus(e) {
    this.setState({status: e.target.value});
  }
  
  handleSubmit(e) {
    const {name, shopName, status, shopValues} = this.state;
    const value = {name, shopName, status};
    axios.post('http://localhost:4000/task/create-task', value)
      .then((res) => {
        this.fetchList("");
        this.setState({status: "", name: "", shopName: ""});
        console.log(res.data)
        console.log('Student successfully updated')
      }).catch((error) => {
        console.log(error)
      })
  }
  
  filterSearch(e) {
    this.fetchList(e.target.value);
  }
  
  onClickRow = (row) => {
    this.setState({
      status: row.status,
      name:row.name,
      shopName: row.shopName,
      isDisabled: true
    });
  }
  
  DataTable() {
    return this.state.taskList.map((res, i) => {
      return <TableData obj={res} key={i} handleClick={this.onClickRow} />;
    });
  }
 
 render() {
 const { isDisabled, taskList, name, status, shopName } = this.state;
 return (
   <div>
     <div style={rightDiv}>
         <form onSubmit={e => this.handleSubmit(e)}>
            <div className="form-group">
              <label style={customStyle}>Name:  </label>
              <input 
                 type="text" 
                 className="form-control" 
                 disabled={isDisabled} 
                 style={inputStyle}
                 value={name}
                 onChange={e => this.handleName(e)}
              />
            </div>
            <div className="form-group">
               <label style={customStyle}>Shop Name: </label>
               <input 
                 type="text" 
                 className="form-control"
                 style={inputStyle}
                 value={shopName}
                 onChange={e => this.handleShopName(e)}
               />
            </div>
            <div className="form-group">
               <label style={customStyle}>Status: </label>
               <TextArea
                 rows={4} 
                 style={inputStyle}
                 value={status}
                 onChange={e => this.handleStatus(e)}
               />
            </div>
            <div className="form-group">
               <input 
                 type="submit"
                 value="Submit" 
                 className="btn btn-primary"
                 style={customStyle}
                 onSubmit={e => this.handleSubmit(e)}
               />
            </div>
         </form>
         </div>
            <div style={leftDiv}>
            <Input 
              placeholder="Search" 
              style={{ float: "right" }}
              onChange={e => this.filterSearch(e)}
            />
            <table className="table table-striped" style={{ marginTop: 40 }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {this.DataTable()}
            </tbody>
          </table>
       </div>
    </div>
  );
 }
 }

export default App;
