import { Injectable } from "@nestjs/common";

@Injectable()
export class UserRepo {

  constructor() {}
  private readonly userModel: Model<User> = mongoose.model('User', UserSchema)
}