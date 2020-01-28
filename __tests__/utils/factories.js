const faker = require('faker')
const DadosUsuario = require('../../src/module/DadosUsuario.js')
const DadosRepos = require('../../src/module/dadosRepos.js')

const InfoRepo = new DadosRepos (
       faker.name.firstName(),
       faker.internet.url(),
       faker.lorem.paragraph(),
       faker.internet.url()
)

const InfoUser = new DadosUsuario(
        faker.name.findName(),
        faker.lorem.paragraph(),
        faker.company.companyName(),
        faker.internet.url()
)

const ListRepos = [InfoRepo, InfoRepo, InfoRepo]

module.exports = {
    InfoUser,
    InfoRepo,
    ListRepos
}