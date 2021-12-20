import React, { Component } from 'react';

export class EditSaleModal extends Component{
    constructor(props){
        super(props);
        this.state={
            customers:[],
            stores:[],
            products:[],
            onChangeOpt:false
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
        fetch(process.env.REACT_APP_API + 'sales/' + e.target.saleID.value,{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            mode:'cors',
            body:JSON.stringify({
                id:e.target.saleID.value,
                dateSold:e.target.saleDate.value,
                customerID:e.target.customer.value,
                storeID: e.target.store.value,
                productID:e.target.product.value
            })
        })
        // .then(res => res.json())
        .then(result => {
            this.props.updateData();
            this.props.onHide();
        },
        (error) =>{
            console.log(error);
            
        })
    }

    onChangeOpt(){
        return
    } 

    render(){
        return(
            <>
            <div className='modal' {...this.props}>
            <div className='modal-bg' onClick={this.props.onHide} />
            <div className='modal-wrapper'>
                <div className='modal-body'>
                    <div className='modal-header'>
                    <h3 className='heading'>Update customer details</h3>
                </div>
                <div className='modal-content'>
                    <form onSubmit={this.handleSubmit}>
                        <input type="hidden" 
                        defaultValue={this.props.sID}
                        disabled
                        name='saleID'
                        />

                        <label >Sale date:</label>
                        <input 
                        type="date"
                        defaultValue={this.props.saleDate}
                        onChange={()=>this.setState({onChangeOpt:true})}
                        required
                        name='saleDate'
                        />

                        <label> Customer name:</label>
                        <select name='customer' defaultValue={this.props.cusName} onChange={()=>this.setState({onChangeOpt:true})}>
                            {this.state.customers.map(customer =>
                                <option value={customer.customerID}>{customer.name}</option>
                            )}
                        </select>
                        
                        <label> Store name:</label>
                        <select name='store' defaultValue={this.props.stName} onChange={()=>this.setState({onChangeOpt:true})}>
                            {this.state.stores.map(store =>
                                <option value={store.storeID}>{store.name}</option>
                            )}
                        </select>

                        <label> Product name:</label>
                        <select name='product' defaultValue={this.props.proName} onChange={()=>this.setState({onChangeOpt:true})}>
                            {this.state.products.map(product =>
                                <option value={product.productID}>{product.name}</option>
                            )}
                        </select>

                        <div className='modal-action'>
                            <div className='action-container'>
                                
                                {this.state.onChangeOpt && <button className='modal-save-btn'>Update</button>}
                                <button className='modal-cancel-btn' onClick={this.props.onHide}>Cancel</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </div>
        </>
        )
    }
}
