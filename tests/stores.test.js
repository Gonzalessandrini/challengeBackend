const {
    api,
    query
} = require('./helpers')

const Store= require('../models/store')

const {seeder}= require('../utils/initializer')

beforeEach(async ()=>{
   await Store.deleteMany({})
   await seeder()
},30000)

 describe('BasicAuth', () => {

     test('with auth expect status code 200', async () => {
         await api
             .get('/api/stores?q={"page": 2, "limit": 5}')
             .auth('test@koibanx.com', 'admin')
             .expect(200)
     })

     test('without auth expect status code 401', async () => {
         await api
             .get(query)
             .expect(401)
     })

     test('with incorrect password', async () => {
         await api
             .get(query)
             .auth('test@koibanx.com', 'adminNo')
             .expect(401)
     })
 })

 describe('post stores', ()=>{
     test('create a store', async ()=>{
       const newStore= {
           name: '`Name gonzalo`',
           cuit: `11122233344`,
           concepts: [
               {
                   "number": 2,
                   "value": 54,
               },
               {
                   "number": 1,
                   "value": 41,
               },
               {
                   "number": 3,
                   "value": 10,
               },
               {
                   "number": 5,
                   "value": 78,
               },
               {
                   "number": 6,
                   "value": 98,
               },
               {
                   "number": 4,
                   "value": 3,
               }
           ],
           currentBalance: 1000,
           active: true,
           lastSale: '2020/01/23'
       }

       await api
       .post('/api/stores?q={"page": 2, "limit": 100}')
       .auth('test@koibanx.com', 'admin')
       .send(newStore)
       .expect(201)

     })
 })

describe('stores pagination test', ()=>{

     test('Total stores', async () => {

         const total= await Store.countDocuments({})

         const res = await api
             .get('/api/stores?q={"page": 5, "limit": 100}')
             .auth('test@koibanx.com', 'admin')
             .expect(200)
         expect(res.body.total).toBe(total)
     })

    test('Number of pages', async ()=>{
        const res = await api
            .get('/api/stores?q={"page": 5, "limit": 100}')
            .auth('test@koibanx.com', 'admin')
            .expect(200)

        const total= await Store.countDocuments({})   
        
        const {limit}= JSON.parse(res.req.res.text)
        
        expect(res.body.pages).toBe(Math.ceil(total/limit))
        
    })
})



