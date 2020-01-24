const UserCommand = require('../../../bin/cmds/userCommand')
const UserService = require('../../../src/services/userService')
//const { GetRepos } = require('../../src/services/reposService')
const { ExibirInfoUser } = require('../../../src/view/userView')
//const { ExibirRepos } = require('../../../src/view/reposView') 
const { ExibirJson } = require('../../../src/view/jsonView')
const { ExibirError } = require('../../../src/view/errorView')
const { InfoUser } = require('../../utils/factories')

jest.mock('../../../src/view/userView')
jest.mock('../../../src/view/reposView')
jest.mock('../../../src/view/jsonView')
jest.mock('../../../src/view/errorView')


describe('Teste do user command', () => {
    const userCommand = new UserCommand()
    
    test('Deve executar uma chamada no GetUserInfo e validar o retorno do metodo', async () => {
        const userService = {
            GetInfoUsers: () => InfoUser
        }
        userCommand.userService = userService

        const result = await userCommand.GetInfoUser('leandrovboas')

        expect(InfoUser).toMatchObject(result);
    })

    test('Deve executar uma chamada no GetUserInfo e validar uma chamada do metodo ExibirInfoUser', async () => {
        const userService = {
            GetInfoUsers: () => InfoUser
        }
        userCommand.userService = userService

        await userCommand.GetInfoUser('leandrovboas')

        expect(ExibirInfoUser).toHaveBeenCalled()
    })

    test('Deve executar uma chamada no GetUserInfo e validar uma chamada do metodo ExibirJson', async () => {
        const userService = {
            GetInfoUsers: () => InfoUser
        }
        userCommand.userService = userService

        await userCommand.GetInfoUser('leandrovboas', '', 'true')

        expect(ExibirJson).toHaveBeenCalled()
    })

    test('Deve executar uma chamada no GetUserInfo e validar uma chamada do metodo ExibirInfoUser', async () => {
        userCommand.userService = {}

        await userCommand.GetInfoUser('leandrovboas')

        expect(ExibirError).toHaveBeenCalled()
    })
})