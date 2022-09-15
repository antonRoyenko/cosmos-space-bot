interface postWalletRequest {
  Body: {
    wallet: string;
    name: string;
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
