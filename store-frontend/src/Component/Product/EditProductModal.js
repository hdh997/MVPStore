import React, { Component } from 'react';


export class EditProductModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleSubmit(e){
        e.preventDefault();
        fetch(process.env.REACT_APP_API + 'Products/' + e.target.productID.value,{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            mode:'cors',
            body:JSON.stringify({
                productID:e.target.productID.value,
                name:e.target.name.value,
                price: e.target.price.value
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

    render(){
        return(
            <>
            <div className='modal' {...this.props}>
            <div className='modal-bg' onClick={this.props.onHide} />
            <div className='modal-wrapper'>
                <div className='modal-body'>
                    <div className='modal-header'>
                    <h3 className='heading'>Update product details</h3>
                </div>
                <div className='modal-content'>
                    <form onSubmit={this.handleSubmit}>
                        <input type="hidden" 
                        defaultValue={this.props.proID}
                        disabled
                        name='productID'
                        />

                        <label> Customer name:</label>
                        <input type="text" 
                        required
                        defaultValue={this.props.proName}
                        name='name'
                        />

                        <label >Price:</label>
                        <input 
                        required
                        defaultValue={this.props.proPrice}
                        name='price'
                        />
                        

                        <div className='modal-action'>
                            <div className='action-container'>
                                <button className='modal-save-btn'>Update</button>
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
