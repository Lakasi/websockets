// @ts-ignore
const serverSocket = io('http://localhost:8080/')


// @ts-ignore
Swal.fire({
    title: 'Ingresa tu usuario',
    input: 'text',
    inputValidator:(value)=>{  
        return !value && '¡No ingresaste ningun usario!'
    },
    allowOutsideClick: false
}).then(result => {
    const inputAutor = document.querySelector('#inputAutor')
    if(!(inputAutor instanceof HTMLInputElement)) return
    inputAutor.value = result.value
    serverSocket.emit('nuevoUsuario', inputAutor.value)
})


const btn = document.getElementById('btnEnviar')

if(btn){
    btn.addEventListener(
        'click',
        (event)=>{
            // const inputAutor = document.querySelector('#inputAutor')
            const inputMensaje = document.querySelector('#inputMensaje')
            if(inputMensaje){
                // @ts-ignore
                const autor = inputAutor.value 
                // @ts-ignore
                const mensaje = inputMensaje.value
                serverSocket.emit('nuevoMensaje', {autor, mensaje})
                // @ts-ignore
                inputMensaje.value = ''
            }
        }
    )
} 

const plantillaMensajes = `
{{#if hayMensajes}}
<ul>
    {{#each mensajes}}
    <li>({{this.fecha}}) {{this.autor}} : {{this.mensaje}}</li>
    {{/each}}
</ul>
{{else}}
<p>No hay mensajes...</p>
{{/if}}`

const armarHtmlMensajes = Handlebars.compile(plantillaMensajes)

serverSocket.on('actualizarMensajes', mensajes => {
    const divMensajes = document.querySelector('#mensajes')
    if(divMensajes){
        // divMensajes.innerHTML = JSON.stringify(mensajes)
        divMensajes.innerHTML = armarHtmlMensajes({mensajes, hayMensajes: mensajes.length > 0})
    }
})

serverSocket.on('nuevoUsuario', nombreUsuario => {
    // @ts-ignore
    Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        title: `${nombreUsuario} se ha unido al chat`,
        icon: 'success'
    })
})