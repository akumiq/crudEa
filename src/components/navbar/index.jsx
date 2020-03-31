import React from 'react'
import PropTypes from 'prop-types'
import {
  // Modal,
  // ModalHeader,
  // ModalBody,
  // Form,
  // FormGroup,
  // Label,
  // Input,
  // ModalFooter,
  Button
} from 'reactstrap'

const Navbar = (props) => {
  // const [isEditModalVisible, setEditModal] = useState(false)
  // const onToggleEditModal = () => setEditModal(!isEditModalVisible)

  return (
    <div className='container-fluid p-4'>
      <nav className='navbar navbar-expand-lg navbar-light bg-light rounded p-3'>
        <Button
          color='info'
          // onClick={() => {
          //   onToggleEditModal()
          // }}
        >
          <i className='fa fa-user-plus'>Tambah santri</i>
        </Button>

        {/* <Modal
          isOpen={isEditModalVisible}
          toggle={onToggleEditModal}
        >
          <ModalHeader toggle={onToggleEditModal}>
            Buat Data Santri
          </ModalHeader>

          <ModalBody>
            <Form>
              <FormGroup>
                <Label for='nama'>
                  Nama Santri
                </Label>

                <Input
                  type='text'
                  name='nama'
                  id='nama'
                  onChange={props.onHandleInput}
                  value={props.postDataSantri.nama}
                  placeholder='nama santri'
                />
              </FormGroup>
            </Form>

            <Form>
              <FormGroup>
                <Label for='jurusan'>
                  Jurusan Santri
                </Label>

                <Input
                  type='text'
                  name='jurusan'
                  id='jurusan'
                  onChange={props.onHandleInput}
                  value={props.postDataSantri.jurusan}
                  placeholder='jurusan santri'
                />
              </FormGroup>
            </Form>
          </ModalBody>

          <ModalFooter>
            <Button
              color='info'
              onClick={() => {
                onToggleEditModal()
                props.simpanDataSantri()
              }}
            >
              Simpan
            </Button>

            <Button
              color='secondary'
              outline
              onClick={onToggleEditModal}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal> */}

        {/* FORM INPUT */}
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon' />
        </button>

        <div
          className='collapse navbar-collapse'
          id='navbarSupportedContent'
        >
          <ul className='m-2 ml-auto'>
            <li className='navbar-item ml-auto'>
              <input
                className='form-control mr-sm-2'
                type='search'
                placeholder='Search'
                aria-label='Search'
                onChange={() => props.searchedSantri()}
              />
            </li>
          </ul>
        </div>

      </nav>
    </div>
  )
}

Navbar.propTypes = {
  searchedSantri: PropTypes.func
  // postDataSantri: PropTypes.object,
  // onHandleInput: PropTypes.func,
  // simpanDataSantri: PropTypes.func
}

export default Navbar
