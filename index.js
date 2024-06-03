
const mongouri = 'mongodb://localhost:27017/dkstore'
const mongoose = require('mongoose')
const Producto = require('./models/producto.js')
const articulo = require('./models/articulo.js')
const Marca = require('./models/marca.js')
const categoria = require('./models/categoria.js')
const caracteristica = require('./models/caracteristica.js')

mongoose.connect(mongouri).then(db => console.log('DB is Conneted')).catch( err => {
    console.log(err)
})

let Inventario = require('./models/inventario.js')
async function getinventario(){
    let inv =  await Inventario.findAll({ order: [['Referencia', 'DESC']]})
   
    return inv
}

async function update(){
    let total = 0;
    let inventario = await  getinventario();
    for(let ar of inventario){
        let unidad = ar.dataValues
        let art = await  articulo.findOne({sap:unidad.Referencia})
        if(art){
            art.status = unidad.Disponible;
            art.precio = unidad.Precio;
            art.promo = unidad.TienePromocion;
            if(unidad.CantidadVendida){
                art.uv = unidad.CantidadVendida; 
            }else{
                art.uv = 0; 
            }
             
            await art.save()
        }else{
        if(unidad.Disponible){
            art = new articulo()
            art.sap = unidad.Referencia;
            art.status = unidad.Disponible;
            if(unidad.CantidadVendida){
                art.uv = unidad.CantidadVendida; 
            }else{
                art.uv = 0; 
            }      
            art.precio = unidad.Precio;
            
            art.marca = unidad.Marca;
            art.familia = unidad.Linea;
            art.promo = unidad.TienePromocion;
            art.categoria = unidad.familia;
            await art.save()
           let  prod = new Producto();
           prod.sap = unidad.Referencia;  
           prod.descripcion = unidad.Nombre;
           prod.linea = unidad.Linea;
           await prod.save()
           
        }



           
        }
        total = total + 1
        console.log(total)
    }
    console.log("listo", new Date())
}

async function delay( ms, state = null ) {
    
    return new Promise( ( resolve, reject ) => {
       setTimeout( () => resolve( state ), ms );
    } );
}

async function siclo(){
    let inter = true
    while( inter ) {
        
   try{
    await  update()

    await delay(7200000 );
   }catch(err){
    console.log(err)
    inter = false
   }
    }
    /*
    setInterval( await update(),14400000) */
}
//

siclo()

 /*
    let siclo = async () => {
        await new Promise(resolve => setInterval(() => resolve(update()), ));
     
      }
    

//
siclo()
*/

