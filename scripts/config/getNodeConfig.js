const secrets = require('./secrets');

/**
 * Get the specific configuration for the blockchain to be used for deployment
 *
 * @param  {String} [NODE_ENV=process.env.NODE_ENV]  Node environment that is being used.
 *
 * @return {Object}          Environment specific configuration that is needed to setup node and deploy
 */
module.exports = (NODE_ENV = process.env.NODE_ENV) => {
  switch (NODE_ENV.toLowerCase()) {
    case 'ganache':
      return {
        network: 'ganache',
        provider: 'http://localhost:8545',
        mongoUrl: 'mongodb://localhost:27017/giveth_ganache',
        blockchainDatabase: './data/ganache',
        requiredConfirmations: 0,
        symbol: 'ETH',
        configFilename: './config/ganache.json',
        nodeId: 88,
        fiatWhitelist: [
          'AUD',
          'BRL',
          'CAD',
          'CHF',
          'CZK',
          'ETH',
          'EUR',
          'GBP',
          'MXN',
          'THB',
          'USD',
        ],
        tokenWhitelist: [
          {
            name: 'Ganache ETH',
            address: '0x0000000000000000000000000000000000000000',
            symbol: 'ETH',
            decimals: 18,
          },
        ],
      };

    case 'rsk':
      return {
        network: 'rsk',
        provider: 'http://localhost:4444',
        mongoUrl: 'mongodb://localhost:27017/giveth_rsk',
        blockchainDatabase: './data/rsk',
        requiredConfirmations: 0,
        nodeDownloadURL:
          'https://github.com/rsksmart/rskj/releases/download/ORCHID-0.6.0/rskj-core-0.6.0-ORCHID-all.jar',
        binPath: './scripts/bin/rskj-core-0.6.0-ORCHID-all.jar',
        config: './scripts/config/rsk_node.conf',
        symbol: 'BTC',
        configFilename: './config/rsk.json',
        nodeId: 33,
        fiatWhitelist: [
          'AUD',
          'BRL',
          'CAD',
          'CHF',
          'CZK',
          'BTC',
          'EUR',
          'GBP',
          'MXN',
          'THB',
          'USD',
        ],
        tokenWhitelist: [
          {
            name: 'Regtest RBTC',
            address: '0x0000000000000000000000000000000000000000',
            symbol: 'BTC',
            decimals: 18,
          },
        ],
      };
    case 'rsk_testnet':
      return Object.assign(
        {
          network: 'rsk_testnet',
          symbol: 'BTC',
          fiatWhitelist: [
            'AUD',
            'BRL',
            'CAD',
            'CHF',
            'CZK',
            'BTC',
            'EUR',
            'GBP',
            'MXN',
            'THB',
            'USD',
          ],
          configFilename: './config/rsk_testnet.json',
          nodeId: 31,
          tokenWhitelist: [
            {
              name: 'Testnet RBTC',
              address: '0x0000000000000000000000000000000000000000',
              symbol: 'BTC',
              decimals: 18,
            },
          ],

          // These comes from secrets.js
          provider: undefined,
          mongoUrl: undefined,
          private_keys: undefined,
          recoveryVaultAddress: undefined,
        },
        secrets.rsk_testnet,
      );
    // case 'RINKEBY':
    //   config = { provider: 'http://rinkeby.infure.io' };
    //   break;
    default:
      console.error(
        'No network option was selected. Please do so by setting NODE_ENV variable with one of these options: [rsk, ganache]',
      );
  }
  return undefined;
};
