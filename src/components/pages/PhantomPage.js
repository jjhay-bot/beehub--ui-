import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Button } from "@mui/material";

const useProps = () => {
  const [logs, setLogs] = useState([]);

  const createLog = useCallback(
    (log) => {
      return setLogs((logs) => [...logs, log]);
    },
    [setLogs]
  );

  const clearLogs = useCallback(() => {
    setLogs([]);
  }, [setLogs]);

  useEffect(() => {
    if (!provider) return;

    // attempt to eagerly connect
    provider.connect({ onlyIfTrusted: true }).catch(() => {
      // fail silently
    });

    provider.on("connect", (publicKey) => {
      createLog({
        status: "success",
        method: "connect",
        message: `Connected to account ${publicKey.toBase58()}`,
      });
    });

    provider.on("disconnect", () => {
      createLog({
        status: "warning",
        method: "disconnect",
        message: "👋",
      });
    });

    provider.on("accountChanged", (publicKey) => {
      if (publicKey) {
        createLog({
          status: "info",
          method: "accountChanged",
          message: `Switched to account ${publicKey.toBase58()}`,
        });
      } else {
        createLog({
          status: "info",
          method: "accountChanged",
          message: "Attempting to switch accounts.",
        });

        provider.connect().catch((error) => {
          createLog({
            status: "error",
            method: "accountChanged",
            message: `Failed to re-connect: ${error.message}`,
          });
        });
      }
    });

    return () => {
      provider.disconnect();
    };
  }, [createLog]);

  /** Connect */
  const handleConnect = useCallback(async () => {
    if (!provider) return;

    try {
      await provider.connect();
    } catch (error) {
      createLog({
        status: "error",
        method: "connect",
        message: error.message,
      });
    }
  }, [createLog]);

  /** Disconnect */
  const handleDisconnect = useCallback(async () => {
    if (!provider) return;

    try {
      await provider.disconnect();
    } catch (error) {
      createLog({
        status: "error",
        method: "disconnect",
        message: error.message,
      });
    }
  }, [createLog]);

  const connectedMethods = useMemo(() => {
    return [
      {
        name: "Disconnect",
        onClick: handleDisconnect,
      },
    ];
  }, [handleDisconnect]);

  return {
    publicKey: provider?.publicKey || null,
    connectedMethods,
    handleConnect,
    logs,
    clearLogs,
  };
};

const getProvider = () => {
  if ("phantom" in window) {
    const anyWindow = window;
    const provider = anyWindow.phantom?.solana;
    // if (window.phantom) {
    //   // window.open("https://phantom.app/", "_blank");
    // }
    if (provider?.isPhantom) {
      return provider;
    } else {
    }
  }
};
const provider = getProvider();

const NoProvider = () => {
  useEffect(() => {
    // window.open("https://phantom.app/")
  }, []);
  return (
    <>
      <h2>Could not find a provider</h2>
      <h3>Please add phantom wallet to connect</h3>
    </>
  );
};

const StatelessApp = React.memo((props) => {
  const { publicKey, connectedMethods, handleConnect, logs, clearLogs } = props;

  return (
    <>
      <Sidebar publicKey={publicKey} connectedMethods={connectedMethods} connect={handleConnect} />
      {/* <Logs publicKey={publicKey} logs={logs} clearLogs={clearLogs} /> */}
    </>
  );
});

const Sidebar = (props) => {
  const { publicKey, connectedMethods, connect } = props;

  return (
    <div>
      <Button onClick={connect}>Connect to Phantom</Button>
    </div>
  );
};

const PhantomPage = () => {
  const props = useProps();

  if (!provider) {
    return <NoProvider />;
  }

  return <StatelessApp {...props} />;
};

export default PhantomPage;
