const {Schema,model} = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const StoreSchema = new Schema({
  name: String,
  cuit: String,
  concepts: Array,
  currentBalance: Number,
  active: Boolean,
  lastSale: Date,
},{ timestamps: true });

StoreSchema.plugin(mongoosePaginate);

StoreSchema.set('toJSON', {
  transform:(document, returnedObject)=>{
      returnedObject.id= returnedObject._id
      delete returnedObject._id
      delete returnedObject.__v
      delete returnedObject.createdAt
      delete returnedObject.updatedAt
  }
})

StoreSchema.pre('save', async function (callback) {
  //completar de ser necesario
});

const Store = model('Store', StoreSchema);

module.exports = Store
