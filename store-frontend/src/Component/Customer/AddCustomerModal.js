import React, { Component } from 'react';


export class AddCustomerModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e){
        e.preventDefault();
        fetch(process.env.REACT_APP_API + 'customers',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                name:e.target.name.value,
                address: e.target.address.value
            })
        })
        .then(res => res.json())
        .then(result => {
            console.log(result);
            this.props.updateData();
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
                        <input type="text" 
                        required
                        name='name'
                        />

                        <label >Address:</label>
                        <textarea 
                        required
                        name='address'
                        >
                        </textarea>

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
