import { MDBBtn, MDBCol, MDBInput, MDBRow } from 'mdb-react-ui-kit'
import React, { useContext } from 'react'
import ProductContext from './context/ProductContext'

const SearchBar = () => {
  const {setSearchTerm}=useContext(ProductContext);
  //for search items
  const handleChange=(e)=>{
e.preventDefault();
setSearchTerm(e.target.value)
  }
  return (
    <form >
        <MDBRow className='mb-3'>
            <MDBCol size={8} md={10}>
<MDBInput onChange={handleChange} label="search your product" type={'text'}/>
            </MDBCol>
            <MDBCol size={4} md={2}>
                <MDBBtn type='submit' outline color="danger">
                    Search
                </MDBBtn>
            </MDBCol>
        </MDBRow>
    </form>
  )
}

export default SearchBar
