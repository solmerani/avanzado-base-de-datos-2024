import UsuariosService from "../services/usuarios.service.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import usuariosService from "../services/usuarios.service.js";

const register = async (req, res) => {
    try {
        //Verificar que el body de la request tenga el campo usuario
        const { nombre, apellido, email, password,  } = req.body;

        // Verificar que el campo usuario tenga los campos nombre, apellido, email y password
        if (!nombre|| !apellido || !email || !password ) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        // Verificar que no exista un usuario con el mismo email (utilizando el servicio de usuario)
       
        const CorreoEnUso = await usuariosService.getUsuarioByEmail(email);
        if (CorreoEnUso) {
            return res.status(400).json({error:"el mail ya esta en uso"})
        }

        //Hashear la contraseña antes de guardarla en la base de datos
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        console.log(
            nombre,
            apellido,
            email,
            password
        );

        // Guardar el usuario en la base de datos (utilizando el servicio de usuario)
        const usuario = await usuariosService.createUsuario(nombre, apellido, email, hashedPassword);

        // Devolver un mensaje de éxito si todo salió bien (status 201) y Devolver un mensaje de error si algo falló guardando al usuario (status 500)
        res.status(201).json(usuario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    // --------------- COMPLETAR ---------------
    /*

        Recordar que para cumplir con toda la funcionalidad deben:

            1. Verificar que el body de la request tenga el campo usuario
            2. Verificar que el campo usuario tenga los campos nombre, apellido, email y password
            3. Verificar que no exista un usuario con el mismo email (utilizando el servicio de usuario)
            4. Devolver un mensaje de error si algo falló hasta el momento (status 400)
            5. Hashear la contraseña antes de guardarla en la base de datos
            6. Guardar el usuario en la base de datos (utilizando el servicio de usuario)
            7. Devolver un mensaje de éxito si todo salió bien (status 201)
            8. Devolver un mensaje de error si algo falló guardando al usuario (status 500)
        
    */
};

const login = async (req, res) => {
    // Verificar que el body de la request tenga el campo email y password
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }
//Buscar un usuario con el email recibido
   const resultados = await usuariosService.getUsuarioByEmail(email, password);

   if (!usuario) {
       return res.status(404).json({ error: 'Usuario no existe' });
   }

   const user = resultados.rows[0];

   try {
    //Verificar que la contraseña recibida sea correcta
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        return res.status(401).json({ error: 'Contraseña incorrecta' });
    }
    //Crear un token con el id del usuario y firmarlo con la clave secreta (utilizando la librería jsonwebtoken)
    const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET || "secret_key",
        { expiresIn: "1h" }
    )
   // Devolver un json con el usuario y el token (status 200) y Devolver un mensaje de error si algo falló (status 500)
    return res.status(200).json({ resultados, token })
   } catch (err) {
    return res.status(500).json({ message: "Ocurrio un fallo en la creacion del token" });
   }

    // --------------- COMPLETAR ---------------
    /*

        Recordar que para cumplir con toda la funcionalidad deben:

            1. Verificar que el body de la request tenga el campo email y password
            2. Buscar un usuario con el email recibido
            3. Verificar que el usuario exista
            4. Verificar que la contraseña recibida sea correcta
            5. Devolver un mensaje de error si algo falló hasta el momento (status 400)
            6. Crear un token con el id del usuario y firmarlo con la clave secreta (utilizando la librería jsonwebtoken)
            7. Devolver un json con el usuario y el token (status 200)
            8. Devolver un mensaje de error si algo falló (status 500)
        
    */
};

export default { register, login };