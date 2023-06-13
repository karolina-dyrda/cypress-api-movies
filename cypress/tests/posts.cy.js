/// <reference types="Cypress" />

describe("Manage posts", () => {
    it("POST /posts - Create a new post (10 posts)", () => {

        cy.fixture('posts/new').then(newPosts => {
            newPosts.forEach(newPost => {
                let postNumber = newPosts.indexOf(newPost) + 1
                
                cy.log(`Adding post number ${postNumber}`)
                cy.request('POST', 'posts', newPost).then(res => {
                    expect(res.status).to.equal(201)
                    expect(res.body.title).to.equal(newPost.title)
                    expect(res.body.body).to.equal(newPost.body)
                    expect(res.body.userId).to.equal(newPost.userId)
                })
            })
        })
    })

    it("PUT /posts/:postId - update a resource", () => {
        cy.fixture('posts/edited').then(editedPost => {

            // Get initial post data
            cy.request('GET', 'posts/1').then(initialRes => {
                expect(initialRes.body.title).to.exist
                expect(initialRes.body.title).to.not.equal(editedPost.title)
                expect(initialRes.body.body).to.exist
                expect(editedPost.body).not.to.exist

                // Update post (title only)
                cy.request('PUT', 'posts/1', editedPost).then(editedRes => {
                    expect(editedRes.status).to.equal(200)
                    expect(initialRes.body.title).to.not.equal(editedRes.body.title)
                    expect(editedRes.body.title).to.equal(editedPost.title)
                    expect(editedRes.body.body).not.to.exist
                })
            })
        })
    })

    it("PATCH /posts/:postId - patch a resource", () => {
        cy.fixture('posts/edited').then(editedPost => {

            // Get initial post data
            cy.request('GET', 'posts/1').then(initialRes => {
                expect(initialRes.body.title).to.exist
                expect(initialRes.body.title).to.not.equal(editedPost.title)
                expect(initialRes.body.body).to.exist
                expect(editedPost.body).not.to.exist

                // Update post (title only)
                cy.request('PATCH', 'posts/1', editedPost).then(editedRes => {
                    expect(editedRes.status).to.equal(200)
                    expect(initialRes.body.title).to.not.equal(editedRes.body.title)
                    expect(editedRes.body.title).to.equal(editedPost.title)
                    expect(editedRes.body.body).to.equal(initialRes.body.body)
                })
            })
        })
    })
})