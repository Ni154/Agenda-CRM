let clientes=[]

// LISTAR
async function carregarClientes(){

 const {data,error}=await supabase
 .from("clientes")
 .select("*")
 .order("nome")

 if(error){
  alert(error.message)
  return
 }

 clientes=data || []
 renderClientes(clientes)
}

// RENDER
function renderClientes(listaClientes){

 lista.innerHTML=listaClientes.map(c=>`
 <div class="card">
  <div>
   <b>${c.nome}</b><br>
   ${c.telefone || ""}
  </div>
  <div>
   <button onclick="abrirCliente('${c.id}')">Abrir</button>
  </div>
 </div>
 `).join("")
}

// BUSCA
function filtrarClientes(){

 const termo=busca.value.toLowerCase()

 const filtrados=clientes.filter(c =>
  (c.nome || "").toLowerCase().includes(termo) ||
  (c.telefone || "").includes(termo)
 )

 renderClientes(filtrados)
}

// NOVO
function novoCliente(){
 window.location.href="cliente-form.html"
}

// ABRIR
function abrirCliente(id){
 window.location.href=`cliente-detalhe.html?id=${id}`
}

// AUTO LOAD
document.addEventListener("DOMContentLoaded",()=>{
 if(typeof lista!=="undefined") carregarClientes()
})
