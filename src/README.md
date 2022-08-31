

run to install npm (needed)

    npm install

to run tests

    npm run test:watch
    This is here, just in case we do write tests.

to run

    npm run dev

swagger url (to see api calls)

    localhost:3000/api

Explination of what everything is

    Services:
        Services are code blocks that do a particular job. For example, the MemberService controles everything that happens with members. This includes creating members, editing members, deleting members, and getting members.
    
    Entities:
        Entities are tables from the database. Using this will create a repository that we can then find, create, update, and delete from the table.
    
    Cron:
        Cron services are code blocks that run at a set schedule. For example, we can run a cron job every second so that a particular function is called every second.
    
    Controllers:
        Controllers are the backend endpoints that connect to frontend. We use swagger for an overview of the endpoints.
        Also included is DTOs, these are Data Tansfer Objects. We can use these as the body for an API call, but we need to specify what it is.
    
    Transformers:
        Transformers can be found under the 'helpers' folder. These transform one data type to another data type. 
        For example the dateColumnTransformer transforms a moment into a number for the database, and back to moment when we retrieve from the database.
    
    Modules:
        Every Cron, Service, Controller, and Entity has a Module. These act as a link between each other. Each module needs to import all other Services, Controllers, and Entities that the assosiated file uses. For example, the MemberController uses the Member table and the MemberService. We have to import through the module the modules of these services.
        These modules will then import all dependancies for the rest of the code in which it uses.
        Once you have created a module, you will need to add it to that type's module. For example, if you create a Transaction entity, you will need to create a module for this entity, and then add it to the entities.moudle.ts file.
