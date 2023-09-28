const Store= require('../models/store')

const getAll= async (req, res,next)=>{
    try{
        const { page, limit } = JSON.parse(req.query.q)
        const data= await Store.paginate({},{limit, page})
        const response= parseData(data)
        res.send(response)

    }catch(err){
        next(err)
    }
}

const createStore= async (request,response,next)=>{
  
    try{
        const {name, cuit, concepts,currentBalance, active }= request.body
  
        const store= new Store({
            name,
            cuit,
            concepts,
            currentBalance,
            active,
            lastSale: new Date()
        })
  
        const savedStore= await store.save()
        response.status(201).json(savedStore)
  
    }catch(err){next(err)}
    
}

const parseData= (data)=>{
    return {
        data: data.docs,
        page:data.page,
        pages:data.totalPages,
        limit:data.limit,
        total:data.totalDocs
    }
}

module.exports={getAll,createStore}