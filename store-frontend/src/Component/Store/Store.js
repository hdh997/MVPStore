
import React, {Component} from 'react';
import {AddStoreModal} from './AddStoreModal';
import { EditStoreModal } from './EditStoreModal';


export class Store extends Component{
    constructor(props){
        super(props);
        this.state = {stores:[], addModalShow:false, editModalShow:false}
    }

    refreshTable(){
        fetch(process.env.REACT_APP_API + 'stores')
        .then(res => res.json())
        .then(data => {
            this.setState({stores:data});
        });
    }

    componentDidMount(){
        this.refreshTable();
    }

    componentDidUpdate(){
        this.refreshTable();
    }

    deleteStore(stID){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API + 'stores/' + stID,{
                method:'DELETE',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
        }
    }

    render(){
        const {stores, stID, stName, stAddress} = this.state;
        let addModalClose = () => this.setState({addModalShow:false})
        let editModalClose = () => this.setState({editModalShow:false})

        return(
            <>
            <button className="btn-addModal" onClick={()=>this.setState({addModalShow:true})} >Add Stores</button>
            {this.state.addModalShow && <AddStoreModal onHide={addModalClose} />}

            <div className="tbl-content">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {stores.map(store => (
                        <tr key={store.storeID}>
                            <td>{store.name}</td>
                            <td>{store.address}</td>
                            <td>
                                <div className="btn-container">
                                    <button className="btn-edit" onClick={() => this.setState({editModalShow:true, stID:store.storeID, stName:store.name, stAddress:store.address})}>
                                        Edit
                                    </button>
                                    

                                    <button className="btn-delete" onClick={() => this.deleteStore(store.storeID)}>Delete</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
            {this.state.editModalShow && <EditStoreModal onHide={editModalClose} stID={stID} stName={stName} stAddress={stAddress}/>}
            </>
        )
    }
}
