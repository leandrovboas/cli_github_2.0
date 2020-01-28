const Github = require('../../../src/resource/github')
const { ExibirError } = require('../../../src/view/errorView')
const { InfoUser, FakerRequestReject, FakerRequestResolve } = require('../../utils/factories')

jest.mock('../../../src/view/errorView')

describe('Github resource', () => {
  let githubResouerce = new Github()
  
    test('Realizando um chamada no github resourse', async () => {
      const FakerRequestResolve = { 
        get: () => Promise.resolve({data: InfoUser})
      }

        githubResouerce.request = FakerRequestResolve
        const response = await githubResouerce.GetInfoGithub('users/leandrovboas')

        expect(InfoUser).toMatchObject(response.data);
    })

    test('Realizando um chamada no github resourse retornando erro', async () => {
      const FakerRequestReject = {
        get: () => Promise.reject({message:'Not Found'} )
      }

        githubResouerce.request = FakerRequestReject
        const response = await githubResouerce.GetInfoGithub('notFound');

        expect(response.error).toEqual('Not Found')
    })

    test('Deve verificar se o metodo ExibirError foi chamado', async () => { 
      const FakerRequestReject = {
        get: () => Promise.reject({message:'Not Found'} )
      }

      githubResouerce.request = FakerRequestReject
      await githubResouerce.GetInfoGithub('/teste');

      expect(ExibirError).toHaveBeenCalled()
  })
})