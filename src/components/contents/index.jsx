import React from 'react'
import DataSantri from './dataSantri'
import PageNotFound from './page404'

const Contents = (props) => {
   return ( 
      <div className="container-fluid"> 
      { props.dataSantri ? 
            <DataSantri 
            value             = {props.value}
            searchedSantri    = {props.searchedSantri}
            newDataSantri     = {props.newDataSantri}
            onHandleUpdate    = {props.onHandleUpdate}
            postDataSantri    = {props.postDataSantri}
            onHandleInput     = {props.onHandleInput}
            dataSantri        = {props.dataSantri}
            onHandleDelete    = {props.onHandleDelete}
            dataUpdate        = {props.dataUpdate}
            simpanDataSantri  = {props.simpanDataSantri}
            />
            : <PageNotFound/>
      }
      </div>
   )
}

export default Contents