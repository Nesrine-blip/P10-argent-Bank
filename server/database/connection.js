const mongoose = require('mongoose')

module.exports = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/argentBankDB', { 
      useNewUrlParser: true,
      useUnifiedTopology: true 
    })
    console.log('✅ Database successfully connected')
  } catch (error) {
    console.error(` Database Connectivity Error: ${error}`)
    throw new Error(error)
  }
}