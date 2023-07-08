import React from 'react';
import { loadStripe } from '@stripe/stripe-js'
import { useNavigate, useParams } from 'react-router-dom';
import { Elements, useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'
import { MDBBtn, MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit';
const stripe = loadStripe('pk_test_51NG19iSEj6XytKGLBfsCoJq3ETZ1hItx4foPXOz3vgybKSf5egwa1qBGK8IMB24IiVewySbg7WyPVyYfoteAgRK100xc2pUNu6')

const loder = 'auto';


const Checkout = () => {
    const { id } = useParams();
    let clientSecret = id;
    if (id) {
        return (
            <div>
                <Elements stripe={stripe} options={{ clientSecret, loder }}>
                    <CheckoutForm />
                </Elements>
            </div>
        )
    }
}

function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: 'http://localhost:3000/payment/success'
            }
        })
        if (error) {
            navigate('/')
        }
    }
    return (
        <MDBContainer className='d-flex align-items-center justify-content-center'>
            <MDBRow center  className='mt-5'>
                <MDBCol md={12} lg={6}>
                    <form style={{
                        background: "black",
                        borderRadius: '10px',
                        padding: '10px',
                    }}>
                        <h3>
                            Payment
                        </h3>
                        <PaymentElement />
                        <div className='d-flex justify-content-end mt-3'>
                            <MDBBtn className='m-3' onClick={() => navigate("/")}>
                                Back
                            </MDBBtn>
                            <MDBBtn className='m-3' onClick={handleSubmit}>
                                Submit
                            </MDBBtn>

                        </div>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    )
}
export default Checkout
