const envsVariables = import.meta.env;

const envs = {
  isDev: envsVariables.MODE === 'development',
  contractAddress: envsVariables.VITE_CONTRACT_ADDRESS,
};

export { envs };
