import express from 'express'
import {Server as SocketIOServer} from 'socket.io'
import { engine } from 'express-handlebars'
import  ProductManager  from './ProductManager.js'

const mensajesManager = new ProductManager('./database/mensajes.json')

const app = express()

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './views')

app.use(express.static('./public'))

const httpServer = app.listen(8080, ()=>{'Listen on PORT'})

const io = new SocketIOServer(httpServer)

io.on('connection', async (clientSocket)=>{
    console.log('Nuevo cliente conectado, socket id: #' + clientSocket.id)

    //controlador de nuevos mensajes
    clientSocket.on('nuevoMensaje', async mensaje => {
        // console.log(`#${clientSocket.id} dice: `) 
        // console.log(mensaje)
        await mensajesManager.addCosa({
            fecha: new Date().toLocaleString(),
            ...mensaje
        })
        io.sockets.emit('actualizarMensajes', await mensajesManager.getProducts())
    })
    io.sockets.emit('actualizarMensajes', await mensajesManager.getProducts())

    clientSocket.on('nuevoUsuario', async nombreUsuario => {
        clientSocket.broadcast.emit('nuevoUsuario', nombreUsuario)
    })
})

app.get('/', async(req, res) => {
    const mensajes = await mensajesManager.getProducts()
    res.render('mensajes', {
        pageTitle: 'Chat',
        hayMensajes : mensajes.length > 0,
        mensajes
    })
})
