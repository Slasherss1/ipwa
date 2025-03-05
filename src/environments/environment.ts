export const environment = {
    apiEndpoint: `https://${process.env['ORIGIN']}/api`,
    version: "v1.0.0",
    vapid: {
        pubkey: `${process.env['VAPID']}`
    },
    production: true
};
