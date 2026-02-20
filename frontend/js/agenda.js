
async function carregarAgenda(){

 const {data}=await supabase
 .from("agendamentos")
 .select(`
   id,
   data_hora,
   status,
   clientes(nome),
   servicos(nome)
 `)
 .order("data_hora",{ascending:true})

 if(!data) return

 lista.innerHTML=data.map(a=>`
 <div class="card">
  <b>${a.clientes?.nome || "-"}</b><br>
  ${a.servicos?.nome || "-"}<br>
  ${new Date(a.data_hora).toLocaleString()}<br>
  Status: ${a.status}
 </div>
 `).join("")
}

function novoAgendamento(){
 window.location.href="agendamento-form.html"
}

document.addEventListener("DOMContentLoaded",()=>{
 if(typeof lista!=="undefined") carregarAgenda()
})
