
import React, {Component} from 'react';
import {AddCustomerModal} from './AddCustomerModal';
import { EditCustomerModal } from './EditCustomerModal';
import MaterialTable from 'material-table';


export class Customer extends Component{
    constructor(props){
        super(props);
        this.state = {customers:[], addModalShow:false, editModalShow:false}
    }

    refreshTable(){
        fetch(process.env.REACT_APP_API + 'customers')
        .then(res => res.json())
        .then(data => {
            this.setState({customers:data});
        });
    }

    componentDidMount(){
        this.refreshTable();
    }

    deleteCustomer(cusID){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API + 'Customers/' + cusID,{
                method:'DELETE',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
            .then(result => this.refreshTable())
        }
    }

    render(){
        const {customers, cusID, cusName, cusAddress} = this.state;
        const columns = [
            {title:'Name', field:'name'},
            {title:'Address', field:'address'},
        ];

        let addModalClose = () => this.setState({addModalShow:false});
        let editModalClose = () => this.setState({editModalShow:false});
        const updateTable = () => this.refreshTable();

        return(
            <>
            <button className="btn-addModal" onClick={()=>this.setState({addModalShow:true})} >Add Customers</button>

            <MaterialTable columns={columns} data={customers} 
            actions={[
                {
                    icon: 'edit',
                    tooltip: 'Edit Customer',
                    onClick: (event, rowData) => this.setState({editModalShow:true, cusID:rowData.customerID, cusName:rowData.name, cusAddress:rowData.address})
                },
                {
                    icon: 'delete',
                    tooltip: "Delete Customer",
                    onClick: (event, rowData) => this.deleteCustomer(rowData.customerID)
                }
            ]}
            options={{
                    actionsColumnIndex:-1,
                    headerStyle: {
                    zIndex: 0
                    }
                }}
            />
            {/* <div className="tbl-content">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map(customer => (
                        <tr key={customer.customerID}>
                            <td>{customer.name}</td>
                            <td>{customer.address}</td>
                            <td>
                                <div className="btn-container">
                                    <button className="btn-edit" onClick={() => this.setState({editModalShow:true, cusID:customer.customerID, cusName:customer.name, cusAddress:customer.address})}>
                                        Edit
                                    </button>
                                    

                                    <button className="btn-delete" onClick={() => this.deleteCustomer(customer.customerID)}>Delete</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div> */}

            {this.state.addModalShow && <AddCustomerModal onHide={addModalClose} updateData={updateTable} />}
            {this.state.editModalShow && <EditCustomerModal onHide={editModalClose} updateData={updateTable} cusID={cusID} cusName={cusName} cusAddress={cusAddress}/>}
            </>
        )
    }
}
