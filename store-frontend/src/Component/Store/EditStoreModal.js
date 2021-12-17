import React, { Component } from 'react';


export class EditStoreModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleSubmit(e){
        e.preventDefault();
        fetch(process.env.REACT_APP_API + 'stores/' + e.target.storeID.value,{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            mode:'cors',
            body:JSON.stringify({
                storeID:e.target.storeID.value,
                name:e.target.name.value,
                address: e.target.address.value
            })
        })
        // .then(res => res.json())
        .then(result => {
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
                    <h3 className='heading'>Update store details</h3>
                </div>
                <div className='modal-content'>
                    <form onSubmit={this.handleSubmit}>
                        <input type="hidden" 
                        defaultValue={this.props.stID}
                        disabled
                        name='storeID'
                        
                        />

                        <label> Customer name:</label>
                        <input type="text" 
                        required
                        defaultValue={this.props.stName}
                        name='name'
                        />

                        <label >Address:</label>
                        <textarea 
                        required
                        defaultValue={this.props.stAddress}
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
