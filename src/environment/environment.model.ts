export interface Environment {
  conection?: string;
  mode?: string;
  tokenSecret?: string;
  tokenLife?: number;
  refreshTokenLife?: number;
  connectionWithMongo?: string;
  tokenExpireIn?: number;
}
