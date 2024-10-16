
const mongouri = 'mongodb://localhost:27017/dkstore'

const mongoose = require('mongoose')
const Producto = require('./models/producto.js')
const articulo = require('./models/articulo.js')
const img = require('./models/img.js')
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
    let imagen = null
    let total = 0;
    let inventario = await  getinventario();
    for(let ar of inventario){
        let unidad = ar.dataValues
       let  repuesto = false;
        if(unidad.Referencia[0] == '3'){
            repuesto = true
        }
        let art = await  articulo.findOne({sap:unidad.Referencia})
        
        if(art){
            imagen = await  img.findOne({sap:unidad.Referencia})
           
            art.status = false;  
            if(imagen){
                if(imagen.status && unidad.DisponibleTienda || unidad.DisponibleCDD ){
                   
               art.status = unidad.DisponibleTienda || unidad.DisponibleCDD ;  
              
               
            }
        }
            art.precio = Math.round(unidad.Precio);
            if( art.precio < 1){
                art.status = false
            }
            art.promo = unidad.TienePromocion;
            if(unidad.CantidadVendida){
                art.uv = unidad.CantidadVendida; 
            }else{
                art.uv = 0; 
            }

             let prod = await Producto.findOne({sap:unidad.Referencia})
             if(prod){
                if(repuesto){
                    prod.linea = 'repuesto';
                   
                }
                  prod.status =  art.status
                 await  prod.save()
             }
             if(repuesto){

                 art.familia = 'repuesto';
            if(unidad.Referencia[0] == '3' && unidad.Referencia[0] == '1' ){
              art.categoria = 'repuesto';
            }else{
                art.categoria = 'accesorios';
            }
                
            }
           console.log( unidad.Referencia,"guardado")
            await art.save()
        }else{
        if(unidad.DisponibleTienda || unidad.DisponibleCDD ){
            art = new articulo()
            art.sap = unidad.Referencia;
            
            imagen = await img.findOne({sap:unidad.Referencia})
          
            art.status = false; 
             
            if(imagen){
                if(imagen.status && unidad.DisponibleTienda || unidad.DisponibleCDD){
                    
                   
               art.status = unidad.DisponibleTienda || unidad.DisponibleCDD;  
               if( art.precio < 1){
                art.status = false
            }
              
            }
        }
            if(unidad.CantidadVendida){
                art.uv = unidad.CantidadVendida; 
            }else{
                art.uv = 0; 
            }      
            art.precio =  Math.round(unidad.Precio);
            if( art.precio < 1){
                art.status = false
            }
          
            art.marca = unidad.Marca;
            art.familia = unidad.Linea;
            art.promo = unidad.TienePromocion;
            art.categoria = unidad.familia;
            if(repuesto){
                art.familia = 'repuesto';
                art.categoria = 'repuesto';
            }
            console.log(unidad.Referencia,"guardado")
            await art.save()
           let  prod = new Producto();

           prod.status = art.status;  
           if( art.precio < 1){
            prod.status = false
        }
           prod.sap = unidad.Referencia; 
           prod.descripcion = unidad.Nombre;
           prod.linea = unidad.Linea;
           if(repuesto){
            prod.linea = 'repuesto';
        }
       
           await prod.save()
           
        }



           
        }
      //  console.clear()
        total = total + 1
      //  console.log( "actualizando ->"+ total+" Productos")
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

    await delay(14400000 );
   }catch(err){
    console.log(err)
   // inter = false
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

