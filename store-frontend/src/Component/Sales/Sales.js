
import React, {Component} from 'react';
import {AddSaleModal} from './AddSaleModal';
import { EditSaleModal } from './EditSaleModal';


export class Sales extends Component{
    constructor(props){
        super(props);
        this.state = {sales:[], addModalShow:false, editModalShow:false}
    }

    refreshTable(){
        fetch(process.env.REACT_APP_API + 'sales')
        .then(res => res.json())
        .then(data => {
            this.setState({sales:data});
        });
    }

    componentDidMount(){
        this.refreshTable();
    }

    componentDidUpdate(){
        this.refreshTable();
    }

    deleteSale(sID){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API + 'sales/' + sID,{
                method:'DELETE',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
        }
    }

    render(){
        const {sales, sID, cusID, cusName, stID, stName, proID, proName} = this.state;
        let addModalClose = () => this.setState({addModalShow:false})
        let editModalClose = () => this.setState({editModalShow:false})
        

        return(
            <>
            <button className="btn-addModal" onClick={()=>this.setState({addModalShow:true})} >Add Sale</button>
            {this.state.addModalShow && <AddSaleModal onHide={addModalClose} />}

            <div className="tbl-content">
            <table>
                <thead>
                    <tr>
                        <th>Customer Name</th>
                        <th>Store Name</th>
                        <th>Product Name</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sales.map(sale => (
                        <tr key={sale.id}>
                            <td>{sale.customer.name}</td>
                            <td>{sale.store.name}</td>
                            <td>{sale.product.name}</td>
                            <td>{sale.dateSold}</td>
                            <td>
                                <div className="btn-container">
                                    <button className="btn-edit"onClick={() => this.setState({editModalShow:true, sID:sale.id,
                                    cusID:sale.customer.customerID,
                                    cusName:sale.customer.name,
                                    stID:sale.store.storeID,
                                    stName:sale.store.name,
                                    proID:sale.product.productID,
                                    proName:sale.product.name})}>
                                        Edit
                                    </button>
                                    

                                    <button className="btn-delete" onClick={() => this.deleteSale(sale.id)}>Delete</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
            {this.state.editModalShow && <EditSaleModal onHide={editModalClose} sID={sID} cusID={cusID} cusName={cusName} stID={stID} stName={stName} proID={proID} proName={proName} />}
            
            </>
        )
    }
}
