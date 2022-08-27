interface postWalletRequest {
  Body: {
    wallet: string;
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
