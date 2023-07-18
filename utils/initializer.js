const User = require('../models/user')
const logger = require('../utils/logger')
const Store = require('../models/store')

const init = async function () {

    if (await User.countDocuments({ 'username': 'test@koibanx.com' })) {
        
        return
    }

    await seeder()

    let user = new User()
    user.username = 'test@koibanx.com'
    user.password = 'admin'
    await User.create(user)

    logger.info('Test User created')
}

const seeder = async () => {

    const limit=100

    for (let i = 0; i < limit; i++) {
        const store = {
            name: `Name${i}`,
            cuit: '11122233344',
            concepts: [
                {
                    'number': 2,
                    'value': 54,
                },
                {
                    'number': 1,
                    'value': 41,
                },
                {
                    'number': 3,
                    'value': 10,
                },
                {
                    'number': 5,
                    'value': 78,
                },
                {
                    'number': 6,
                    'value': 98,
                },
                {
                    'number': 4,
                    'value': 3,
                }
            ],
            currentBalance: 1000,
            active: true,
            lastSale: '2020/01/23'
        }
        await storeFormatted.save()
        const storeFormatted = new Store(store)
        
    }

    logger.info(`${limit} stores has been created`)
}

module.exports = { seeder, init }