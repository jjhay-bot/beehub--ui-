import { format, addDays } from "date-fns";

export const groupByKey = (array, key) => {
  // Return the end result
  return array.reduce((result, cur) => {
    // If an array already present for key, push it to the array. Else create an array and push the object
    (result[cur[key]] = result[cur[key]] || []).push(cur);
    // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
    return result;
  }, {}); // empty object is the initial value for result object
};

export const newDate = (addBusinessDay = 0, type = "EEE") => {
  return format(addDays(new Date(), addBusinessDay), type);
};

const getProvider = () => {
  if ("phantom" in window) {
    const provider = window.phantom?.solana;

    if (provider?.isPhantom) {
      return provider;
    }
  }

  window.open("https://phantom.app/", "_blank");
};

export function connectWallet() {
  return new Promise(async (resolve, reject) => {
    const provider = getProvider();

    if (provider) {
      try {
        await provider.connect();
        const response = await provider.request({ method: "connect" });
        const address = response.publicKey.toString();
        resolve(address);
      } catch (error) {
        reject(error);
      }
    } else {
      reject(new Error("Phantom wallet is not available"));
    }
  });
}
