
## 🔌 Активация плагина

Пример настройки конфигурации:

```javascript
const botOptions = {
    plugins: [
        {
            name: 'AuthPlugin',
            type: 'github',
            repoUrl: '[https://github.com/mmeerrkkaa/examplePlugins](https://github.com/blockmindJS/blockmind-authPlugins)',
            localPath: './plugins/CustomAuthPlugin',
            options: {
                MC_SERVER: '1', // Указывает, на какой портал(/surv) войдет бот
            }
        }
    ]
};
```

Основной репозиторий: https://github.com/mmeerrkkaa/blockmind/tree/main

Example Репозиторий: https://github.com/mmeerrkkaa/blockmind-example
