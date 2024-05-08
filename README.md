# Next.js SaaS + RBAC

This project contains all the necessary boilerplate to setup a multi-tenant SaaS with Next.js including authentication and RBAC authorization.

## Features

### Authentication

- [x] It should be able to authenticate using email and password;
- [x] It should be able to authenticate using a GitHub account;
- [x] It should be able to recover password using email;
- [x] It should be able to create an account (email, name and password);

### Organization

- [x] It should be able to create a new organization;
- [x] It should be able to get organizations which the user belongs;
- [x] It should be able to update an organization;
- [x] It should be able to shutdown an organzation;
- [x] It should be able to transfer organization ownership;

### Invites

- [ ] It should be able to invite a new member (email, role);
- [ ] It should be able to accept an invite;
- [ ] It should be able to revoke a pending invite;

### Members

- [ ] It should be able to get organization members;
- [ ] It should be able to update a member role;

### Projects

- [ ] It should be able to get projects within a organization;
- [ ] It should be able to create a new project (name, url, description);
- [ ] It should be able to update a project (name, url, description);
- [ ] It should be able to delete a project;

### Billing

- [ ] It should be able to get billing details for organization ($20 per project / $10 per member excluding billing role)

### Roles

- Administrator
- Member
- Billing

| | Administrator | Member | Billing | Anonymous |
| - | - | - | - | - |
| Upate organization | 🟢 | 🔴 | 🔴 | 🔴 |
| Delete organization | 🟢 | 🔴 | 🔴 | 🔴 |
| Invite a member | 🟢 | 🔴 | 🔴 | 🔴 |
| Revoke an invite | 🟢 | 🔴 | 🔴 | 🔴 |
| List members | 🟢 | 🟢 | 🟢 | 🔴 |
| Transfer ownership | 🟡 | 🔴 | 🔴 | 🔴 |
| Upate member role | 🟢 | 🔴 | 🔴 | 🔴 |
| Delete member | 🟢 | 🟡 | 🔴 | 🔴 |
| List projects | 🟢 | 🟢 | 🟢 | 🔴 |
| Create a new project | 🟢 | 🟢 | 🔴 | 🔴 |
| Update a project | 🟢 | 🟡 | 🔴 | 🔴 |
| Delete a project | 🟢 | 🟡 | 🔴 | 🔴 |
| Get billing details | 🟢 | 🔴 | 🟢 | 🔴 |
| Export billing details | 🟢 | 🔴 | 🟢 | 🔴 |
| 🟢 = allowed 🔴 = not allowed 🟡 = allowed w/ conditions | | | | |
