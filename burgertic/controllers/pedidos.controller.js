import pedidosService from "../services/pedidos.service.js";
import PedidosService from "../services/pedidos.service.js";

const getPedidos = async (req, res) => {
     // --------------- COMPLETAR ---------------
    /*
        Recordar que para cumplir con toda la funcionalidad deben:

            1. Utilizar el servicio de pedidos para obtener todos los pedidos
            2. Devolver un json con los pedidos (status 200)
            3. Devolver un mensaje de error si algo falló (status 500)
        
    */
        try {
            const Pedidos = await PedidosService.getPedidos();
            res.status(200).json(Pedidos);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
};

const getPedidosByUser = async (req, res) => {


    // --------------- COMPLETAR ---------------
    /*
        Recordar que para cumplir con toda la funcionalidad deben:

            1. Utilizar el servicio de pedidos para obtener los pedidos del usuario
            2. Si el usuario no tiene pedidos, devolver un mensaje de error (status 404)
            3. Si el usuario tiene pedidos, devolver un json con los pedidos (status 200)
            4. Devolver un mensaje de error si algo falló (status 500)
        
    */
     const { user } = req.params;

   try{
    const pedido = await PedidosService.getPedidosByUser(user);
    if(!pedido|| pedidos.length === 0){
        return res.json(pedido)({ message: "El usuario no tiene pedidos" });
    }
    res.status(200).json({pedido})
   }catch(error){
    res.status(500).json({message: error.message});
   }
};

const getPedidoById = async (req, res) => {
    // --------------- COMPLETAR ---------------
    /*
        Recordar que para cumplir con toda la funcionalidad deben:

            1. Utilizar el servicio de pedidos para obtener el pedido por id (utilizando el id recibido en los parámetros de la request)
            2. Si el pedido no existe, devolver un mensaje de error (status 404)
            3. Si el pedido existe, devolver un json con el pedido (status 200)
            4. Devolver un mensaje de error si algo falló (status 500)
        
    */
    const { id } = req.params;

    if (!id) return res.status(404).json({ message: "Se necesita un ID" });
        
    try {
        const pedido = await PedidosService.getPedidoById(id);
        if (!pedido)
            return res.status(404).json({ message: "Pedido no encontrado" });
        res.json(pedido);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createPedido = async (req, res) => {
    const pedido = req.body;

    if (!pedido.platos){
        return res.status(400).json({ message: "El campo 'platos' es requerido" });
    }

    if(!Array.isArray(pedido.platos)){
        return res.status(400).json({ message: "'platos' debe ser un array" });
    }

    if(!pedido){
        return res.status(400).json({message:"el array de productos debe tener al menos un producto"});
    }
    for (let plato of pedido.platos) {
        if (!plato.id || !plato.cantidad) {
            return res.status(400).json({ message: "Cada plato debe tener un 'id' y una 'cantidad'" });
        }}
    try {
        await PedidosService.createPedido(pedido.id_usuario, pedido.platos);
        res.status(201).json({ message: "Pedido creado con éxito" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    // --------------- COMPLETAR ---------------
    /*
        Recordar que para cumplir con toda la funcionalidad deben:

            1. Verificar que el body de la request tenga el campo platos
            2. Verificar que el campo productos sea un array
            3. Verificar que el array de productos tenga al menos un producto
            4. Verificar que todos los productos tengan un id y una cantidad
            5. Si algo de lo anterior no se cumple, devolver un mensaje de error (status 400)
            6. Crear un pedido con los productos recibidos y el id del usuario (utilizando el servicio de pedidos)
            7. Devolver un mensaje de éxito (status 201)
            8. Devolver un mensaje de error si algo falló (status 500)
        
    */
};

const aceptarPedido = async (req, res) => {
    const { id } = req.params;

    if (!id) return res.status(404).json({ message: "Se necesita un ID" });

    try {
        const pedido = await PedidosService.getPedidoById(id);
        if (!pedido) {
            return res.status(404).json({ message: "Pedido no encontrado" });
        }
        const pedidoEstado = pedido.estado;
        if (pedidoEstado !== "pendiente") {
            return res.status(400).json({ message: "El pedido no está en estado pendiente" });
        }
        await PedidosService.updatePedido(id, "aceptado");
        res.status(200).json({ message: "Pedido aceptado con éxito" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    // --------------- COMPLETAR ---------------
    /*
        Recordar que para cumplir con toda la funcionalidad deben:

            1. Utilizar el servicio de pedidos para obtener el pedido por id (utilizando el id recibido en los parámetros de la request)
            2. Si el pedido no existe, devolver un mensaje de error (status 404)
            3. Si el pedido existe, verificar que el pedido esté en estado "pendiente"
            4. Si el pedido no está en estado "pendiente", devolver un mensaje de error (status 400)
            5. Si el pedido está en estado "pendiente", actualizar el estado del pedido a "aceptado"
            6. Devolver un mensaje de éxito (status 200)
            7. Devolver un mensaje de error si algo falló (status 500)
        
    */
};

const comenzarPedido = async (req, res) => {
    const { id } = req.params;

    if (!id) return res.status(404).json({ message: "Se necesita un ID" });

    try {
        const pedido = await PedidosService.getPedidoById(id);
        if (!pedido) {
            return res.status(404).json({ message: "Pedido no encontrado" });
        }
        const pedidoEstado = pedido.estado;
        if (pedidoEstado !== "aceptado") {
            return res.status(400).json({ message: "El pedido no está aceptado" });
        }
        await PedidosService.updatePedido(id, "en camino");
        res.status(200).json({ message: "Pedido en camino" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    // --------------- COMPLETAR ---------------
    /*
        Recordar que para cumplir con toda la funcionalidad deben:

            1. Utilizar el servicio de pedidos para obtener el pedido por id (utilizando el id recibido en los parámetros de la request)
            2. Si el pedido no existe, devolver un mensaje de error (status 404)
            3. Si el pedido existe, verificar que el pedido esté en estado "aceptado"
            4. Si el pedido no está en estado "aceptado", devolver un mensaje de error (status 400)
            5. Si el pedido está en estado "aceptado", actualizar el estado del pedido a "en camino"
            6. Devolver un mensaje de éxito (status 200)
            7. Devolver un mensaje de error si algo falló (status 500)
        
    */
};

const entregarPedido = async (req, res) => {
    const { id } = req.params;

    if (!id) return res.status(404).json({ message: "Se necesita un ID" });

    try {
        const pedido = await PedidosService.getPedidoById(id);
        if (!pedido) {
            return res.status(404).json({ message: "Pedido no encontrado" });
        }
        const pedidoEstado = pedido.estado;
        if (pedidoEstado !== "en camino") {
            return res.status(400).json({ message: "El pedido no está en camino" });
        }
        await PedidosService.updatePedido(id, "entregado");
        res.status(200).json({ message: "Pedido entregado" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    // --------------- COMPLETAR ---------------
    /*
        Recordar que para cumplir con toda la funcionalidad deben:

            1. Utilizar el servicio de pedidos para obtener el pedido por id (utilizando el id recibido en los parámetros de la request)
            2. Si el pedido no existe, devolver un mensaje de error (status 404)
            3. Si el pedido existe, verificar que el pedido esté en estado "en camino"
            4. Si el pedido no está en estado "en camino", devolver un mensaje de error (status 400)
            5. Si el pedido está en estado "en camino", actualizar el estado del pedido a "entregado"
            6. Devolver un mensaje de éxito (status 200)
            7. Devolver un mensaje de error si algo falló (status 500)
        
    */
};

const deletePedido = async (req, res) => {
    // --------------- COMPLETAR ---------------
    /*
        Recordar que para cumplir con toda la funcionalidad deben:

            1. Utilizar el servicio de pedidos para obtener el pedido por id (utilizando el id recibido en los parámetros de la request)
            2. Si el pedido no existe, devolver un mensaje de error (status 404)
            3. Si el pedido existe, eliminar el pedido
            4. Devolver un mensaje de éxito (status 200)
            5. Devolver un mensaje de error si algo falló (status 500)
        
    */
            const { id } = req.params;
        
            try {
                const pedido = await PedidosService.getPedidoById(id);
                if (!pedido){
                    return res.status(404).json({ message: "Pedido no encontrado" });
                }
                else {
                    await PedidosService.deletePedido(id);
                    return res.status(201).json({message:"Pedido eliminado correctamente"})
                }    
                
            } catch (error) {
                res.status(500).json({ message: error.message });
            }
};

export default {
    getPedidos,
    getPedidosByUser,
    getPedidoById,
    createPedido,
    aceptarPedido,
    comenzarPedido,
    entregarPedido,
    deletePedido,
};
