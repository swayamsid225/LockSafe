import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Manager from './components/Manager'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {

  return (
    <div className="relative min-h-screen">
      {/* Main Wrapper for Entire Page */}
      <div className="absolute inset-0 -z-10 h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
      
      {/* Navbar */}
      <Navbar />
      
      {/* Main Content */}
      <div className="flex-grow">
        <Manager />
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}


export default App
