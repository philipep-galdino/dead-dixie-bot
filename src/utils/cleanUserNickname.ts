export function cleanNickname(nickname: string): string {
    nickname = nickname.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    nickname = nickname.replace(/\$/g, 'S');
    return nickname;
  }
  