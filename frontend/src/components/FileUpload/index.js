import {useState,useEffect} from 'react' //TODO criar diversas páginas e quando finalizar importar um useNavigate que ao enviar arquivo redireciona para o caminha '/'
import axios from 'axios'
import FileData from '../FileData'
import './index.css'

function FileUpload(){
    const [file,setFile] = useState()
    const [fileName,setFileName] = useState('Escolha o Arquivo')

    const [tag,setTag] = useState([])
    const [lang,setLang] = useState([])

    useEffect(()=>{
        axios.get('http://localhost:3001/inpt').then(({data})=>{
            
            setTag(data.tags)
            setLang(data.lang)
        })
    },[])

    function onChange(e){
        if(e.target.files[0]){
            setFile(e.target.files[0])
            setFileName(e.target.files[0].name)
        }else{
            setFile(null)
            setFileName('Escolha o Arquivo')
        }
    }

    async function onSubmit(e){
        e.preventDefault()
        const formData = new FormData()

        if(!file) return alert("you must insert a file")
        
        const inpt_tag = document.getElementById('tags').value
        if(!tag.find((i)=>i===inpt_tag)) return alert(`tag ${inpt_tag} inválida`)
        
        const inpt_lang = document.getElementById('lang').value
        if(!lang.find((i)=>i===inpt_lang)) return alert(`idioma ${inpt_lang} inválido`)
        
        const notSafeForWork = document.getElementById('nsfw').checked
        if(!typeof notSafeForWork === 'boolean') return alert('NSFW deve ser booleano')
        
        formData.append('lang',inpt_lang)
        formData.append('tag',inpt_tag)
        formData.append('nsfw',notSafeForWork)
        formData.append('file', file) //? primeiro file é o local que no back end pode ser chamado ex: req.files.file

        try {
            let x = await axios.post('http://localhost:3001/upload',formData,{
                headers:{
                    'Content-Type': 'multipart/form-data'
                }
            })
            console.log(x)
        } catch (err) {
            console.error(err)
            alert('ocorreu um erro')
        }
    }

    return(
        <form onSubmit={onSubmit} id="file-upload">
            <fieldset className='file-set field'>
                <input type="file" className="file-inpt" id='file-inpt' onChange={onChange} title="" />
                <label htmlFor='file-inpt'><span id='val'>{fileName}</span></label>
            </fieldset>
            {file && <FileData/>}
            <fieldset className='submit-file-set field'><input type="submit" value="Upload" /></fieldset>
        </form>
    )
}

export default FileUpload