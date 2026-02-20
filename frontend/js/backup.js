
async function exportarTabela(tabela){

 const {data,error}=await supabase.from(tabela).select("*")

 if(error){
  alert(error.message)
  return
 }

 if(!data || !data.length){
  alert("Sem dados para exportar")
  return
 }

 const csv = [
  Object.keys(data[0]).join(","),
  ...data.map(o=>Object.values(o).join(","))
 ].join("\n")

 const blob=new Blob([csv],{type:"text/csv"})
 const a=document.createElement("a")
 a.href=URL.createObjectURL(blob)
 a.download=`${tabela}.csv`
 a.click()
}

// Atalhos rápidos
function exportarClientes(){ exportarTabela("clientes") }
function exportarAgendamentos(){ exportarTabela("agendamentos") }
function exportarVendas(){ exportarTabela("vendas") }
function exportarFinanceiro(){ exportarTabela("lancamentos_financeiros") }
