import React, {Component} from 'react';
import {AddProductModal} from './AddProductModal';
import { EditProductModal } from './EditProductModal';
import MaterialTable from 'material-table';

export class Product extends Component{
    constructor(props){
        super(props);
        this.state = {products:[], addModalShow:false, editModalShow:false}
    }

    refreshTable(){
        fetch(process.env.REACT_APP_API + 'products')
        .then(res => res.json())
        .then(data => {
            this.setState({products:data});
        });
    }

    componentDidMount(){
        this.refreshTable();
    }


    deleteProduct(proID){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API + 'Products/' + proID,{
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
        const {products, proID, proName, proPrice} = this.state;
        let addModalClose = () => this.setState({addModalShow:false});
        let editModalClose = () => this.setState({editModalShow:false});
        const updateTable = () => this.refreshTable();
        const columns = [
            {title:'Name', field:'name'},
            {title:'Price', field:'price'},
        ]

        return(
            <>
            <button className="btn-addModal" onClick={()=>this.setState({addModalShow:true})} >Add Products</button>

            <MaterialTable columns={columns} data={products} 
            actions={[
                {
                    icon: 'edit',
                    tooltip: 'Edit Product',
                    onClick: (event, rowData) => this.setState({editModalShow:true, proID:rowData.productID, proName:rowData.name, proPrice:rowData.price})
                },
                {
                    icon: 'delete',
                    tooltip: "Delete Product",
                    onClick: (event, rowData) => this.deleteProduct(rowData.productID)
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
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.productID}>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>
                                <div className="btn-container">
                                    <button className="btn-edit" onClick={() => this.setState({editModalShow:true, proID:product.productID, proName:product.name, proPrice:product.price})}>
                                        Edit
                                    </button>
                                    

                                    <button className="btn-delete" onClick={() => this.deleteProduct(product.productID)}>Delete</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div> */}

            {this.state.addModalShow && <AddProductModal onHide={addModalClose} updateData={updateTable}/>}
            {this.state.editModalShow && <EditProductModal onHide={editModalClose} proID={proID} proName={proName} proPrice={proPrice} updateData={updateTable}/>}
            
            </>
        )
    }
}
