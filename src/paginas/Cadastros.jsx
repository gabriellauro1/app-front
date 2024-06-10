
import axios from "axios";
import { useState, useEffect } from "react";

function Cadastros(){

    const[cliente, setCliente] = useState(null);
    const[clientes, setClientes] = useState([]);

    function getClientes(){
        axios.get("http://localhost:5229/clientes")
            .then((resposta) => {
                //console.log(resposta.data);
                setClientes(resposta.data);
            }
        );
    }

    useEffect(getClientes, []);

    function novoCliente(){
        setCliente({
            nome: "",
            cpf: "",
            telefone: "",
            email: "" 
        });
    }

    function cancelar(){
        setCliente(null);
    }


    function refresh(){
        cancelar();
        getClientes();
    }

    function onChangeCliente(e, id){
        setCliente({
            _id: id,
            nome: e.target.value
        });
    }

    function salvarCliente(){
        console.log(cliente);
        if(cliente.id){
            axios.put("http://localhost:5229/clientes/" + cliente.id, cliente)
              .then(() => {
                //refresh();
              });
        } else {
            axios.post("http://localhost:5229/clientes", cliente)
            .then(() => {
              //refresh();
            });
        }
    }

    function getFormulario(){
        return(
            <form>
                <label for="nome">Nome</label>
                <input type="text" id="nome" name="nome"
                    value={ cliente.nome }
                    onChange={(e) =>{
                        onChangeCliente(e, cliente.id);
                    }} />

                <label for="cpf">CPF</label>
                <input type="text" id="cpf" name="cpf" multiple/>

                <button onClick={ () => { salvarCliente(); }}>
                    Salvar</button>
                <button
                    onClick={()=>{ cancelar();}}
                >Cancelar</button>
            </form>
        );
    }


    function excluirCliente(id){
        axios.delete("http://localhost:5229/clientes/" + id)
            .then(() => {
                getClientes();
            });
    }
    
    function editarCliente(cliente){
        setCliente(cliente);
    }

    function getLinhaDaTabela(cliente){
        return (
            <tr>
                <td>{cliente.id}</td>
                <td>{cliente.nome}</td>
                <td>{cliente.cpf}</td>
                <td>{cliente.telefone}</td>
                <td>{cliente.email}</td>
                <td>
                    <button onClick={ 
                        () => { excluirCliente(cliente.id); } 
                    }>Excluir</button>
                    <button onClick={ 
                        () => { editarCliente(cliente); } 
                    }>Editar</button>
                </td>
            </tr>
        );
    }

    function getLinhasDaTabela(){        

        // const pessoas = [
        //       {id:"1",nome:"Maria",cpf:"12345"},
        //       {id:"2",nome:"Pedro",cpf:"34567"},
        //       {id:"1",nome:"Maria",cpf:"12345"},
        //       {id:"2",nome:"Pedro",cpf:"34567"},
        //       {id:"1",nome:"Maria",cpf:"12345"},
        //       {id:"2",nome:"Pedro",cpf:"34567"}
              
        //     ];

        const linhasDaTabela = [];

        for (let i = 0; i < clientes.length; i++) {
            const cliente = clientes[i];
            linhasDaTabela[i] = getLinhaDaTabela(cliente);            
        }

        return linhasDaTabela;
    }

    function getTabela(){
        return (
            <table>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>CPF</th>
                    <th>Telefone</th>
                    <th>E-mail</th>
                    <th>Ações</th>
                </tr>
                { getLinhasDaTabela () }
            </table>  
        );
    }


    function getConteudo(){
        if (cliente == null){
            return(
                <>
                    <button type="button"
                     onClick={ () => { novoCliente();}}>
                        Novo cliente
                     </button>
                    {getTabela()}
                </>

            );
        } else {
            return getFormulario();
        }
    }

    return(getConteudo());
    // return(
    //     <div class="principal">
    //         <h1>Formulário CRUD</h1>
    //         { getFormulario() }
    //         { getTabela() }
    //     </div>
    // );
}

export default Cadastros;