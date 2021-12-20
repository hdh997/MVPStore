
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './Component/Navbar/Navbar';
import Footer from './Component/Footer/Footer';
import Home from './Component/Home/Home';
import {Customer} from './Component/Customer/Customer';
import {Store} from './Component/Store/Store';
import {Product} from './Component/Product/Product';
import {Sales} from './Component/Sales/Sales';
// import CustomerContextProvider from './Context/CustomerContext';

function App() {
  return (
    <Router>
      <div className="App">
          <Navbar/>
          <div className='content'>
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route path='/customer' element={<Customer />} />
              <Route path='/product' element={<Product />} />
              <Route path='/store' element={<Store />} />
              <Route path='/sale' element={<Sales />} />
            </Routes>
          </div>
          <Footer />
      </div>
    </Router>
    
  );
}

export default App;
