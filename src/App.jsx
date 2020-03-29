import React, { Component } from 'react';
import Header from './components/header';
import Navbar from './components/navbar';
import Contents from './components/contents';
import axios from 'axios'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      // state for crud
        dataSantri    : [],
        newDataSantri : [],
        value         : '',
        postDataSantri : {
          name      : '',
          username  : ''
        },
        isUpdate : false,
        
        // State for pagination
        currentPage         : 1,
        dataSantriPerPage   : 5,
        dataSantriWithLimit : [],
        paginationNumbers   : []
    }
  }

  // fitur CRUD
  componentDidMount() {
    this.getDataSantri()
  }
  getDataSantri = () => {
    axios.get(`http://localhost:4000/posts?_sort=id&_order=desc`)
    .then((result) => {
        this.setState({
          dataSantri : result.data,
        }, () => {
          this.setPagination()
        })
    })
  }
  postDataSantri = () => {
    axios.post(`http://localhost:4000/posts `, this.state.postDataSantri)
    .then((result) => {
      this.getDataSantri()
    })
  }
  putDataSantri = () => {
    axios.put(`http://localhost:4000/posts/${this.state.postDataSantri.id}`, this.state.postDataSantri)
    .then(res => {
      this.getDataSantri()
    })
  }
  simpanDataSantri = () => {
    this.postDataSantri()
    console.log('data telah tersimpan');
    this.setState({
      postDataSantri: {
        name: '',
        username: ''
      }
    })
  }
  onHandleInput = (event) => {
    let NewPostDataSantri = {...this.state.postDataSantri}
    NewPostDataSantri[event.target.name] = event.target.value
    let timeid = new Date().getTime()
    if(!this.state.isUpdate){
      NewPostDataSantri['id'] = timeid
    }
    this.setState({
      postDataSantri : NewPostDataSantri
    }, () => {
    })
  }
  onHandleDelete = (id) => {
    axios.delete(`http://localhost:4000/posts/${id}`)
    .then(res => {
      console.log(res)
      this.getDataSantri()
    })
  }
  dataUpdate = (e) => {
    this.setState({
      postDataSantri : e,
      isUpdate : true
    })
  }
  searchedSantri = (e) => {
    this.setState ({
      value : e.target.value
    }, () => {
      if(this.state.dataSantri) {
        const searchedSantri = this.state.dataSantri.filter (
          item => (
            item.name.toLowerCase().indexOf(this.state.value.toLowerCase()) > -1
          )
        )
        this.setState({
          newDataSantri : searchedSantri
        }, () => this.setPagination())
      }
    })
  }
  onHandleUpdate = () => {
    this.putDataSantri()
      this.setState({
        postDataSantri : {
          name: '',
          username: ''
        }
      })
  }

  // FItur Pagination
  setPagination = () => {
    const {dataSantri, currentPage, dataSantriPerPage, value, newDataSantri} = this.state //destructuring assigments
    const lastIndexOfSantri   = currentPage * dataSantriPerPage //menentukan nilai lastindex
    const firstIndexOfSantri  = lastIndexOfSantri - dataSantriPerPage //menentukan nilai firstindex

    // menghitung jumlah seluruh data perPagenya
    const dataSantriWithLimit = value && newDataSantri.length //pengkondisian ternary
                                ?  newDataSantri.slice(firstIndexOfSantri, lastIndexOfSantri)
                                : value && !newDataSantri.length
                                  ? null
                                  : dataSantri.slice(firstIndexOfSantri, lastIndexOfSantri)

    const paginationNumbers = [] //variabel penampung jumlah pagination yg dibutuhkan

    // MENGHITUNG seluruh datasantri yang ada.length
    const currentDataSantriLength = value && newDataSantri.length  //pengkondisian ternary
                                    ? newDataSantri.length 
                                    : value && !newDataSantri.length
                                      ? null 
                                      : dataSantri.length

    // melooping hasil dari seluruh datasantri dibagi datasantriperpage(5) kemudian dibulatkan 
    for (let i = 1; i <= Math.ceil(currentDataSantriLength / dataSantriPerPage);  i++) {
      //hasil looping dipush / disimpan kedalam variabel paginationNumbers yg digunakan untuk menghitung jumlah paginationya
      paginationNumbers.push(i); 
    }

    this.setState({
      dataSantriWithLimit, //merubah this.state.dataSantriWithLimit menjadi (variabel) dataSantriWithLimit 
      paginationNumbers   //merubah this.state.paginationNumbers menjadi (variabel) paginationNumbers
    }, () => {
      console.table(`dari setPagination`)

      console.table(`dataSantriWithLimit`, this.state.dataSantriWithLimit)
      console.table(`paginationNumbers`, this.state.paginationNumbers)
    })
  }

  onMovePage = (event) => {
    console.log('button diklik', event.target.id)
    this.setState(
      {
        currentPage : Number(event.target.id)
      }, () => this.setPagination(),
    )
  }
  onPreviousPage = () => {
    this.setState(prevState => ({
      currentPage : prevState.currentPage > 1 
                    ? prevState.currentPage -1
                    : prevState.currentPage
    }), ()=> this.setPagination())
  }
  onNextPage = () => {
    this.setState(prevState => ({
      currentPage : prevState.currentPage < this.state.paginationNumbers.length 
                    ? prevState.currentPage + 1
                    : prevState.currentPage
    }), ()=> this.setPagination() )
  }

  render() {
    const { onHandleInput, simpanDataSantri, onHandleDelete, onHandleUpdate, dataUpdate, searchedSantri, onPreviousPage, onNextPage } = this
    const { postDataSantri, value, paginationNumbers, dataSantriWithLimit, currentPage } = this.state
    return (
      <div className="container-fluid bg-info text-light">
        <Header />
        <Navbar 
          onHandleInput       = {onHandleInput}  
          simpanDataSantri    = {simpanDataSantri}
          postDataSantri      = {postDataSantri}
          searchedSantri      = {searchedSantri}
        />
        <Contents 
          onHandleUpdate    = {onHandleUpdate}
          onHandleInput     = {onHandleInput}
          simpanDataSantri  = {simpanDataSantri}
          onHandleDelete    = {onHandleDelete}
          dataUpdate        = {dataUpdate}
          newDataSantri     = {dataSantriWithLimit} //update pagination
          dataSantri        = {dataSantriWithLimit} //update for fitur pagination
          postDataSantri    = {postDataSantri}
          searchedSantri    = {searchedSantri}
          value             = {value}
        />
        <nav aria-label = "Page navigation example ">
          <ul className = "pagination justify-content-end">
            <li className = "page-item">
              <a className="page-link text-info" onClick={()=>onPreviousPage()}>
                Previous
              </a>
            </li>

            {paginationNumbers.map((item, index) => (
              <li className={`page-item ${currentPage === item && 'active'}`} key={index}>
                <a 
                  className = "page-link text-info "
                  id={item} 
                  onClick={(event) => this.onMovePage(event)}
                >
                  {item}
                </a>
              </li>
            ))}
            <li className = "page-item">
              <a className="page-link  text-info" onClick={()=>onNextPage()} >
                Next
                </a>
              </li>
          </ul>
        </nav>
      </div>
    )
  }
}


























export default App;
