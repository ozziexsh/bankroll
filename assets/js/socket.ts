import { Socket } from 'phoenix';

const csrfToken = document
  .querySelector('meta[name="csrf-token"]')
  ?.getAttribute('content');

let socket: Socket;

export function initSocket(userId: any) {
  if (socket) {
    return socket;
  }
  socket = new Socket('/bankroll-socket', {
    params: {
      _csrf_token: csrfToken,
      current_user_id: userId,
    },
  });
  socket.connect();
  return socket;
}
