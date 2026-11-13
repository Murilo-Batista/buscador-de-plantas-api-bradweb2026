import { useState } from "react";
import style from "./styles.module.css";

export default function Header() {
    const [menuAberto, setMenuAberto] = useState(false);

    return (
        <header className={style.header}>
            
            <div className={style.nome}>
                <h1>Mais Plantas</h1>
                <h3>Por Favor!</h3>
            </div>

            <div className={style.menuContainer}>
                <button className={style.menuButton} onClick={() => setMenuAberto(!menuAberto)}>
                    Aprenda Mais... <span>{menuAberto ? "▲" : "▼"}</span>
                </button>

                {menuAberto && (
                    <nav className={style.menulinks}>
                        <a href="https://www.instagram.com/ricardo__cardim?cplk=N2pjcW45aWxuOXpx" target="_blank">Ricardo Cardim no Instagram</a>

                        <a href="https://plantarum.org.br/" target="_blank">Jardim Botânico Plantarum</a>

                        <a href="https://copaiba.org.br/" target="_blank">ONG Ambientalista Copaíba</a>
                    </nav>
                )}
            </div>

        </header>
    )
}
