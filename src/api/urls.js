const urls = {
  //  BASE_URL: 'https://ihodlbackend.lusites.xyz/api/',
  //  BASE_URL_MEDIA: 'https://ihodlbackend.lusites.xyz/api/',

  //  live url
  BASE_URL: 'https://ihodlbackend.lusites.xyz/api/',
  BASE_URL_MEDIA: 'https://ihodlbackend.lusites.xyz/api/',
};

export const APP_URLS = {
  LOGIN: urls.BASE_URL + 'login',
  RESET_PASSWORD: urls.BASE_URL + 'reset-password',
  FORGOT_PASSWORD: urls.BASE_URL + 'forgot-password',
  SIGN_UP: urls.BASE_URL + 'sign-up',
  VERIFICATION: urls.BASE_URL + 'email-verify',
  BUY_COIN_THROUGH_APP: urls.BASE_URL + 'buy-coin-through-app',
  CHANGE_PASSWORD: urls.BASE_URL + 'change-password',
  PROFILE_VIEW: urls.BASE_URL + 'profile-view',
  SAVE_PROFILE: urls.BASE_URL + 'save-edited-profile',
  PHONE_VERIFICATION: urls.BASE_URL + 'phone-verification',
  SEND_PHONE_VERIFICATION_CODE: urls.BASE_URL + 'send-phone-verification-code',
  COIN_REQUEST: urls.BASE_URL + 'default-coin-request-app',
  WALLET_LIST: urls.BASE_URL + 'my-pocket-list?limit=100&search&page=1',
  GIVE_COIN: urls.BASE_URL + 'give-coin-app',
  SETTINGS_PAGE: urls.BASE_URL + 'goto-setting-page',
  VERIFY_APP: urls.BASE_URL + 'g2f-verify-app',
  SECRET_SAVE: urls.BASE_URL + 'google-secret-save',
  ACTIVITY_LIST: urls.BASE_URL + 'activity-list',
  FAQ: urls.BASE_URL + 'faq-list?limit=10',
  googleAuthenticationEnableDisable:
    urls.BASE_URL + 'google-login-enable-or-disable',
  idVERIFICATION: urls.BASE_URL + 'id-verification',
  OFFERS: urls.BASE_URL + 'offers',
  COIN_SWAP_WALLET_LIST: urls.BASE_URL + 'coin-swap-app',
  SWAP_COIN: urls.BASE_URL + 'swap-coin-app',
  GET_COINS: urls.BASE_URL + 'coin-list?limit=2400',
  TRANSACTION_HISTORY:
    urls.BASE_URL + 'transaction-histories?type=all&search=&length=1000&page=1',
  EXPORT_HISTORY_DOWNLOAD: urls.BASE_URL + 'download-transactions-pdf',
  SWAP_COIN_HISTORY:
    urls.BASE_URL + 'show-swap-coin-history?limit=1000&search=&page=1',
};
