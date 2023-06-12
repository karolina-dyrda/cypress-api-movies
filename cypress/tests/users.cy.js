describe("Get users", () => {
    it("Get all 10 users and list them", () => {
        cy.request('GET', '/users')
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

    it("Get a single user", () => {
        let allUsersId = [];

        cy.request('GET', '/users')
            .then(res => {
                res.body.forEach(user => {
                    allUsersId.push(user.id)
                });
                    
                    allUsersId.forEach(userId => {
                        cy.request('GET', `/users/${userId}`).then(res => {
                            expect(res.status).to.equal(200)
                    })
            })
        })
    })
})