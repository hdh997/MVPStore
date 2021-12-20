import React, { Component } from 'react';


export class EditCustomerModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleSubmit(e){
        e.preventDefault();
        fetch(process.env.REACT_APP_API + 'Customers/' + e.target.customerID.value,{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            mode:'cors',
            body:JSON.stringify({
                customerID:e.target.customerID.value,
                name:e.target.name.value,
                address: e.target.address.value
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
                    <h3 className='heading'>Update customer details</h3>
                </div>
                <div className='modal-content'>
                    <form onSubmit={this.handleSubmit}>
                        <input type="hidden" 
                        defaultValue={this.props.cusID}
                        disabled
                        name='customerID'
                        
                        />

                        <label> Customer name:</label>
                        <input type="text" 
                        required
                        defaultValue={this.props.cusName}
                        name='name'
                        />

                        <label >Address:</label>
                        <textarea 
                        required
                        defaultValue={this.props.cusAddress}
                        name='address'
                        >
                        </textarea>

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
