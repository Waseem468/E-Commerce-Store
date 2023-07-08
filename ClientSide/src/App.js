import './App.css';
import { MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from './components/NavBar';
import Products from './components/Products';
import ProductDetails from './components/ProductDetails';
import CartProduct from './components/CartProduct';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Checkout from './components/Checkout';
import PaymentSuccess from './components/PaymentSuccess'
function App() {
  const [items, setItems] = useState([])
  useEffect(() => {
    async function getAllProducts() {
      await axios.request({
        url: `https://api-ap-south-1.hygraph.com/v2/clgw2f9tn13y601uh0s80btya/master`,
        method: 'POST',
        data: {
          query: `{items{
                        id
                        itemName
                        itemDetails
                        itemPrice
                        asset
                        category
                        createdAt
                      }}`
        },
        headers: {
          'content-type': 'application/json',
        }
      }).then((res) => {
        setItems(res.data.data.items)
        console.log(res.data.data.items)
      })
    }
    getAllProducts()
  }, [])
  return (
    <MDBContainer style={{ paddingTop: "10px" }}>
      <MDBRow style={{ marginTop: '60px' }} >
        <Router>
          <MDBCol>
            <NavBar />
          </MDBCol>
          <Routes>
            <Route path='/' element={<Products items={items} />} />
            <Route path='/product/:id' element={<ProductDetails />} />
            <Route path='/cart' element={<CartProduct />} />
            <Route path='/checkout/:id' element={<Checkout />} />
            <Route path='/payment/success' element={<PaymentSuccess />} />
          </Routes>
        </Router>
      </MDBRow>
    </MDBContainer>

  );
}

export default App;