const faker = require('faker')

const InfoUser = {
        name: faker.name.findName(),
        bio: faker.lorem.paragraph(),
        company: faker.company.companyName(),
        repos_url: faker.internet.url()
    }

 const InfoRepo = {
        name: faker.name.firstName(),
        clone_url: faker.internet.url(),
        description: faker.lorem.paragraph(),
        html_url: faker.internet.url()
    }

const ListRepos = [
    {name: faker.name.firstName(), clone_url: faker.internet.url()},
    {name: faker.name.firstName(), clone_url: faker.internet.url()}
    ]

const FakerRequestReject = {
        get: () => Promise.reject({message:'Not Found'} )
    }

const FakerRequestResolve = {
        get: () => Promise.resolve({data: InfoUser})
    }

module.exports = {
    InfoUser,
    InfoRepo,
    ListRepos,
    FakerRequestReject,
    FakerRequestResolve
}