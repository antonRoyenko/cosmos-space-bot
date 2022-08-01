import React, { FC, useState } from "react";
import { connectWallet } from "./utils/connectWallet";
import { chainInfo } from "./config";
import { sendNotification } from "./utils/telegram";
import { makePostRequest } from "./utils/request";

const App: FC = () => {
  const [error, setError] = useState<Error>();

  const connect = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const wallet = await connectWallet({
        chainId: (e.target as HTMLInputElement).id,
      });
      const searchParams = new URLSearchParams(window.location.search);
      const telegramId = searchParams.get("telegram-id");

      await makePostRequest(
        `http://localhost:3000/update_wallet/${telegramId}`,
        {
          wallet,
        }
      );
    } catch (e: any) {
      setError(e);
    }
  };

  const back = async () => {
    await sendNotification("Perfect! Now you can use /assets command", "HTML");
    window.location.replace("https://t.me/cosmos_space_bot");
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <button onClick={back}>back to telegram</button>
        </div>
        <div>
          {chainInfo.map(({ chainId, chainName }) => (
            <button
              key={chainId}
              id={chainId}
              className="btn btn-main"
              onClick={connect}
            >
              Connect {chainName}
            </button>
          ))}
          {error && <div>{error.message}</div>}
        </div>
      </header>
    </div>
  );
};

export default App;
