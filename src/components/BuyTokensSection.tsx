import { Text, View, StyleSheet, Pressable } from "react-native";
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";

import { LPE_TOKEN_ABI, LPE_TOKEN_EXCHANGE_ABI } from '../../abi'


export default function BuyTokens() {
  // Reading the Contract
  const {
    data: contractName,
    isError,
    isLoading,
    isSuccess,
  } = useContractRead({
    address: "0x708638c124204e93Eb7A0EC1FC9e590AAFD305FB",
    abi: LPE_TOKEN_ABI,
    functionName: "name",
  });

  // Writing to the Contract
  const { config } = usePrepareContractWrite({
    address: "0x77287A30363eC91C1719Af966A4E27C9021cF3e9",
    abi: LPE_TOKEN_EXCHANGE_ABI,
    functionName: "buyTokens",
    args: [],
    value: BigInt(100000000000000000),
  });

  const {
    data: buyTokensData,
    isLoading: isLoadingBuyTokens,
    isSuccess: isSuccessBuyTokens,
    write: buyTokens,
  } = useContractWrite(config);

  return (
    <View style={styles.marginVertical}>
      <View style={styles.marginVertical}>
        {isLoading && <Text>Loading</Text>}
        {isSuccess && <Text>Name: {contractName?.toString()}</Text>}
        {isError && <Text>Error reading contract</Text>}
      </View>

      <Pressable style={styles.button} onPress={() => buyTokens?.()}>
        <Text style={styles.centerText}>Buy Tokens</Text>
      </Pressable>
      {isLoading && <Text>Check Wallet</Text>}
      <Text style={{ textAlign: "center", marginVertical: 10 }}>
        Transaction:
      </Text>
      {isSuccess && (
        <Text style={{ textAlign: "center" }}>{JSON.stringify(buyTokensData)}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
  },
  marginVertical: {
    marginVertical: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  centerText: {
    fontSize: 16,
    textAlign: "center",
    color: "#fff",
  },
  button: {
    backgroundColor: "#57B36A",
    padding: 10,
    width: 140,
    borderRadius: 32,
  },
});
