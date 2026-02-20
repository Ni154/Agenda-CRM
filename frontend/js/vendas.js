let vendaId=null

// CRIAR VENDA
async function criarVenda(clienteId){

 const {data,error}=await supabase
  .from("vendas")
  .insert({
   cliente_id:clienteId,
   status:"aberta"
  })
  .select()
  .single()

 if(error){
  alert(error.message)
  return
 }

 vendaId=data.id
 alert("Venda criada")
}

// ADICIONAR ITEM
async function adicionarItem(tipoItem, referenciaId, quantidade, preco){

 if(!vendaId){
  alert("Crie a venda primeiro")
  return
 }

 const {error}=await supabase
  .from("itens_venda")
  .insert({
   venda_id:vendaId,
   tipo:tipoItem,
   referencia_id:referenciaId,
   quantidade:quantidade,
   preco:preco
  })

 if(error){
  alert(error.message)
  return
 }

 carregarItens()
}

// LISTAR ITENS
async function carregarItens(){

 const {data}=await supabase
  .from("itens_venda")
  .select("*")
  .eq("venda_id",vendaId)

 if(!data) return

 itens.innerHTML=data.map(i=>`
  <div class="card">
   ${i.tipo} - ${i.quantidade} x ${i.preco}
  </div>
 `).join("")

 atualizarTotal()
}

// ATUALIZAR TOTAL
async function atualizarTotal(){

 const {data}=await supabase
  .from("vendas")
  .select("total")
  .eq("id",vendaId)
  .single()

 if(data && total)
  total.innerText=data.total
}

// FECHAR VENDA
async function fecharVenda(){

 if(!vendaId) return

 await supabase
  .from("vendas")
  .update({status:"fechada"})
  .eq("id",vendaId)

 alert("Venda fechada")
 window.location.href="vendas.html"
}
