import './index.css'
import axios from 'axios'
import {useEffect, useState} from 'react'

function FileData(){
    const [tag,setTag] = useState([])
    const [lang,setLang] = useState([])

    useEffect(()=>{
        axios.get('http://localhost:3001/inpt').then(({data})=>{
            setTag(data.tags)
            setLang(data.lang)
        })
    },[])

    return(
        <fieldset className='info-file-set field'>
            <label htmlFor="tags">
                <span className='text-select'>Tag: </span>
                <select id='tags'>
                    <option>Escolha...</option>
                    {tag.map((i,key)=>(
                        <option key={key} value={i}>{i}</option>
                    ))}
                </select>
            </label>
            <label htmlFor="lang">
                <span className='text-select'>Language: </span>
                <select id='lang'>
                    <option>Escolha...</option>
                    {lang.map((i,key)=>(
                        <option key={key} value={i}>{i}</option>
                    ))}
                </select>
            </label>
            <label htmlFor="nsfw">NSFW: <input type='checkbox' id='nsfw' name='nsfw' /></label>
        </fieldset>
    )
}
export default FileData