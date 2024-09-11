
## 🔌 Активация плагина

Чтобы активировать плагин и указать новый параметр `MC_SERVER`, добавьте его в конфигурацию бота. Параметр `MC_SERVER` указывает, на какой портал войдёт бот при подключении. Если параметр не указан, бот будет подключаться на первый портал по умолчанию.

Пример настройки конфигурации:

```javascript
const botOptions = {
    MC_SERVER: 1,  // Указывает, на какой портал(/surv) войдет бот
    plugins: [
        { 
            type: 'github', 
            repoUrl: 'https://github.com/mmeerrkkaa/examplePlugins', 
            localPath: './plugins/CustomAuthPlugin' 
        }
    ]
};
```
