const nock = require('nock')
const UserCommand = require('../../bin/cmds/userCommand')
const {InfoUser}  = require('../utils/factories')

jest.mock('../../src/view/userView')

describe( 'Teste integrado da chamada de usuario', () => {  
    beforeAll(() => {
        nock.cleanAll()
    }) 
    
    afterEach(() =>{
        nock.cleanAll()
    })
    
    test('Deve realizar um teste end to end na consulta de usuario', async () => {
        nock('https://api.github.com')
        .defaultReplyHeaders({'Access-Control-Allow-Origin': 'true'})
        .get('/users/leandrovboas')
        .reply(200, InfoUser)
        
        const userCommand = new UserCommand()
        const result = await userCommand.GetInfoUser('leandrovboas')
        expect(InfoUser).toMatchObject(result);
    })
})