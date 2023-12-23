import partyFetch from '../axios/config';
import { useEffect,useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./Form.css"
import useToast from '../hook/useToast';

const CreateParty = () => {

 const [services,setServices] = useState([])
 const [title,setTitle] = useState("");
 const [author,setauthor] = useState("");
 const [description, setDescription] = useState("");
 const [budget,setBudget] = useState("");
 const [image,setImage] = useState("");
 const [partyServices, setPartyServices] = useState([]);
 const navigate = useNavigate()

//Load services

useEffect(() => {
    const loadServices = async () => {
        const res = await partyFetch.get("/services")
        setServices(res.data)
    }

    loadServices();
},[])

//Add or Remove Services
const handleServicess = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    const filteredService = services.filter((s) => s._id === value)

    if(checked) {
        setPartyServices((services) => [...services,filteredService[0]]);
    }
    else{
        setPartyServices((services) => services.filter((s)=> s._id !== value));
    }
}


//Create a new Party
const createParty = async (e) => {
    e.preventDefault();

   try {
        const party ={
            title,
            author,
            description,
            budget,
            image,
            services : partyServices,
        };

        const res = await partyFetch.post("/parties",party);

        if(res.status === 201){
            navigate("/");
            // eslint-disable-next-line react-hooks/rules-of-hooks
            useToast(res.data.msg);
        }
    } catch (error) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useToast(error.response.data.msg,"error");

   }
};


  return (
    <div className="form-page">
        <h2>Cria sua proxima festa</h2>
        <p>Defina o seu orcamento e escolha os servicos</p>
        <form onSubmit={(e) => createParty(e)}>
            <label>
                <span>Nome da Festa:</span>
                <input type="text" placeholder="Seja criativo..." required onChange={(e)=>setTitle(e.target.value)} value={title}></input>
            </label>

            <label>
                <span>Anfitriao:</span>
                <input type="text" placeholder="Quem esta dando a festa..." required onChange={(e)=>setauthor(e.target.value)} value={author}></input>
            </label>

            <label>
                <span>Descricao:</span>
                <textarea placeholder="Conta mais sobre a festa... " required onChange={(e)=>setDescription(e.target.value)} value={description}></textarea>
            </label>

            <label>
                <span>Orcamento:</span>
                <input type="number" placeholder="Quanot vc pretende investir ..." required onChange={(e)=>setBudget(e.target.value)} value={budget}></input>
            </label>

            <label>
                <span>Imagem</span>
                <input type="text" placeholder="Insira a URL de uma imagem" required onChange={(e)=>setImage(e.target.value)} value={image}></input>
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
                                <input type='checkbox' value={service._id} onChange={(e)=>handleServicess(e)} ></input>
                                <p>Marque para solicitar</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <input type="submit" value="Criar festa" className="btn"></input>

        </form>
    </div>
  )
}

export default CreateParty