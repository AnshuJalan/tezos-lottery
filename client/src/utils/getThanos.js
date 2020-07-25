import { ThanosWallet } from '@thanos-wallet/dapp';

const getThanos = async () => {
  try {
    const available = await ThanosWallet.isAvailable();

    if (!available) {
      throw new Error('Please connect Thanos Wallet');
    }

    const wallet = new ThanosWallet('My Super DApp');
    await wallet.connect('carthagenet');
    const tezos = wallet.toTezos();

    return tezos;
  } catch (err) {
    alert(err);
  }
};

export default getThanos;
