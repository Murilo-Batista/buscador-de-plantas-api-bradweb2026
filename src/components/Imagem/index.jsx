import style from "./styles.module.css"
import ipeFlorido from "../../assets/ipe-florido.jpg"

export default function Imagem (){
    return (
        <>
        <div>
            <img src={ipeFlorido} alt="Ipê florido" className={style.imagem}/>
        </div>
        </>
    )
}