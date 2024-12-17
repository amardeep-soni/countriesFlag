import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Mainlayout from "./components/Mainlayout";
import Home from "./components/Home";
import CountryDetails from "./components/CountriesDetails";
import { ThemeProvider } from "./components/ThemeContext";


function App() {

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Mainlayout />}>
            <Route index element={<Home />}></Route>
            <Route path="details/:id" element={<CountryDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
