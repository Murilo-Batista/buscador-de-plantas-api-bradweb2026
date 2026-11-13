import style from "./styles.module.css";

export default function Cards({ plantas = [], aoSaibaMais }) {
  return (
    <div className={style.grade}>
      {plantas.map((planta) => (
        <article className={style.card} key={planta.id}>
          <div className={style.imagemContainer}>
            {planta.image_url ? (
              <img src={planta.image_url} alt={planta.common_name || planta.scientific_name} loading="lazy" />
            ) : (
              <div className={style.semImagem}>Imagem indisponível</div>
            )}
          </div>
          <div className={style.conteudo}>
            <p className={style.familia}>{planta.family_common_name || planta.family || "Família não informada"}</p>
            <h3>{planta.common_name || "Nome popular não informado"}</h3>
            <p className={style.cientifico}>{planta.scientific_name}</p>
            <button className={style.saibaMais} onClick={() => aoSaibaMais(planta)}>
              Saiba mais <span aria-hidden="true">→</span>
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
