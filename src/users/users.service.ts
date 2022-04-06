import { Injectable, Logger } from '@nestjs/common';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  private users = [
    {
      userId: 1,
      username: 'bmeks',
      password: 'bmeks1@',
      refreshToken: null,
    },
    {
      userId: 2,
      username: 'daydreamlab',
      password: '1!epdlemfla',
      refreshToken: null,
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, username: string) {
    const idx = this.users.findIndex(
      ({ username: _userName }) => _userName === username,
    );
    const isRefreshTokenMatching =
      this.users[idx].refreshToken === refreshToken;

    if (isRefreshTokenMatching) {
      return this.users[idx];
    }
  }
  async setCurrentRefreshToken(refreshToken: string, username: string) {
    const idx = this.users.findIndex(
      ({ username: _userName }) => _userName === username,
    );
    this.users[idx].refreshToken = refreshToken;
  }
}
