// RESUMO FINANCEIRO
async function carregarResumo(){

 const {data:receita}=await supabase
  .from("vw_receita_total")
  .select("*")
  .single()

 const {data:despesa}=await supabase
  .from("vw_despesa_total")
  .select("*")
  .single()

 const {data:resultado}=await supabase
  .from("vw_resultado")
  .select("*")
  .single()

 if(document.getElementById("receita"))
  receitaEl.innerText=receita?.receita_total || 0

 if(document.getElementById("despesa"))
  despesaEl.innerText=despesa?.despesa_total || 0

 if(document.getElementById("resultado"))
  resultadoEl.innerText=resultado?.resultado || 0
}

// SERVIÇOS MAIS VENDIDOS
async function topServicos(){

 const {data}=await supabase
  .from("vw_servicos_top")
  .select("*")

 if(!data) return

 listaServicos.innerHTML=data.map(s=>`
  <div class="card">
   ${s.nome} - ${s.quantidade}
  </div>
 `).join("")
}

// PRODUTOS MAIS VENDIDOS
async function topProdutos(){

 const {data}=await supabase
  .from("vw_produtos_top")
  .select("*")

 if(!data) return

 listaProdutos.innerHTML=data.map(p=>`
  <div class="card">
   ${p.nome} - ${p.quantidade}
  </div>
 `).join("")
}

// ESTOQUE BAIXO
async function estoqueBaixo(){

 const {data}=await supabase
  .from("vw_estoque_baixo")
  .select("*")

 if(!data) return

 listaEstoque.innerHTML=data.map(e=>`
  <div class="card">
   ${e.nome} - Atual: ${e.estoque_atual}
  </div>
 `).join("")
}

// AUTO LOAD
document.addEventListener("DOMContentLoaded",()=>{
 if(typeof receitaEl!=="undefined") carregarResumo()
})
