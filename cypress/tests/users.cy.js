/// <reference types="Cypress" />

describe("Manage users", () => {
    it("GET /users - List all 10 users", () => {
        cy.request('GET', 'users')
            .then(res => {
                expect(res.status).to.equal(200)
                expect(res.body.length).to.equal(10)

                let users = [];
                res.body.forEach(user => {
                    users.push(user.name)
                });
                cy.log("All users", users)
            })
    })

    it("GET /users/:userId - Get a user (all 10 users, single call)", () => {
        let allUsersId = [];

        cy.request('GET', '/users')
            .then(res => {
                res.body.forEach(user => {
                    allUsersId.push(user.id)
                });
                    
                    allUsersId.forEach(userId => {
                        cy.request('GET', `users/${userId}`).then(res => {
                            expect(res.status).to.equal(200)
                    })
            })
        })
    })

    it("GET /users/:userId - Get non-existing user", () => {
        cy.request('GET', 'users/123').then(res => {
            expect(res.status).to.equal(404)
        })
    })
})
