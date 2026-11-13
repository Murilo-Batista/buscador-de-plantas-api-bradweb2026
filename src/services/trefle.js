const API_BASE = "https://trefle.io/api/v1";
const TOKEN = import.meta.env.VITE_TREFLE_TOKEN;

async function requisitar(endpoint) {

  const url = new URL(`${API_BASE}${endpoint}`);
  url.searchParams.set("token", TOKEN);

  const resposta = await fetch(url);
  let dados;

  try {
    dados = await resposta.json();
  } catch {
    throw new Error("A API retornou uma resposta inválida.");
  }

  if (!resposta.ok) {
    if (resposta.status === 401) throw new Error("Chave da Trefle inválida ou não autorizada.");
    if (resposta.status === 429) throw new Error("Limite de consultas da Trefle atingido. Aguarde um instante.");
    throw new Error(dados?.message || `Erro na consulta (${resposta.status}).`);
  }

  return dados;
}

export async function buscarPlantas(termo, pagina = 1) {
  const query = new URLSearchParams({ q: termo, page: String(pagina) });
  return requisitar(`/plants/search?${query.toString()}`);
}

export async function buscarDetalhesPlanta(identificador) {
  const resposta = await requisitar(`/plants/${encodeURIComponent(identificador)}`);
  return resposta.data || resposta;
}
