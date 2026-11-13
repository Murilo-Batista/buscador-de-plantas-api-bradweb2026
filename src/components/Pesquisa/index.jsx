import { useEffect, useRef, useState } from "react";
import style from "./styles.module.css";
import Cards from "../Cards";
import { buscarPlantas, buscarDetalhesPlanta } from "../../services/trefle";

export default function Pesquisa() {
  const [termoBusca, setTermoBusca] = useState("");
  const [plantas, setPlantas] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");
  const [pesquisou, setPesquisou] = useState(false);
  const [plantaSelecionada, setPlantaSelecionada] = useState(null);
  const [carregandoDetalhes, setCarregandoDetalhes] = useState(false);
  const [pagina, setPagina] = useState(1);
  const [temMais, setTemMais] = useState(false);
  const campoBusca = useRef(null);

  async function executarBusca(event, paginaSolicitada = 1) {
    event?.preventDefault();
    const termo = termoBusca.trim();
    if (!termo) {
      setErro("Digite o nome popular ou científico de uma planta.");
      campoBusca.current?.focus();
      return;
    }

    setCarregando(true);
    setErro("");
    setPesquisou(true);
    if (paginaSolicitada === 1) setPlantas([]);

    try {
      const resposta = await buscarPlantas(termo, paginaSolicitada);
      setPlantas((anteriores) =>
        paginaSolicitada === 1 ? resposta.data : [...anteriores, ...resposta.data]
      );
      setPagina(paginaSolicitada);
      setTemMais(Boolean(resposta.links?.next));
    } catch (error) {
      setErro(error.message || "Não foi possível consultar a Trefle. Tente novamente.");
    } finally {
      setCarregando(false);
    }
  }

  async function abrirDetalhes(planta) {
    setPlantaSelecionada({ resumo: planta, detalhes: null });
    setCarregandoDetalhes(true);
    try {
      const detalhes = await buscarDetalhesPlanta(planta.slug || planta.id);
      setPlantaSelecionada({ resumo: planta, detalhes });
    } catch (error) {
      setPlantaSelecionada({ resumo: planta, detalhes: null, erro: error.message });
    } finally {
      setCarregandoDetalhes(false);
    }
  }

  useEffect(() => {
    function fecharComEsc(event) {
      if (event.key === "Escape") setPlantaSelecionada(null);
    }
    window.addEventListener("keydown", fecharComEsc);
    return () => window.removeEventListener("keydown", fecharComEsc);
  }, []);

  return (
    <section className={style.secaoPesquisa} aria-label="Pesquisa de plantas">
      <form className={style.formulario} onSubmit={(event) => executarBusca(event, 1)}>
        <div className={style.campoContainer}>
          <span className={style.iconeBusca} aria-hidden="true">⌕</span>
          <input
            ref={campoBusca}
            type="text"
            className={style.input}
            placeholder="Procure uma planta pelo nome popular ou científico..."
            value={termoBusca}
            onChange={(event) => setTermoBusca(event.target.value)}
            aria-label="Nome popular ou científico da planta"
          />
          {termoBusca && (
            <button type="button" className={style.limpar} onClick={() => setTermoBusca("")} aria-label="Limpar pesquisa">×</button>
          )}
        </div>
        <button className={style.botaoBuscar} type="submit" disabled={carregando}>
          {carregando && pagina === 1 ? "Pesquisando..." : "Pesquisar"}
        </button>
      </form>

      {erro && <p className={style.mensagemErro} role="alert">{erro}</p>}
      {carregando && pagina === 1 && <p className={style.estado}>Consultando a coleção botânica...</p>}
      {!carregando && pesquisou && plantas.length === 0 && !erro && (
        <p className={style.estado}>Nenhuma planta encontrada. Experimente outro nome.</p>
      )}

      {plantas.length > 0 && (
        <>
          <div className={style.cabecalhoResultados}>
            <h2>Espécies encontradas</h2>
            <span>Resultados da Trefle</span>
          </div>
          <Cards plantas={plantas} aoSaibaMais={abrirDetalhes} />
          {temMais && (
            <button className={style.botaoMais} onClick={() => executarBusca(null, pagina + 1)} disabled={carregando}>
              {carregando ? "Carregando..." : "Carregar mais espécies"}
            </button>
          )}
        </>
      )}

      {plantaSelecionada && (
        <div className={style.fundoModal} role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setPlantaSelecionada(null);
        }}>
          <section className={style.modal} role="dialog" aria-modal="true" aria-labelledby="titulo-planta">
            <button className={style.fecharModal} onClick={() => setPlantaSelecionada(null)} aria-label="Fechar">×</button>
            <div className={style.modalImagem}>
              {plantaSelecionada.resumo.image_url ? (
                <img src={plantaSelecionada.resumo.image_url} alt={plantaSelecionada.resumo.common_name || plantaSelecionada.resumo.scientific_name} />
              ) : <div className={style.semImagem}>Imagem não disponível</div>}
            </div>
            <div className={style.modalConteudo}>
              <p className={style.sobretitulo}>ENCICLOPÉDIA BOTÂNICA</p>
              <h2 id="titulo-planta">{plantaSelecionada.resumo.common_name || plantaSelecionada.resumo.scientific_name}</h2>
              <p className={style.nomeCientifico}>{plantaSelecionada.resumo.scientific_name}</p>
              {carregandoDetalhes ? <p className={style.estado}>Carregando informações...</p> : (
                <>
                  {plantaSelecionada.erro && <p className={style.mensagemErro}>{plantaSelecionada.erro}</p>}
                  <div className={style.detalhesGrid}>
                    <Informacao rotulo="Família" valor={plantaSelecionada.detalhes?.family?.name || plantaSelecionada.resumo.family} />
                    <Informacao rotulo="Gênero" valor={plantaSelecionada.detalhes?.genus?.name || plantaSelecionada.resumo.genus} />
                    <Informacao rotulo="Classificação" valor={plantaSelecionada.detalhes?.rank || plantaSelecionada.resumo.rank} />
                    <Informacao rotulo="Status" valor={plantaSelecionada.detalhes?.status || plantaSelecionada.resumo.status} />
                    <Informacao rotulo="Autor" valor={plantaSelecionada.detalhes?.author || plantaSelecionada.resumo.author} />
                    <Informacao rotulo="Ano" valor={plantaSelecionada.detalhes?.year || plantaSelecionada.resumo.year} />
                  </div>
                  {plantaSelecionada.detalhes?.observations && (
                    <div className={style.observacoes}>
                      <h3>Observações</h3>
                      <p>{plantaSelecionada.detalhes.observations}</p>
                    </div>
                  )}
                  {plantaSelecionada.detalhes?.distribution?.native?.length > 0 && (
                    <div className={style.observacoes}>
                      <h3>Distribuição nativa</h3>
                      <p>{plantaSelecionada.detalhes.distribution.native.map((local) => local.name).filter(Boolean).join(", ")}</p>
                    </div>
                  )}
                </>
              )}
              <p className={style.credito}>Informações fornecidas pela API Trefle.</p>
            </div>
          </section>
        </div>
      )}
    </section>
  );
}

function Informacao({ rotulo, valor }) {
  return (
    <div className={style.informacao}>
      <span>{rotulo}</span>
      <strong>{valor || "Não informado"}</strong>
    </div>
  );
}
