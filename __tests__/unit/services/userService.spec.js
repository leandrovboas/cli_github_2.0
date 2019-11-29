const Github = require('../../../src/resource/github')
const UserService = require('../../../src/services/userService')
const { ExibirError } = require('../../../src/view/errorView')
const { InfoUser, FakerRequestReject, FakerRequestResolve } = require('../../utils/factories')

jest.mock('../../../src/view/errorView')

describe('Teste do user Services', () => {
    let githubResouerce = new Github()
    let userService = new UserService()
    
    test('Deve executar uma chamada no GetUserInfo e retornar as info do usuario', async () => {
        githubResouerce.request = FakerRequestResolve
        userService.resource = githubResouerce

        const response = await userService.GetInfoUsers('leandrovboas')

        expect(InfoUser).toMatchObject(response);
    })

    test('Deve executar uma chamada no GetUserInfo e retornar um objeto vazio', async () => {
        githubResouerce.request = FakerRequestReject
        userService.resource = githubResouerce

        const response = await userService.GetInfoUsers('leandrovboas')

        expect(response).toEqual({})
    })
  
      test('Deve verificar se o metodo ExibirError foi chamado no user service', async () => { 
        githubResouerce.request = FakerRequestReject
        userService.resource = {}

        await userService.GetInfoUsers('leandrovboas')
  
        expect(ExibirError).toHaveBeenCalled()
    })
  })