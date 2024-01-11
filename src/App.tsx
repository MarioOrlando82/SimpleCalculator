import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Support from './components/Support';
import Calculator from './components/Calculator';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Calculator />} />
        <Route path="/support" element={<Support/>} />
      </Routes>
    </Router>
  );
}

export default App;
