
import React, {Component} from 'react';
import {AddCustomerModal} from './AddCustomerModal';
import { EditCustomerModal } from './EditCustomerModal';


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

    componentDidUpdate(){
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
        }
    }

    render(){
        const {customers, cusID, cusName, cusAddress} = this.state;
        let addModalClose = () => this.setState({addModalShow:false})
        let editModalClose = () => this.setState({editModalShow:false})

        return(
            <>
            <button className="btn-addModal" onClick={()=>this.setState({addModalShow:true})} >Add Customers</button>
            {this.state.addModalShow && <AddCustomerModal onHide={addModalClose} />}

            <div className="tbl-content">
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
            </div>
            {this.state.editModalShow && <EditCustomerModal onHide={editModalClose} cusID={cusID} cusName={cusName} cusAddress={cusAddress}/>}
            </>
        )
    }
}
