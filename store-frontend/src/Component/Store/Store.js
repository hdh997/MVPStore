
import React, {Component} from 'react';
import {AddStoreModal} from './AddStoreModal';
import { EditStoreModal } from './EditStoreModal';
import MaterialTable from 'material-table';


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


    deleteStore(stID){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API + 'stores/' + stID,{
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
        const {stores, stID, stName, stAddress} = this.state;
        let addModalClose = () => this.setState({addModalShow:false});
        let editModalClose = () => this.setState({editModalShow:false});
        const updateTable = () => this.refreshTable();
        const columns = [
            {title:'Name', field:'name'},
            {title:'Address', field:'address'},
        ]

        return(
            <>
            <button className="btn-addModal" onClick={()=>this.setState({addModalShow:true})} >Add Stores</button>

            <MaterialTable columns={columns} data={stores} 
            actions={[
                {
                    icon: 'edit',
                    tooltip: 'Edit Store',
                    onClick: (event, rowData) => this.setState({editModalShow:true, stID:rowData.storeID, stName:rowData.name, stAddress:rowData.address})
                },
                {
                    icon: 'delete',
                    tooltip: "Delete Store",
                    onClick: (event, rowData) => this.deleteStore(rowData.storeID)
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
            </div> */}

            {this.state.addModalShow && <AddStoreModal onHide={addModalClose} updateData={updateTable} />}
            {this.state.editModalShow && <EditStoreModal onHide={editModalClose} updateData={updateTable} stID={stID} stName={stName} stAddress={stAddress}/>}
            </>
        )
    }
}
