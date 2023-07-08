import {
    MDBBtn, MDBCard, MDBCardFooter, MDBCardTitle, MDBCol,
    MDBContainer, MDBIcon, MDBRow
} from 'mdb-react-ui-kit'
import React from 'react'
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ProductContext from './context/ProductContext'
import { currDesign, truncate } from './Products'
import axios from 'axios'

const CartProduct = () => {
    const { basket, setBasket, count, setCount } = useContext(ProductContext)
    const navigate = useNavigate();

    let aggregate = basket?.reduce((prev, curr) => {
        return prev + curr?.itemPrice
    }, 0)

    const removeFromCart = (i) => {
        const newCartList = basket.filter((item, index) => index !== i)
        setBasket([...newCartList])
        setCount(count - 1)
    }
    const handleCheckout = async () => {
        await axios.get(`https://e-commerce-store1.onrender.com/secret/${aggregate}`).then((res) => {
            navigate(`/checkout/${res.data.client_secret}`)
        })
    }
    return (
        <MDBContainer style={{
            minHeight: '100vh'
        }}>
            <Link to={'/'}>
                <MDBIcon fas icon='home' />
            </Link>
            <MDBRow>
                <MDBCol md={12} lg={6}>
                    {
                        basket?.length === 0 ? <div style={{ marginTop: "30px" }}>
                            <h3>You dont have any product in cart</h3>
                        </div> : basket?.map((data, i) =>
                            <div key={i}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    marginTop: '20px 0px',
                                    padding: '10px 0',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    borderBottom: '1px solid black'
                                }}>
                                <Link style={{
                                    display: "flex",
                                    alignItems: "center"
                                }} to={`/product/${data?.id}`}>
                                    <img style={{
                                        maxWidth: '120px',
                                        maxHeigt: "100px"
                                    }} src={data?.asset?.imageUrl}
                                        alt='prodImage'
                                    />
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        margin: '0px 20px',
                                        padding: '0px',
                                        fontSize: '25px'
                                    }}>
                                        <p className='text-dark'>{truncate(data?.itemName, 25)}</p>
                                        <strong className='text-dark'>{currDesign.format(data?.itemPrice)}</strong>
                                    </div>
                                </Link>
                                <span onClick={() => removeFromCart(i)}>
                                    <MDBIcon color='danger' style={{ cursor: "pointer" }} far icon='trash-alt' />
                                </span>

                            </div>
                        )
                    }


                </MDBCol>
                <hr />
                {
                    basket.length > 0 && <MDBCol>
                        <MDBCard>
                            <MDBCardTitle>
                                <h3 className='m-0 text-center mt-2'>Checkout</h3>
                            </MDBCardTitle>
                            <hr />
                            <MDBCardFooter style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                <small style={{ fontSize: '22px' }}>Total:</small>
                                <strong style={{ fontSize: '32px' }}>{currDesign.format(aggregate)}</strong>
                            </MDBCardFooter>
                        </MDBCard>
                        <div className='d-grid gap-2 d-md-flex justify-content-md-end mt-2'>
                            <MDBBtn color='info' type='primary' onClick={handleCheckout} >Pay Now</MDBBtn>
                        </div>
                    </MDBCol>
                }

            </MDBRow>
        </MDBContainer>
    )
}

export default CartProduct
