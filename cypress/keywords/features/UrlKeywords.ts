/// <reference types="cypress" />
import { TableDefinition } from "cucumber";
import { Given, Then, When, And } from "cypress-cucumber-preprocessor/steps";
import { when } from "cypress/types/jquery";
import CommonPage from "../pages/CommonPage";

And("user fill url as {string} and description as {string}", (long_url: string, description: string) => {
    cy.get("#description").type(description);
    cy.get("#long_url").type(long_url);
});

When("user click generate url", () => {
    cy.get("#generate-btn").click();
});

Then("user see the short url", () => {
    CommonPage.verifyPageContain("URL created!")
    cy.wait(1000);
    cy.get("#short_url_output").invoke('val').then((val:any) => {
        let short_url_output = val.substring(val.length-5,val.length)
        sessionStorage.setItem('short_url_output',short_url_output)
        expect(val?.toString().length).to.be.at.least(5)
    })
});

When("user open short url and see web page contents of {string}",(content: string)=>{
    cy.get("#short_url_output").invoke('val').then((val: any) => {
        cy.request(val).its('body').should('include', content)
    })
})

When("user click URL tab",()=>{
    cy.get("#url-nav").click();
})

And("user search for the url", ()=>{
    let short_url_output = sessionStorage.getItem('short_url_output') as any
    cy.get("#url_list_filter > label > input[type=search]").type(short_url_output)
})

Then("user should see the short url with long_url as {string} and description as {string}",(long_url: string, description: string)=>{
    let short_url_output = sessionStorage.getItem('short_url_output') as any
    CommonPage.verifyPageContain(short_url_output);
    CommonPage.verifyPageContain(long_url);
    CommonPage.verifyPageContain(description);
})

// Delete the URL
When("user click delete button", ()=>{
    cy.get("#url_list > tbody > tr > td:nth-child(7) > button.btn.btn-sm.btn-danger").click();
    cy.get("#confirm-delete-btn").click();
})

Then("user should not see the short url",()=>{
    CommonPage.verifyPageContain("URL has been deleted!");
    let short_url_output = sessionStorage.getItem('short_url_output') as any
    CommonPage.verifyPageNotContain(short_url_output);  
    CommonPage.verifyPageContain("No matching records found")
})


// Privatise the URL
When("user click privatise button", ()=>{
    cy.get("#url_list > tbody > tr:nth-child(1) > td:nth-child(6) > button.btn.btn-sm.btn-outline-danger").click();
    cy.get("#privatise-url-btn").click();
})
Then("user should see the url is private", ()=>{
 CommonPage.verifyPageContain("URL is private!")
 cy.get("#url_list > tbody > tr > td:nth-child(5) > div").invoke('text').then((t)=>{
    expect(t).to.eqls("Private")
 })
})

// publicise the URL
When("user click publicise button", ()=>{
    cy.get("#url_list > tbody > tr:nth-child(1) > td:nth-child(6) > button.btn.btn-sm.btn-outline-primary").click();
    cy.get("#open-url-btn").click();
})
Then("user should see the url is public", ()=>{
    CommonPage.verifyPageContain("URL is public!")
    cy.get("#url_list > tbody > tr > td:nth-child(5) > div").invoke('text').then((t)=>{
       expect(t).to.eqls("Public")
    })
})

// Lock the URL
When("user click lock button and fill password as {string}", (password:string)=>{
    cy.get("#url_list > tbody > tr:nth-child(1) > td:nth-child(6) > button.btn.btn-sm.btn-outline-warning").click();
    cy.get("#url-password").type(password);
    cy.get("#lock-url-btn").click();
})
Then("user should see the url is locked", ()=>{
    CommonPage.verifyPageContain("URL Locked!")
    cy.get("#url_list > tbody > tr > td:nth-child(5) > div").invoke('text').then((t)=>{
        expect(t).to.eqls("Lock")
     })
})

// Share the URL
When("user click lock button and share email to {string}", (email:string)=>{
    cy.get("#url_list > tbody > tr:nth-child(1) > td:nth-child(6) > button.btn.btn-sm.btn-outline-info").click();
    cy.get("#form-share-url > div.modal-body > a").click();
    cy.get("#new-shared-email-input").type(email);
    cy.get("#form-share-url > div.modal-body > a").click();
    cy.get("#share-url-btn").click();
})

Then("user should see the url is shared", ()=>{
    CommonPage.verifyPageContain("URL Shared!")
    cy.get("#url_list > tbody > tr > td:nth-child(5) > div").invoke('text').then((t)=>{
        expect(t).to.eqls("Shared")
     })
})

When("user click send invitation with message as {string}", (message)=>{
    cy.get("#url_list > tbody > tr:nth-child(1) > td:nth-child(7) > button.btn.btn-sm.btn-primary.mx-1").click();
    cy.get("#invite-message").type(message);
    cy.get("#invite-url-btn").click();
})

And("user see invitation is sent", ()=>{
    CommonPage.verifyPageContain("Invitation sent!")
})

// Update
When("user click update button",()=>{
    cy.get("#url_list > tbody > tr:nth-child(1) > td:nth-child(7) > button.btn.btn-sm.btn-info.mx-1").click();
});

And("user update long_url as {string}",(url:string)=>{
    cy.get("#update-long-url").clear().type(url);
});

And("user update description as {string}",(description:string)=>{
    cy.get("#update-description").clear().type(description);
});

And("user add tag as {string}",(tag:string)=>{
    cy.get("#form-update-url > div.modal-body > a").click();
    cy.get("#new-tag-input").type(tag);
});

And("user click confirm update button",()=>{
    cy.get("#update-property-btn").click();
});

Then("user see updated long_url as {string}",(url:string)=>{
    cy.get("#url_list > tbody > tr:nth-child(1) > td:nth-child(3)").invoke('text').then((t)=>{
        expect(t).to.eqls(url)
     })
});

Then("user see updated description as {string}",(description:string)=>{
    cy.get("#url_list > tbody > tr:nth-child(1) > td:nth-child(2)").invoke('text').then((t)=>{
        expect(t).to.eqls(description)
     })
})

Then("user see updated tag as {string}",(tag:string)=>{
    cy.get("#url_list > tbody > tr > td:nth-child(4) > div > div > span").invoke('text').then((t)=>{
        expect(t).to.eqls(tag)
     })
});

Then("user should see the url is updated", ()=>{
    CommonPage.verifyPageContain("URL Updated!")
})