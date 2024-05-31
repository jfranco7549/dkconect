let { DataTypes } = require('sequelize');
let db = require('../conect.js')
const Inventario = db.define('DisponibleEcommerce',
    {
        Referencia:{
            primaryKey: true,
            type:DataTypes.STRING
        },
        Nombre:{
            type:DataTypes.STRING
        },
        Linea:{
            type:DataTypes.STRING
        },
        familia:{
            type:DataTypes.STRING
        },
        Inventario:{
            type:DataTypes.STRING
        },
        InventarioCDD:{
            type:DataTypes.STRING
        },
        InventarioTiendas:{
            type:DataTypes.STRING
        },
        Precio:{
            type:DataTypes.STRING
        },
        Minimo:{
            type:DataTypes.STRING
        },
        Marca:{
            type:DataTypes.STRING
        },
        Disponible:{
            type:DataTypes.BOOLEAN
        },
        TienePromocion:{
            type:DataTypes.BOOLEAN
        },
        CantidadVendida:{
            type:DataTypes.STRING
        },
        FechaActualizacion:{
            type:DataTypes.STRING
        },
    
    },{

        // don't add the timestamp attributes (updatedAt, createdAt)
        timestamps: false,
        id:false,
        // If don't want createdAt
        createdAt: false,
        freezeTableName: true,
        // If don't want updatedAt
        updatedAt: false,
      
        // your other configuration here
      
      }, { tableName: 'DisponibleEcommerce' }
)
module.exports = Inventario;