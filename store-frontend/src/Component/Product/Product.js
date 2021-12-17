// import React, { useState, useContext } from 'react'
// import CustomerTbl from './CustomerTable'
// import useFetch from '../useFetch';
import React, {Component} from 'react';
import {AddProductModal} from './AddProductModal';
import { EditProductModal } from './EditProductModal';


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

    componentDidUpdate(){
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
        }
    }

    render(){
        const {products, proID, proName, proPrice} = this.state;
        let addModalClose = () => this.setState({addModalShow:false})
        let editModalClose = () => this.setState({editModalShow:false})
        

        return(
            <>
            <button className="btn-addModal" onClick={()=>this.setState({addModalShow:true})} >Add Products</button>
            {this.state.addModalShow && <AddProductModal onHide={addModalClose} />}

            <div className="tbl-content">
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
            </div>
            {this.state.editModalShow && <EditProductModal onHide={editModalClose} proID={proID} proName={proName} proPrice={proPrice}/>}
            
            </>
        )
    }
}
