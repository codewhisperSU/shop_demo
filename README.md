# shop_demo

This is restful shop_demo

# Start project

First you have to install docker and docker-compose to system

Go to project folder and copy .env.template to .env file.

Then open terminal and start docker-compose with command: `docker-compose up `.

Then open new terminal and start project with command `yarn build && yarn start`.

Then open browser and added this url to browser: `http://localhost:8000/v1/docs/`.

Now you can start to set data to database with swagger interface.

When you make test data. Go to follow order:
You can test GET /list methods all case.
1:
Set customer with add.
2:
Set product with add.
3:
Set purchase with add.
4:
You can search customer and product by name. Select GET /v1/search/customerOrProductByName/{name}.

# Test project

Go to project folder and open it terminal. Write `yarn test` to terminal and run.
