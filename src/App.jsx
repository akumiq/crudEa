import React, { Component } from 'react'
import Header from './components/header'
import Navbar from './components/navbar'
import Contents from './components/contents'
import axios from 'axios'
import {
  PaginationItem,
  Pagination,
  PaginationLink
} from 'reactstrap'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      // state for crud
      dataSantri: [],
      newDataSantri: [],
      value: '',
      postDataSantri: {
        id: '',
        nama: '',
        jurusan: ''
      },
      isUpdate: false,

      // State for pagination
      currentPage: 1,
      dataSantriPerPage: 5,
      dataSantriWithLimit: [],
      paginationNumbers: []
    }
  }

  // fitur CRUD
  componentDidMount () {
    this.getDataSantri()
  }

  getDataSantri = () => {
    axios.get('http://localhost:4000/posts?_sort=id&_order=desc')
      .then((result) => {
        this.setState({
          dataSantri: result.data
        }, () => {
          this.setPagination()
        })
      })
  }

  simpanDataSantri = () => {
    this.postDataSantri()
    this.setState({
      postDataSantri: {
        id: '',
        nama: '',
        jurusan: ''
      }
    })
  }

  onHandleUpdate = () => {
    axios.put(`http://localhost:4000/posts/${this.state.postDataSantri.id}`, this.state.postDataSantri)
      .then(() => {
        this.getDataSantri()
        this.setState({
          postDataSantri: {
            id: '',
            nama: '',
            jurusan: ''
          }
        })
      })
  }

  onHandleDelete = (id) => {
    axios.delete(`http://localhost:4000/posts/${id}`)
      .then(() => {
        this.getDataSantri()
      })
  }

  postDataSantri = () => {
    axios.post('http://localhost:4000/posts', this.state.postDataSantri)
      .then(() => {
        this.getDataSantri()
      })
  }

  onHandleInput = (event) => {
    const NewPostDataSantri = { ...this.state.postDataSantri }
    NewPostDataSantri[event.target.name] = event.target.value
    const timeid = new Date().getTime()
    if (!this.state.isUpdate) {
      NewPostDataSantri.id = timeid
    }
    this.setState({
      id: '',
      postDataSantri: NewPostDataSantri
    })
  }

  dataUpdate = (data) => {
    this.setState({
      postDataSantri: data,
      isUpdate: true
    })
  }

  searchedSantri = (e) => {
    this.setState({
      value: e.target.value
    }, () => {
      if (this.state.dataSantri) {
        const searchedSantri = this.state.dataSantri.filter(
          item => (
            item.name.toLowerCase().indexOf(this.state.value.toLowerCase()) > -1
          )
        )
        this.setState({
          newDataSantri: searchedSantri
        }, () => this.setPagination())
      }
    })
  }

  // FItur Pagination
  setPagination = () => {
    const { dataSantri, currentPage, dataSantriPerPage, value, newDataSantri } = this.state // destructuring assigments
    const lastIndexOfSantri = currentPage * dataSantriPerPage // menentukan nilai lastindex
    const firstIndexOfSantri = lastIndexOfSantri - dataSantriPerPage // menentukan nilai firstindex

    // menghitung jumlah seluruh data perPagenya
    const dataSantriWithLimit = value && newDataSantri.length // pengkondisian ternary
      ? newDataSantri.slice(firstIndexOfSantri, lastIndexOfSantri)
      : value && !newDataSantri.length
        ? null
        : dataSantri.slice(firstIndexOfSantri, lastIndexOfSantri)

    const paginationNumbers = [] // variabel penampung jumlah pagination yg dibutuhkan

    // MENGHITUNG seluruh datasantri yang ada.length
    const currentDataSantriLength = value && newDataSantri.length // pengkondisian ternary
      ? newDataSantri.length
      : value && !newDataSantri.length
        ? null
        : dataSantri.length

    // melooping hasil dari seluruh datasantri dibagi datasantriperpage(5) kemudian dibulatkan
    for (let i = 1; i <= Math.ceil(currentDataSantriLength / dataSantriPerPage); i++) {
      // hasil looping dipush / disimpan kedalam variabel paginationNumbers yg digunakan untuk menghitung jumlah paginationya
      paginationNumbers.push(i)
    }

    this.setState({
      dataSantriWithLimit, // merubah this.state.dataSantriWithLimit menjadi (variabel) dataSantriWithLimit
      paginationNumbers // merubah this.state.paginationNumbers menjadi (variabel) paginationNumbers
    })
  }

  onMovePage = (event) => {
    this.setState({
      currentPage: Number(event.target.id)
    }, () => this.setPagination())
  }

  onPreviousPage = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage > 1
        ? prevState.currentPage - 1
        : prevState.currentPage
    }), () => this.setPagination())
  }

  onNextPage = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage < this.state.paginationNumbers.length
        ? prevState.currentPage + 1
        : prevState.currentPage
    }), () => this.setPagination())
  }

  render () {
    const {
      onHandleInput,
      simpanDataSantri,
      onHandleDelete,
      onHandleUpdate,
      dataUpdate,
      searchedSantri,
      onPreviousPage,
      onNextPage
    } = this

    const {
      postDataSantri,
      value,
      paginationNumbers,
      dataSantriWithLimit,
      currentPage
    } = this.state

    return (
      <div
        className='bg-info text-light'
        style={{ minHeight: '100vh' }}
      >

        <Header />

        <Navbar
          onHandleInput={onHandleInput}
          simpanDataSantri={simpanDataSantri}
          postDataSantri={postDataSantri}
          searchedSantri={searchedSantri}
        />

        <Contents
          onHandleUpdate={onHandleUpdate}
          onHandleInput={onHandleInput}
          simpanDataSantri={simpanDataSantri}
          onHandleDelete={onHandleDelete}
          dataUpdate={dataUpdate}
          newDataSantri={dataSantriWithLimit} // update pagination
          dataSantri={dataSantriWithLimit} // update for fitur pagination
          postDataSantri={postDataSantri}
          searchedSantri={searchedSantri}
          value={value}
        />

        <Pagination
          className='pagination justify-content-end m-4'
          aria-label='Page navigation example'
        >
          <PaginationItem disabled={currentPage <= 1}>
            <PaginationLink onClick={onPreviousPage}>
              Previous
            </PaginationLink>
          </PaginationItem>

          {paginationNumbers.map((item, index) => (
            <PaginationItem
              key={index}
              active={currentPage === item}
            >
              <PaginationLink
                id={item}
                onClick={(event) => this.onMovePage(event)}
              >
                {item}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem
            disabled={currentPage === paginationNumbers.length}
          >
            <PaginationLink onClick={onNextPage}>
              Next
            </PaginationLink>
          </PaginationItem>
        </Pagination>

      </div>
    )
  }
}

export default App
