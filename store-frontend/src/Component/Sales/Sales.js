
import React, {Component} from 'react';
import {AddSaleModal} from './AddSaleModal';
import { EditSaleModal } from './EditSaleModal';
import MaterialTable from 'material-table';

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


    deleteSale(sID){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API + 'sales/' + sID,{
                method:'DELETE',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
            .then(result => this.refreshTable());
        }
    }

    render(){
        const {sales, sID, cusName, stName, proName, saleDate} = this.state;
        let addModalClose = () => this.setState({addModalShow:false});
        let editModalClose = () => this.setState({editModalShow:false});
        const updateTable = () => this.refreshTable();
        const columns = [
            {title:'Customer name', field:'customer.name'},
            {title:'Store name', field:'store.name'},
            {title:'Product name', field:'product.name'},
            {title:'Sale date',field:'dateSold'}

        ];

        return(
            <>
            <button className="btn-addModal" onClick={()=>this.setState({addModalShow:true})} >Add Sale</button>

            <MaterialTable columns={columns} data={sales} 
            actions={[
                {
                    icon: 'edit',
                    tooltip: 'Edit Sales',
                    onClick: (event, rowData) => this.setState({editModalShow:true, sID:rowData.id,
                                    cusName:rowData.customer.name,
                                    stName:rowData.store.name,
                                    proName:rowData.product.name,
                                    saleDate:rowData.dateSold})
                },
                {
                    icon: 'delete',
                    tooltip: "Delete Sales",
                    onClick: (event, rowData) => this.deleteSale(rowData.id)
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
                                    cusName:sale.customer.name,
                                    stName:sale.store.name,
                                    proName:sale.product.name,
                                    saleDate:sale.dateSold})}>
                                        Edit
                                    </button>
                                    

                                    <button className="btn-delete" onClick={() => this.deleteSale(sale.id)}>Delete</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div> */}

            {this.state.addModalShow && <AddSaleModal onHide={addModalClose} updateData={updateTable} />}
            {this.state.editModalShow && <EditSaleModal onHide={editModalClose} updateData={updateTable} sID={sID} cusName={cusName} stName={stName} proName={proName} saleDate={saleDate} />}
            
            </>
        )
    }
}
