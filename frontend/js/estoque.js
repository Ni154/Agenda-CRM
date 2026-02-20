// LISTAR PRODUTOS
async function listarProdutos(){

 const {data,error}=await supabase
 .from("produtos")
 .select("*")
 .order("nome")

 if(error){
  alert(error.message)
  return
 }

 lista.innerHTML=data.map(p=>`
 <div class="card">
  <b>${p.nome}</b><br>
  Tipo: ${p.tipo}<br>
  Estoque: ${p.estoque_atual}
 </div>
 `).join("")
}

// CARREGAR SELECT PRODUTOS
async function carregarSelectProdutos(){

 const {data}=await supabase.from("produtos").select("id,nome").order("nome")

 if(produto)
  produto.innerHTML=data.map(p=>`<option value="${p.id}">${p.nome}</option>`)
}

// REGISTRAR MOVIMENTAÇÃO
async function registrarMovimentacao(){

 const {error}=await supabase.from("movimentacoes_estoque").insert({
  produto_id:produto.value,
  tipo:tipo.value,
  quantidade:qtd.value,
  origem:origem.value
 })

 if(error){
  alert(error.message)
  return
 }

 alert("Movimentação registrada")
}

// HISTÓRICO
async function listarMovimentacoes(){

 const {data}=await supabase
 .from("movimentacoes_estoque")
 .select("tipo,quantidade,origem,created_at,produtos(nome)")
 .order("created_at",{ascending:false})

 lista.innerHTML=data.map(m=>`
 <div class="card">
  ${m.produtos?.nome} - ${m.tipo} - ${m.quantidade}<br>
  ${m.origem || ""}<br>
  ${new Date(m.created_at).toLocaleString()}
 </div>
 `).join("")
}

// AUTO LOAD
document.addEventListener("DOMContentLoaded",()=>{
 if(typeof produto!=="undefined") carregarSelectProdutos()
})
