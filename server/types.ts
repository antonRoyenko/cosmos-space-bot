interface postWalletRequest {
  Body: {
    wallet: string;
    name: string;
    iv: string;
  };
  Params: {
    id: number;
  };
}

interface getSendMessage {
  Params: {
    id: number;
  };
}
