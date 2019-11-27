import { Sequelize } from 'sequelize-typescript';
import { Authors, PrintingEdition, AuthorInBook, Payment, Role, User, UserInRole, Order, OrderItem } from 'src/entity';
import { Environment, environment } from 'src/environment';

const env: Environment = environment();
export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: env.databaseHost,
        port: env.databasePort,
        username: env.databaseUsername,
        password: env.databasePassword,
        database: env.database,
      });
      sequelize.addModels([ PrintingEdition, Authors, AuthorInBook ]);
      // , AuthorInBook, PrintingEdition, Payment, Role, User, UserInRole, Order, OrderItem
      await sequelize.sync();
      return sequelize;
    },
  },
];
