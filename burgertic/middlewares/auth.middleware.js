import jwt from "jsonwebtoken";
import UsuariosService from "../services/usuarios.service.js";
import "dotenv/config";


export const verifyToken = async (req, res, next) => {
    try {
     
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: 'No token provided' });
        }


        const token = authHeader.split(' ')[1];
        if (!authHeader.startsWith('Bearer ') || !token) {
            return res.status(401).json({ message: 'Invalid token format' });
        }


        const decoded = jwt.verify(token, process.env.JWT_SECRET);
       
        if (!decoded || !decoded.userId) {
            return res.status(401).json({ message: 'Invalid token' });
        }


        req.userId = decoded.userId;
       
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized', error: error.message });
    }
 
    // --------------- COMPLETAR ---------------
    /*


        Recordar que para cumplir con toda la funcionalidad deben:


            1. Verificar si hay un token en los headers de autorización
            2. Verificar que el token esté en el formato correcto (Bearer <token>)
            3. Verificar que el token sea válido (utilizando la librería jsonwebtoken)
            4. Verificar que tenga un id de usuario al decodificarlo
   
        Recordar también que si sucede cualquier error en este proceso, deben devolver un error 401 (Unauthorized)
    */
};


export const verifyAdmin = async (req, res, next) => {
    try {
        const userId = req.userId;
       
        const user = await UsuariosService.getUsuarioById(userId);
       
        if (!user || !user.isAdmin) {
            return res.status(403).json({ message: 'Access denied: Admins only' });
        }


        next();
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
   
   
   
    // --------------- COMPLETAR ---------------
    /*


        Recordar que para cumplir con toda la funcionalidad deben:


            1. Verificar que el id de usuario en la request es un administrador (utilizando el servicio de usuarios)
            2. Si no lo es, devolver un error 403 (Forbidden)
   
    */
};


