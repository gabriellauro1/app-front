import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Menu from "./paginas/Menu";
import ConsultaAgenda from "./paginas/ConsultaAgenda";
import Agendamento from "./paginas/Agendamento";
import Cadastros from "./paginas/Cadastros";


function App(){
    return (
        <> 
            <Routes>
                <Route path="/" element={<Layout><Menu /></Layout>}/>
                <Route path="/cadastros" element={<Layout><Cadastros/></Layout>}/>
                <Route path="/ConsultaAgenda" element={<Layout><Pagina2 /></Layout>}/>
                <Route path="/Agendamento" element={<Layout><Pagina3 /></Layout>}/>
            </Routes>                      
        </>
    );
}

export default App;