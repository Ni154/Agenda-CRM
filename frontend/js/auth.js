// LOGIN
async function login(){

 const {error}=await supabase.auth.signInWithPassword({
  email:email.value,
  password:senha.value
 })

 if(error){
  alert(error.message)
  return
 }

 window.location.href="dashboard.html"
}

// LOGOUT
async function logout(){
 await supabase.auth.signOut()
 window.location.href="index.html"
}

// PROTEÇÃO DE ROTAS
async function verificarAuth(){

 const {data}=await supabase.auth.getSession()

 if(!data.session){
  window.location.href="/index.html"
 }
}

// AUTO PROTEGER PÁGINAS INTERNAS
document.addEventListener("DOMContentLoaded",()=>{

 const pagina=window.location.pathname

 if(!pagina.includes("index.html")){
  verificarAuth()
 }

})
