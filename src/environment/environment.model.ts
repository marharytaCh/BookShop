export interface Environment {
  conection?: string;
  mode?: string;
  tokenSecret?: string;
  tokenLife?: number;
  tokenExpireIn?: number;
  connectionWithMongo?: string;
}
