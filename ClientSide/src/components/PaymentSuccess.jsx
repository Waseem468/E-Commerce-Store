import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdb-react-ui-kit'
import React from 'react'
import { Link } from 'react-router-dom'

const PaymentSuccess = () => {
    return (<>
        <MDBContainer className='d-flex align-items-center
  justify-content-center'>
            <MDBRow style={{
                width: "300px",
                height: "400px",
                background: "white",
                boxShadow: "5px 5px 5px 5px",
                fontSize: "22px",
                textAlign: "center",
                borderRadius: "10px",
                marginTop: '15px'

            }} className='d-flex align-items-center
  justify-content-center'>
                <MDBCol className='card m-3 d-flex
    align-items-center
  justify-content-center'>
                    <strong style={{
                        background: "green",
                        color: 'white', borderRadius: '5px'
                    }}>Payment Done Successfully</strong>
                    <Link to={'/'}>
                        <MDBBtn className='mt-5'>
                            Continue
                        </MDBBtn>
                    </Link>

                </MDBCol>
            </MDBRow>
        </MDBContainer>
    </>


    )
}

export default PaymentSuccess