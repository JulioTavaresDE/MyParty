 
import partyFetch from '../axios/config';
import { useEffect,useState } from 'react';
import { Navigate, useNavigate,useParams } from "react-router-dom";
import useToast from '../hook/useToast';
import "./Form.css"
import party from './Party';

const EditParty = () => {
    const {id} = useParams();
    const [party,setParty] = useState(null);
    const [services,setServices] = useState([])
    const navigate = useNavigate();

    
    //Load services
    useEffect(() => {
    const loadServices = async () => {
        const res = await partyFetch.get("/services")
        setServices(res.data)
        loadParty();
    };

    const loadParty = async() => {
        const res = await partyFetch.get(`/parties/${id}`)
        setParty(res.data);

    };

    loadServices();
    },[])
    
    //Add or Remove Services
    const handleServicess = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    const filteredService = services.filter((s) => s._id === value)
    let partyServices = party.services;


    if(checked) {
        partyServices =  [...partyServices,filteredService[0]];
    }
    else{
        partyServices = partyServices.filter((s)=> s._id !== value);
    }

    setParty({...party, services: partyServices });
}
   

    const updateParty = async (e) => {
        e.preventDefault();

        try {
            const res = await partyFetch.put(`/parties/${party._id}`,party);
            if(res.status === 200){
                navigate(`/party/${id}`)
                // eslint-disable-next-line react-hooks/rules-of-hooks
                useToast(res.data.msg)
            }
        } catch (error) {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            useToast(error.response.data.msg, "error")
        }
    }

    if(!party)return <p>Carregando...</p>


  return (
    <div className="form-page">
        <h2>Editando {party.title}</h2>
        <p>Ajsute as informacoes da sua festa</p>
        <form onSubmit={(e) => updateParty(e)}>
            <label>
                <span>Nome da Festa:</span>
                <input  type="text" 
                        placeholder="Seja criativo..."
                        required onChange={(e)=> setParty({...party, title: e.target.value })} 
                        value={party.title}></input>
            </label>

            <label>
                <span>Anfitriao:</span>
                <input  type="text"
                        placeholder="Quem esta dando a festa..." required 
                        onChange={(e)=> setParty({...party, author: e.target.value })}
                        value={party.author}></input>
            </label>

            <label>
                <span>Descricao:</span>
                <textarea placeholder="Conta mais sobre a festa... " required
                        onChange={(e)=> setParty({...party, description: e.target.value })}
                        value={party.description}></textarea>
            </label>

            <label>
                <span>Orcamento:</span>
                <input type="number" 
                       placeholder="Quanot vc pretende investir ..."
                       required onChange={(e)=> setParty({...party, budget: e.target.value })}
                       value={party.budget}></input>
            </label>

            <label>
                <span>Imagem</span>
                <input type="text" 
                       placeholder="Insira a URL de uma imagem"
                       required onChange={(e)=> setParty({...party, image: e.target.value })}
                       value={party.image}></input>
            </label>

            <div>
                <h2>Escolha os servicos</h2>
                <div className="services-container">
                    {services.length === 0 && <p>Carregando</p>}
                    {services.length > 0 && services.map((service)=> (
                        <div className="service" key={service._id}>
                            <img src={service.image} alt={service.name} ></img>
                            <p className='service-name'>{service.name}</p>
                            <p className='service-price'>R$ {service.price}</p>
                            <div className='checkbox-container'>
                                <input type='checkbox' 
                                       value={service._id}
                                       onChange={(e)=>handleServicess(e)} 
                                       checked={party.services.find((partyService) =>partyService._id === service._id ) || ""}  >

                                       </input>
                                <p>Marque para solicitar</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <input type="submit" value="Editar festa" className="btn"></input>
        </form>
    </div>
  )
}

export default EditParty