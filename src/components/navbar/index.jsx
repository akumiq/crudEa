import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  ModalFooter,
  Button,
  Navbar,
  Collapse,
  Nav,
  NavItem,
  NavbarToggler
} from 'reactstrap'

const MenuBar = (props) => {
  const [isCreateModalVisible, setCreateModal] = useState(false)
  const onToggleCreateModal = () => setCreateModal(!isCreateModalVisible)

  const [isNavbarVisible, setNavbarOpen] = useState(false)
  const onToggleNavbar = () => setNavbarOpen(!isNavbarVisible)

  return (
    <div className='container-fluid p-4'>
      <Navbar
        color='light'
        light
        expand='md'
        className='rounded'
      >
        <Button
          color='info'
          onClick={onToggleCreateModal}
        >
          Tambah santri
        </Button>

        <Modal
          isOpen={isCreateModalVisible}
          toggle={onToggleCreateModal}
        >
          <ModalHeader toggle={onToggleCreateModal}>
            Buat Data Santri
          </ModalHeader>

          <ModalBody>
            <Form>
              <FormGroup>
                <Label for='name'>
                  Nama Santri
                </Label>

                <Input
                  type='text'
                  name='name'
                  id='name'
                  onChange={(e) => props.onHandleInput(e)}
                  value={props.postDataSantri.name}
                  placeholder='nama santri'
                />
              </FormGroup>
            </Form>

            <Form>
              <FormGroup>
                <Label for='studyProgram'>
                  Jurusan Santri
                </Label>

                <Input
                  type='text'
                  name='studyProgram'
                  id='studyProgram'
                  onChange={(e) => props.onHandleInput(e)}
                  value={props.postDataSantri.studyProgram}
                  placeholder='jurusan santri'
                />
              </FormGroup>
            </Form>
          </ModalBody>

          <ModalFooter>
            <Button
              color='info'
              onClick={() => {
                props.onHandlePost()
                onToggleCreateModal()
              }}
            >
              Simpan
            </Button>

            <Button
              color='secondary'
              outline
              onClick={onToggleCreateModal}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

        <NavbarToggler onClick={onToggleNavbar} />
        <Collapse isOpen={isNavbarVisible} navbar>
          <Nav className='ml-auto' navbar>
            <NavItem>
              <Input
                className='form-control mr-sm-2'
                type='search'
                placeholder='cari santri'
                value={props.value}
                onChange={(e) => props.onSearchSantri(e)}
              />
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  )
}

MenuBar.propTypes = {
  postDataSantri: PropTypes.object,
  value: PropTypes.string,
  onHandleInput: PropTypes.func,
  onHandlePost: PropTypes.func,
  onSearchSantri: PropTypes.func
}

export default MenuBar
