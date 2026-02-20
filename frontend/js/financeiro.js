// SALVAR LANÇAMENTO
async function salvarLancamento(){

 const {error}=await supabase.from("lancamentos_financeiros").insert({
  tipo:tipo.value,
  descricao:descricao.value,
  valor:valor.value
 })

 if(error){
  alert(error.message)
  return
 }

 descricao.value=""
 valor.value=""

 listarLancamentos()
}

// LISTAR LANÇAMENTOS
async function listarLancamentos(){

 const {data,error}=await supabase
 .from("lancamentos_financeiros")
 .select("*")
 .order("created_at",{ascending:false})

 if(error){
  alert(error.message)
  return
 }

 lista.innerHTML=data.map(l=>`
 <div class="card">
  ${l.tipo.toUpperCase()} - ${l.valor}<br>
  ${l.descricao || ""}<br>
  ${new Date(l.created_at).toLocaleString()}
 </div>
 `).join("")
}

// DASHBOARD RÁPIDO
async function resumoFinanceiro(){

 const {data:r}=await supabase.from("vw_receita_total").select("*").single()
 const {data:d}=await supabase.from("vw_despesa_total").select("*").single()
 const {data:res}=await supabase.from("vw_resultado").select("*").single()

 if(receita) receita.innerText=r?.receita_total || 0
 if(despesa) despesa.innerText=d?.despesa_total || 0
 if(resultado) resultado.innerText=res?.resultado || 0
}

// AUTO LOAD
document.addEventListener("DOMContentLoaded",()=>{
 if(typeof lista!=="undefined") listarLancamentos()
})
