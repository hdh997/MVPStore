import React, { Component } from 'react';
import moment from 'moment';

export class AddSaleModal extends Component{
    constructor(props){
        super(props);
        this.state={
            customers:[],
            stores:[],
            products:[],
            
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount(){
        Promise.all([

            fetch(process.env.REACT_APP_API + 'customers'),
            fetch(process.env.REACT_APP_API + 'stores'),
            fetch(process.env.REACT_APP_API + 'products')
            ])
            .then(([res1, res2, res3]) => {
                return Promise.all([res1.json(), res2.json(), res3.json()])
            })
            .then(([res1,res2,res3]) => {
                this.setState({customers:res1, stores:res2 ,products:res3});
            });
        
    }


    handleSubmit(e){
        e.preventDefault();
        fetch(process.env.REACT_APP_API + 'sales',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                customerID:e.target.customer.value,
                storeID: e.target.store.value,
                productID:e.target.product.value,
                dateSold:moment().format("DD-MM-YYYY hh:mm:ss")
            })
        })
        .then(res => res.json())
        .then(result => {
            console.log(result);
            this.props.onHide();
        },
        (error) =>{
            console.log('Failed to POST');
        })
    }

    render(){
        return(
            <div className='modal' {...this.props}>
            <div className='modal-bg' onClick={this.props.onHide} />
            <div className='modal-wrapper'>
                <div className='modal-body'>
                    <div className='modal-header'>
                    <h3 className='heading'>Add new customer</h3>
                </div>
                <div className='modal-content'>
                    <form onSubmit={this.handleSubmit}>
                        <label> Customer name:</label>
                        <select name='customer'>
                            {this.state.customers.map(customer =>
                                <option value={customer.customerID}>{customer.name}</option>
                            )}
                        </select>
                        
                        <label> Store name:</label>
                        <select name='store'>
                            {this.state.stores.map(store =>
                                <option value={store.storeID}>{store.name}</option>
                            )}
                        </select>

                        <label> Product name:</label>
                        <select name='product'>
                            {this.state.products.map(product =>
                                <option value={product.productID}>{product.name}</option>
                            )}
                        </select>
                        
                        <div className='modal-action'>
                            <div className='action-container'>
                                <button className='modal-save-btn'>Save</button>
                                <button className='modal-cancel-btn' onClick={this.props.onHide}>Cancel</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </div>

        )
    }
}