const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express()

app.use(function(req, res, next) {
     res.setHeader('Access-Control-Allow-Origin', '*');
     res.setHeader('Access-Control-Allow-Methods', '*');
     res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next()
})

app.use(cors({origin:"*"}));
app.use(bodyParser.json());

const PUERTO = 9300

const conexion = mysql.createConnection(
    {
        host:'localhost',
        database:'infoabogadoss',
        user:'root',
        password:''
}
)
app.listen(PUERTO, () => {
    console.log(`Servidor corriendo en el puerto ${PUERTO}`);
})

conexion.connect(error => {
    if(error) throw error
    console.log('Conexión exitosa a la base de datos');
})


app.get('/', (req, res) => {
    res.send('API')
})

//reservaciones/*
app.post('/reservaciones', (req, res) => {
    let { 
        nombre_usuario,desc_caso,fecha,hora,Profesional,idcliente
    } = req.body

    const query = `INSERT INTO reservaciones VALUES (NULL,'${nombre_usuario}','${desc_caso}','${fecha}','${hora}','${Profesional}',${idcliente})`
    conexion.query(query, (error) => {
        if(error) return console.error(error.message);
        

        console.log ('Cita Registrada Con Exito')
        res.json('Cita Registrada Con Exito')
    })
})
app.get('/reservaciones', (req, res) => {
    const query = `SELECT * FROM reservaciones`
    conexion.query(query, (error, resultado) => {
        if(error) return console.error(error.message)

        if(resultado.length > 0) {
            res.json(resultado)
        } else {
            res.json(`No hay registros`)
        }
})
})


app.get('/reservaciones/:id_reserva', (req, res) => {
    const { id_reserva} = req.params
   
    const query = `SELECT * FROM reservaciones WHERE id_reserva=${id_reserva}`
    conexion.query(query, (error) => {
        if(error) return console.error(error.message)

        res.json(`Se actualizó correctamente la reservacion`)
})
})
app.delete('/reservaciones_eliminar/:id_reserva', (req, res) => {
    const { id_reserva } = req.params

    const query = `DELETE from reservaciones WHERE id_reserva=${id_reserva}`
    conexion.query(query, (error) => {
        if(error) return console.error(error.message)

        res.json(`Se eliminó correctamente`)
 })
})
app.put('/reservaciones_editar/:id_reserva', (req, res) => {
    const { id_reserva} = req.params
    let {
        nombre_usuario,desc_caso,fecha,hora,Profesional
    } = req.body

    const query = `UPDATE reservaciones SET nombre_usuario='${nombre_usuario}',desc_caso='${desc_caso}',Fecha='${fecha}',Hora='${hora}',Profesional='${Profesional}' WHERE id_reserva=${id_reserva}`
    conexion.query(query, (error) => {
        if(error) return console.error(error.message)

        res.json(`Se actualizó correctamente el reserva`)
})
})
// app.get('/reservaciones_obtener/:hora', (req,res) => {
//     const {hora} = req.params
 
//      const query =`select * from reservaciones where hora= '${hora}'`
 
//    conexion.query(query, (error, resultado) => {
//     if(error) return console.error(error.message)
 
//          console.log(resultado)
 
//          if(resultado.length > 0) {
//              res.json(resultado)
//          } else {
//              res.json(`No hay reservaciones`)
// }
//  })
// })





//reg/*
app.post('/login', (req, res) => {
    let { 
        id_usuario, tipo_documento,nombre,apellido,ciudad,email,contrasena
    } = req.body

    const query = `INSERT INTO login VALUES (${id_usuario},'${tipo_documento}','${nombre}','${apellido}','${ciudad}','${email}','${contrasena}','cliente')`
    conexion.query(query, (error) => {
        if(error) return console.error(error.message)

        res.json('usuario Registrado Con Exito')
    })
})
app.get('/login_get', (req, res) => {
    const query = `SELECT * FROM login`
    conexion.query(query, (error, resultado) => {
        if(error) return console.error(error.message)

        if(resultado.length > 0) {
            res.json(resultado)
        } else {
            res.json(``)
        }
})
})
app.post('/login/rol', (req,res) => {
    let   { 
          email,contrasena
      } = req.body
  
      const  query = `SELECT rol FROM login WHERE email='${email}' AND contrasena='${contrasena}';`
  
      
      conexion.query(query, (error,resultado) => {
          if(error) return console.error(error.message)
  
          if(resultado.length > 0) {
              res.json(resultado)
          } else {
              res.json('Correo o contraseña invalidas')
          }
      })
  })

app.get('/login/:id_usuario', (req, res) => {
    const { id_usuario} = req.params
   

    const query = `SELECT * FROM login WHERE id_usuario=${id_usuario}`
    conexion.query(query, (error, resultado) => {
        if(error) return console.error(error.message)

        if(resultado.length > 0) {
            res.json(resultado)
        } else {
            res.json(`No hay registros`)
        }
})
})
app.delete('/login_eliminar/:id_usuario', (req, res) => {
    const { id_usuario } = req.params

    const query = `DELETE from login WHERE id_usuario=${id_usuario}`
    conexion.query(query, (error) => {
        if(error) return console.error(error.message)

        res.json(`Se eliminó correctamente`)
 })
}) 

app.put('/login_editar/:id_usuario', (req, res) => {
    const { id_usuario} = req.params
    let {
        tipo_documento,nombre,apellido,ciudad,email,rol
    } = req.body

    const query = `UPDATE login SET tipo_documento='${tipo_documento}',nombre='${nombre}',apellido='${apellido}',ciudad='${ciudad}',email='${email}',rol='${rol}' WHERE id_usuario=${id_usuario}`
    conexion.query(query, (error) => {
        if(error) return console.error(error.message)

        res.json(`Se actualizó correctamente el usuario`)
})
})

//login

app.post('/login_validar', (req, res) => {
    let   { 
        email,contrasena
    } = req.body

    const  query = `SELECT * FROM login WHERE email='${email}' AND contrasena='${contrasena}';`

    
    conexion.query(query, (error,resultado) => {
        if(error) return console.error(error.message)

        if(resultado.length > 0) {
            res.json('Bienvenido')
        } else {
            res.json('Email o contraseña invalidas')
        }
    })
})
// citas 
app.post('/citas', (req, res) => {
    let   { 
        Profesional,fecha,hora
    } = req.body

    const  query = `SELECT * FROM citas WHERE tipo_abogado='${Profesional}' AND fecha='${fecha}' AND hora='${hora}' AND respuesta='disponible';`

    conexion.query(query, (error,resultado) => {
        if(error) return console.error(error.message)

        if(resultado.length > 0) {
            res.json('cita disponible')
        } else {
            res.json('cita no disponible')
        }
    })
})

app.put('/citas_agendar/:id_cita', (req, res) => {
    const { id_cita} = req.params
    let   { 
        respuesta,idreserva
    } = req.body

    const  query = `UPDATE citas SET respuesta='${respuesta}',idreserva=${idreserva} WHERE id_cita=${id_cita}`
    
    conexion.query(query, (error) => {
        if(error) return console.error(error.message)

        res.json(`Se actualizó el estado de la cita`)
    })
})

app.post('/citas_obtenerid', (req, res) => {
    let   { 
        Profesional,fecha,hora
    } = req.body

    const  query = `SELECT id_cita FROM citas WHERE tipo_abogado='${Profesional}' AND fecha='${fecha}' AND hora='${hora}' AND respuesta='disponible';`


    conexion.query(query, (error,resultado) => {
       
        if(error) return console.error(error.message)

        if(resultado.length > 0) {
            res.json(resultado)
        } else {
            res.json('cita no disponible')
        }
    })
})
app.get('/citas/:rol', (req, res) => {
    const {rol} = req.params
   

    const query = `SELECT * FROM citas WHERE tipo_abogado='${rol}' AND respuesta='asignada'; `
    conexion.query(query, (error, resultado) => {
        
        if(error) return console.error(error.message)

        if(resultado.length > 0) {
            res.json(resultado)
        } else {
            res.json(``)
        }
})
})
app.delete('/cita_aceptar/:id_cita', (req, res) => {
    const { id_cita} = req.params
    const query = `UPDATE citas SET respuesta='aceptada' WHERE id_cita=${id_cita}`
    conexion.query(query, (error) => {
        if(error) return console.error(error.message)

        res.json(`se aceptó la cita correctamente`)
})
})

app.delete('/cita_rechazar/:id_cita', (req, res) => {
    const { id_cita} = req.params
    const query = `UPDATE citas SET respuesta='rechazada' WHERE id_cita=${id_cita}`
    conexion.query(query, (error) => {
        if(error) return console.error(error.message)

        res.json(`se ha rechazado la cita correctamente`)
})
})
//detalles reservacion 
app.get('/cita/:id_reserva', (req, res) => {
    const { id_reserva} = req.params
   
    const query = `SELECT * FROM reservaciones WHERE id_reserva=${id_reserva}`
    conexion.query(query, (error,resultado) => {
        if(error) return console.error(error.message)

        if(resultado.length > 0) {
            res.json(resultado)
        } else {
            res.json('no hay registro')
        } 
    })
})
app.post('/reservas_obtenerid', (req, res) => {
    let { 
        nombre_usuario,desc_caso,fecha,hora,Profesional
    } = req.body

    const  query = `SELECT id_reserva FROM reservaciones WHERE profesional='${Profesional}' AND nombre_usuario='${nombre_usuario}' AND desc_caso='${desc_caso}' AND fecha='${fecha}' AND hora='${hora}';`

    conexion.query(query, (error,resultado) => {
        if(error) return console.error(error.message)

        if(resultado.length > 0) {
            res.json(resultado)
        } else {
            res.json('cita no disponible')
        }
    })
})
//administrador
app.get('/usuariolista', (req, res) => {
    
   

    const query = `SELECT * FROM login`
    conexion.query(query, (error, resultado) => {
        if(error) return console.error(error.message)

        if(resultado.length > 0) {
            res.json(resultado)
        } else {
            res.json(``)
        }
})
})
//calendario
app.get('/citalista', (req, res) => {
    
   

    const query = `SELECT * FROM citas`
    conexion.query(query, (error, resultado) => {
        if(error) return console.error(error.message)

        if(resultado.length > 0) {
            res.json(resultado)
        } else {
            res.json(``)
        }
})
})
app.get('/citas_por_identificacion/:id_cita', (req, res) => {
    const { id_cita} = req.params
   

    const query = `SELECT * FROM citas WHERE id_cita=${id_cita}`
    conexion.query(query, (error, resultado) => {
        if(error) return console.error(error.message)

        if(resultado.length > 0) {
            res.json(resultado)
        } else {
            res.json(`No hay registros`)
        }
})
})
app.put('/citas_editar/:id_cita', (req, res) => {
    const { id_cita} = req.params
    let {
        idusuario,idreserva,fecha,hora,tipo_abogado,respuesta
    } = req.body

    const query = `UPDATE citas SET idusuario=${idusuario},tipo_abogado='${tipo_abogado}',fecha='${fecha}',hora='${hora}',respuesta='${respuesta}',idreserva=${idreserva} WHERE id_cita=${id_cita}`
    conexion.query(query, (error) => {
        if(error) return console.error(error.message)

        res.json(`Se actualizó correctamente el usuario`)
})
})
app.post('/agregarcitas', (req, res) => {
    let { 
        id_cita,idusuario,tipo_abogado,fecha,hora,respuesta,
    } = req.body

    const query = `INSERT INTO citas VALUES (${id_cita},${idusuario},'${tipo_abogado}','${fecha}','${hora}','${respuesta}',NULL)`
    conexion.query(query, (error) => {
        if(error) return console.error(error.message)

        res.json('cita registrado con exito')
    })
})
//citas usuarios
app.post('/login_id_usuario', (req,res) => {
    let  { 
            email,contrasena
        } = req.body
    
    const  query = `SELECT id_usuario FROM login WHERE email='${email}' AND contrasena='${contrasena}';`
        
    conexion.query(query, (error,resultado) => {
            if(error) return console.error(error.message)
    
            if(resultado.length > 0) {
                res.json(resultado)
            } else {
                res.json('Correo o contraseña invalidas')
            }
            console.log(resultado)
        })
  })
 
  app.get('/citas_i/:idcliente', (req, res) => {
    const {idcliente} = req.params
   

    const query = `SELECT citas.id_cita,citas.idusuario,citas.tipo_abogado,citas.fecha,citas.hora,citas.respuesta,citas.idreserva FROM citas inner join reservaciones WHERE idcliente=${idcliente} AND respuesta='asignada'; `
    conexion.query(query, (error, resultado) => {
        
        if(error) return console.error(error.message)

        if(resultado.length > 0) {
            res.json(resultado)
        } else {
            res.json(``)
        }
})
})